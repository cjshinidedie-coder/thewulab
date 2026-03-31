export interface Bead {
  id: string;
  name: string;
  size: string;
  price: number;
  weight: string;
  image: string;
}

const yellowMaterials = [
  "蜜蜡", "太阳石", "橙月光", "橙黄晶", "石榴石", "葡萄石", "金发晶", "铜发晶",
  "黄兔毛", "黄发晶", "黄塔晶", "黄幽灵", "黄托帕", "黄水晶", "黄玛瑙", "黄碧玺",
  "黄胶花", "黄荧石", "黄阿塞", "黄龙玉", "柠檬黄金", "黄东陵玉", "黄方解石", "黄虎眼石",
  "利比亚陨石",
];

const redMaterials = [
  "冰粉晶", "樱花玛瑙", "粉白幽", "粉幽灵", "粉月光",
  "莫粉", "粉欧泊", "星光粉", "马粉", "粉玉髓",
  "粉烟超七", "粉兔毛", "草莓晶", "红纹石", "蔷薇石",
  "红超七", "红发晶", "红兔毛", "红胶花", "红锂云母",
  "石榴石", "红碧玺", "金草莓", "金太阳", "红幽灵",
  "红玉髓", "南红玛瑙", "朱砂", "红玛瑙", "红虎眼",
];

const sizes = [
  { size: "6mm", price: 5, weight: "0.6g" },
  { size: "8mm", price: 8, weight: "1.0g" },
  { size: "10mm", price: 12, weight: "1.5g" },
  { size: "11mm", price: 15, weight: "1.8g" },
  { size: "12mm", price: 18, weight: "2.2g" },
];

const yellowBeads = yellowMaterials.flatMap((name) =>
  sizes.map((s) => ({
    id: `${name}_${s.size}`,
    name,
    size: s.size,
    price: s.price,
    weight: s.weight,
    image: `/beads/${name}.png`,
  })),
);

const redBeads = redMaterials.flatMap((name) =>
  sizes.map((s) => ({
    id: `${name}_${s.size}`,
    name,
    size: s.size,
    price: s.price,
    weight: s.weight,
    image: `/red beads/${name}.png`,
  })),
);

export const beads: Bead[] = [...yellowBeads, ...redBeads];
