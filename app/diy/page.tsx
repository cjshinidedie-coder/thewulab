'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { beads, categories, allCategoryLabel, type Bead } from '@/src/data/beads';
import { useApp } from '@/app/context/AppContext';

interface SelectedBead extends Bead {
  uid: string;
}

export default function DiyPage() {
  const { language } = useApp();
  const [selectedBeads, setSelectedBeads] = useState<SelectedBead[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [activeCategoryZh, setActiveCategoryZh] = useState('全部');
  const draggingIndexRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const isEn = language === 'en';

  const totalPrice = selectedBeads.reduce((sum, b) => sum + b.price, 0);

  const filteredBeads = useMemo(
    () => activeCategoryZh === '全部' ? beads : beads.filter((b) => b.category === activeCategoryZh),
    [activeCategoryZh],
  );

  const addBead = (bead: Bead) => {
    setSelectedBeads((prev) => [
      ...prev,
      { ...bead, uid: `${bead.id}-${Date.now()}-${Math.random().toString(36).slice(2)}` },
    ]);
  };

  const removeLast = () => {
    setSelectedBeads((prev) => prev.slice(0, -1));
  };

  const clearAll = () => {
    if (window.confirm(isEn ? 'Clear all beads?' : '确定要清空当前所有珠子吗？')) {
      setSelectedBeads([]);
    }
  };

  // Canvas dimensions
  const canvasSize = 360;
  const center = canvasSize / 2;
  const beadSize = 44;
  const radius = canvasSize / 2 - beadSize / 2 - 20;

  const getSlotFromMouse = useCallback(
    (clientX: number, clientY: number, count: number): number | null => {
      if (!canvasRef.current || count < 2) return null;
      const rect = canvasRef.current.getBoundingClientRect();
      const mx = clientX - rect.left - center;
      const my = clientY - rect.top - center;
      let angle = Math.atan2(my, mx) + Math.PI / 2;
      if (angle < 0) angle += 2 * Math.PI;
      const slotAngle = (2 * Math.PI) / count;
      return Math.round(angle / slotAngle) % count;
    },
    [center],
  );

  const handleDragStart = (index: number, e: React.DragEvent) => {
    e.stopPropagation();
    draggingIndexRef.current = index;
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const fromIndex = draggingIndexRef.current;
    if (fromIndex === null) return;
    setSelectedBeads((prev) => {
      const targetIndex = getSlotFromMouse(e.clientX, e.clientY, prev.length);
      if (targetIndex === null || targetIndex === draggingIndexRef.current) return prev;
      const next = [...prev];
      const [moved] = next.splice(draggingIndexRef.current!, 1);
      next.splice(targetIndex, 0, moved);
      draggingIndexRef.current = targetIndex;
      setDraggingIndex(targetIndex);
      return next;
    });
  };

  const handleDragEnd = () => {
    draggingIndexRef.current = null;
    setDraggingIndex(null);
  };

  // Category display helpers
  const allCats = [allCategoryLabel, ...categories];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col lg:flex-row">
      {/* ── LEFT: CANVAS + BUTTONS (sticky on desktop) ── */}
      <div className="relative w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col items-center justify-center bg-[#F5F1EC] p-6 lg:p-10">
        {/* Stats panel */}
        <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-md rounded-lg px-4 py-3 shadow-sm border border-stone-200/50 z-30">
          <div className="text-[11px] text-stone-400 tracking-wider uppercase">Beads</div>
          <div className="text-lg font-light text-stone-700">
            {selectedBeads.length} <span className="text-xs text-stone-400">{isEn ? 'pcs' : '颗'}</span>
          </div>
          <div className="mt-1 text-[11px] text-stone-400 tracking-wider uppercase">{isEn ? 'Total' : '总价'}</div>
          <div className="text-lg font-light text-stone-700">¥{totalPrice}</div>
          <button
            disabled={selectedBeads.length === 0}
            onClick={() => alert(isEn ? 'Added to cart successfully!' : '已成功加入购物车！')}
            className="mt-3 w-full px-4 py-2 text-[11px] font-semibold tracking-widest uppercase text-white bg-red-800 rounded-md hover:bg-red-700 active:scale-95 transition-all shadow-sm hover:shadow-md disabled:bg-stone-300 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isEn ? 'ADD TO CART' : '加入购物车'}
          </button>
        </div>

        {/* Canvas */}
        <div
          ref={canvasRef}
          className="relative rounded-full border border-stone-200/60 shrink-0"
          style={{ width: canvasSize, height: canvasSize, background: '#F0EBE4' }}
          onDragOver={handleDragOver}
          onDrop={(e) => e.preventDefault()}
        >
          <div className="absolute w-2 h-2 rounded-full bg-stone-300/50" style={{ top: center - 4, left: center - 4 }} />
          <div
            className="absolute rounded-full border border-dashed border-stone-300/40"
            style={{ width: radius * 2, height: radius * 2, top: center - radius, left: center - radius }}
          />

          {selectedBeads.map((bead, i) => {
            const angle = (2 * Math.PI * i) / selectedBeads.length - Math.PI / 2;
            const sizeNum = parseInt(bead.size);
            const pixelSize = sizeNum <= 6 ? 26 : sizeNum <= 8 ? 38 : sizeNum <= 10 ? 54 : 72;
            const x = center + radius * Math.cos(angle) - pixelSize / 2;
            const y = center + radius * Math.sin(angle) - pixelSize / 2;
            const isDragging = draggingIndex === i;
            return (
              <img
                key={bead.uid}
                src={bead.image}
                alt={isEn ? bead.nameEn : bead.name}
                draggable
                onDragStart={(e) => handleDragStart(i, e)}
                onDragEnd={handleDragEnd}
                className={`absolute rounded-full object-contain drop-shadow-md cursor-grab active:cursor-grabbing select-none ${isDragging ? 'opacity-40 scale-110' : ''}`}
                style={{
                  width: pixelSize, height: pixelSize, top: y, left: x,
                  transition: isDragging ? 'none' : 'all 0.3s ease',
                  zIndex: isDragging ? 50 : 10,
                }}
              />
            );
          })}

          {selectedBeads.length === 0 && (
            <p className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm tracking-wide font-light select-none">
              {isEn ? 'Tap a bead to start designing' : '点击珠子开始设计'}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={removeLast} className="px-5 py-2 text-xs tracking-wider uppercase text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors">
            ✕ {isEn ? 'Undo Last' : '删除末颗'}
          </button>
          <button onClick={clearAll} className="px-5 py-2 text-xs tracking-wider uppercase text-stone-500 border border-stone-300 rounded-md hover:bg-stone-100 transition-colors">
            ✕ {isEn ? 'Clear All' : '删除全部'}
          </button>
        </div>
      </div>

      {/* ── RIGHT: CATEGORY SIDEBAR + ASSETS GRID ── */}
      <div className="w-full lg:w-1/2 lg:h-screen lg:overflow-y-auto flex flex-col">
        {/* Mobile: horizontal scrollable tabs */}
        <div className="flex lg:hidden overflow-x-auto gap-2 px-4 py-3 border-b border-stone-200/60 bg-[#FAF8F5] sticky top-0 z-20">
          {allCats.map((cat) => (
            <button
              key={cat.zh}
              onClick={() => setActiveCategoryZh(cat.zh)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs tracking-wide transition-colors ${
                activeCategoryZh === cat.zh
                  ? 'bg-stone-700 text-white'
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {isEn ? cat.en : cat.zh}
            </button>
          ))}
        </div>

        {/* Desktop: sidebar + grid */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar — desktop only */}
          <nav className="hidden lg:flex flex-col shrink-0 w-32 py-6 pl-4 pr-2 gap-1 sticky top-0 self-start">
            {allCats.map((cat) => (
              <button
                key={cat.zh}
                onClick={() => setActiveCategoryZh(cat.zh)}
                className={`relative text-left text-xs tracking-wide py-2 pl-3 rounded-r-md transition-colors ${
                  activeCategoryZh === cat.zh
                    ? 'text-stone-800 font-semibold bg-stone-100'
                    : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {activeCategoryZh === cat.zh && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-red-700 rounded-r" />
                )}
                {isEn ? cat.en : cat.zh}
              </button>
            ))}
          </nav>

          {/* Grid */}
          <div className="flex-1 p-4 lg:p-6">
            <h3 className="font-serif font-normal tracking-widest text-xl text-stone-600 mb-4">
              {isEn ? 'Select Beads' : '选择珠子'}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredBeads.map((bead) => (
                <button
                  key={bead.id}
                  onClick={() => addBead(bead)}
                  className="group flex flex-col items-center bg-white rounded-lg p-3 border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-14 h-14 flex items-center justify-center">
                    <img
                      src={bead.image}
                      alt={isEn ? bead.nameEn : bead.name}
                      className="w-12 h-12 object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <span className="mt-1.5 text-xs text-stone-600 tracking-wide leading-tight text-center">
                    {isEn ? bead.nameEn : bead.name}
                  </span>
                  <span className="mt-0.5 text-sm font-semibold text-stone-700">¥{bead.price}</span>
                  <span className="text-[10px] text-stone-400">{bead.size}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
