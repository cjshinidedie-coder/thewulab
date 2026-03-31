export interface Bead {
  id: string;
  name: string;
  size: string;
  price: number;
  weight: string;
  image: string;
  category: string;
}

const sizes = [
  { size: "6mm", price: 5, weight: "0.6g" },
  { size: "8mm", price: 8, weight: "1.0g" },
  { size: "10mm", price: 12, weight: "1.5g" },
  { size: "12mm", price: 18, weight: "2.2g" },
];

// Strictly mapped from filesystem scan of public/ folders
const folders: { folder: string; category: string; materials: string[] }[] = [
  {
    folder: "beads",
    category: "黄色/基础",
    materials: ["利比亚陨石","太阳石","柠檬黄金","橙月光","橙黄晶","石榴石","葡萄石","蜜蜡","金发晶","铜发晶","黄东陵玉","黄兔毛","黄发晶","黄塔晶","黄幽灵","黄托帕","黄方解石","黄水晶","黄玛瑙","黄碧玺","黄胶花","黄荧石","黄虎眼石","黄阿塞","黄龙玉"],
  },
  {
    folder: "red beads",
    category: "红色系",
    materials: ["冰粉晶","南红玛瑙","星光粉","朱砂","樱花玛瑙","石榴石","粉兔毛","粉幽灵","粉月光","粉欧帕","粉烟超七","粉玉髓","粉白幽","红兔毛","红发晶","红幽灵","红玉髓","红玛瑙","红碧玺","红纹石","红胶花","红虎眼","红超七","红锂云母","草莓晶","莫粉","蔷薇石","金太阳","金草莓","马粉"],
  },
  {
    folder: "white beads",
    category: "白色系",
    materials: ["和田白玉","喜马拉雅白","欧泊","白兔毛","白幽灵","白月光","白松石","白水晶","白玉髓","白珊瑚","白珍珠","白翡翠","白荧石","白蝶贝","白阿塞"],
  },
  {
    folder: "blue beads",
    category: "蓝色系",
    materials: ["坦桑石","堇青石","天使石","天河石","异极矿","彼得石","海纹石","海蓝宝","绿松石","苏打石","蓝东陵玉","蓝兔毛","蓝发晶","蓝托帕","蓝方解石","蓝晶石","蓝月","蓝月光","蓝玛瑙","蓝砂石","蓝碧玺","蓝磷辉","蓝纹方钠","蓝纹玛瑙","蓝绿晶","蓝萤石","蓝虎眼","蓝针","蓝铜矿","青金石"],
  },
  {
    folder: "black beads",
    category: "黑色系",
    materials: ["冰种黑曜","地狱海蓝","彩虹黑曜","毒液超七","茶晶","金曜石","金运石","银耀石","黑发晶","黑曜石","黑月光","黑极光","黑水晶","黑烟超七","黑玛瑙","黑碧玺","黑草莓","黑透辉石","黑金超七","黑金阿塞","黑金骨干","黑银钛","黑闪灵","黑骨干","黑龙晶"],
  },
  {
    folder: "purple beads",
    category: "紫色系",
    materials: ["乌拉圭紫","俱舒来","巴西紫","梦幻紫","玻利维亚紫","紫发晶","紫幽灵","紫方钠","紫月光","紫牙乌石榴","紫玉晶","紫玉髓","紫翡翠","紫萤石","紫锂云母","紫锂辉","紫阿塞","紫黄晶","紫龙晶","薰衣草紫"],
  },
  {
    folder: "green beads",
    category: "绿色系",
    materials: ["东陵玉","孔雀石","岫玉","捷克陨石","橄榄石","沙弗菜","祖母绿","绿兔毛","绿发晶","绿幽灵","绿方解","绿松石","绿水晶","绿玉髓","绿碧玺","绿草莓","绿萤石","绿虎眼","绿锂云母","绿龙晶","翠榴石","翡翠","葡萄石","透辉石","金绿石"],
  },
];

export const categories = ["全部", ...folders.map((f) => f.category)];

export const beads: Bead[] = folders.flatMap(({ folder, category, materials }) =>
  materials.flatMap((name) =>
    sizes.map((s) => ({
      id: `${name}_${s.size}`,
      name,
      size: s.size,
      price: s.price,
      weight: s.weight,
      image: `/${folder}/${name}.png`,
      category,
    })),
  ),
);
