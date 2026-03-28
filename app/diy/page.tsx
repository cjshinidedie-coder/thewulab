'use client';

import { useState, useRef, useCallback } from 'react';
import { beads, type Bead } from '@/src/data/beads';

interface SelectedBead extends Bead {
  uid: string;
}

export default function DiyPage() {
  const [selectedBeads, setSelectedBeads] = useState<SelectedBead[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const totalPrice = selectedBeads.reduce((sum, b) => sum + b.price, 0);

  const addBead = (bead: Bead) => {
    setSelectedBeads((prev) => [
      ...prev,
      { ...bead, uid: `${bead.id}-${Date.now()}-${Math.random()}` },
    ]);
  };

  const removeLast = () => {
    setSelectedBeads((prev) => prev.slice(0, -1));
  };

  // Canvas dimensions
  const canvasSize = 360;
  const center = canvasSize / 2;
  const beadSize = 44;
  const radius = canvasSize / 2 - beadSize / 2 - 20;

  // Given mouse position relative to canvas, compute nearest slot index
  const getSlotFromMouse = useCallback(
    (clientX: number, clientY: number): number | null => {
      if (!canvasRef.current || selectedBeads.length < 2) return null;
      const rect = canvasRef.current.getBoundingClientRect();
      const mx = clientX - rect.left - center;
      const my = clientY - rect.top - center;
      let angle = Math.atan2(my, mx) + Math.PI / 2; // offset to match our -PI/2 start
      if (angle < 0) angle += 2 * Math.PI;
      const slotAngle = (2 * Math.PI) / selectedBeads.length;
      return Math.round(angle / slotAngle) % selectedBeads.length;
    },
    [selectedBeads.length, center],
  );

  const handleDragStart = (index: number, e: React.DragEvent) => {
    setDraggingIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // transparent drag image
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggingIndex === null) return;
    const targetIndex = getSlotFromMouse(e.clientX, e.clientY);
    if (targetIndex === null || targetIndex === draggingIndex) return;
    // swap in place
    setSelectedBeads((prev) => {
      const next = [...prev];
      const [moved] = next.splice(draggingIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDraggingIndex(targetIndex);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col lg:flex-row">
      {/* ── LEFT: CANVAS + DELETE BTN (sticky on desktop) ── */}
      <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col items-center justify-center bg-[#F5F1EC] p-6 lg:p-10">
        {/* Canvas */}
        <div
          ref={canvasRef}
          className="relative rounded-full border border-stone-200/60 shrink-0"
          style={{ width: canvasSize, height: canvasSize, background: '#F0EBE4' }}
          onDragOver={handleDragOver}
          onDrop={(e) => e.preventDefault()}
        >
          {/* centre dot */}
          <div
            className="absolute w-2 h-2 rounded-full bg-stone-300/50"
            style={{ top: center - 4, left: center - 4 }}
          />

          {/* ring guide */}
          <div
            className="absolute rounded-full border border-dashed border-stone-300/40"
            style={{
              width: radius * 2,
              height: radius * 2,
              top: center - radius,
              left: center - radius,
            }}
          />

          {/* beads on ring */}
          {selectedBeads.map((bead, i) => {
            const angle = (2 * Math.PI * i) / selectedBeads.length - Math.PI / 2;
            const x = center + radius * Math.cos(angle) - beadSize / 2;
            const y = center + radius * Math.sin(angle) - beadSize / 2;
            const isDragging = draggingIndex === i;
            return (
              <img
                key={bead.uid}
                src={bead.image}
                alt={bead.name}
                draggable
                onDragStart={(e) => handleDragStart(i, e)}
                onDragEnd={handleDragEnd}
                className={`absolute rounded-full object-contain drop-shadow-md transition-all duration-300 cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-40 scale-110' : ''}`}
                style={{ width: beadSize, height: beadSize, top: y, left: x }}
              />
            );
          })}

          {/* empty state */}
          {selectedBeads.length === 0 && (
            <p className="absolute inset-0 flex items-center justify-center text-stone-400 text-sm tracking-wide font-light select-none">
              点击珠子开始设计
            </p>
          )}

          {/* floating stats panel */}
          <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-md rounded-lg px-4 py-3 shadow-sm border border-stone-200/50">
            <div className="text-[11px] text-stone-400 tracking-wider uppercase">Beads</div>
            <div className="text-lg font-light text-stone-700">
              {selectedBeads.length} <span className="text-xs text-stone-400">颗</span>
            </div>
            <div className="mt-1 text-[11px] text-stone-400 tracking-wider uppercase">Total</div>
            <div className="text-lg font-light text-stone-700">¥{totalPrice}</div>
          </div>
        </div>

        {/* Delete button only */}
        <div className="flex justify-center mt-8">
          <button
            onClick={removeLast}
            className="px-5 py-2 text-xs tracking-wider uppercase text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
          >
            ✕ 删除末颗
          </button>
        </div>
      </div>

      {/* ── RIGHT: ASSETS GRID (scrollable) ── */}
      <div className="w-full lg:w-1/2 lg:h-screen lg:overflow-y-auto p-6 lg:p-10">
        <h3 className="font-serif font-normal tracking-widest text-xl text-stone-600 mb-6">选择珠子</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {beads.map((bead) => (
            <button
              key={bead.id}
              onClick={() => addBead(bead)}
              className="group flex flex-col items-center bg-white rounded-lg p-3 border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all duration-200"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={bead.image}
                  alt={bead.name}
                  className="w-14 h-14 object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="mt-2 text-xs text-stone-600 tracking-wide">{bead.name}</span>
              <span className="text-[11px] text-stone-400">¥{bead.price}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
