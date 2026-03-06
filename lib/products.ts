export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  element: string;
}

// 这是你的真实商品数据库（后端验证用）
export const PRODUCTS: Product[] = [
  {
    id: 'product-1',
    name: 'Cosmic Turquoise Bracelet',
    price: 226.00,
    image: 'products/product-1.png',
    element: '🌊 Water Element',
  },
  {
    id: 'product-2',
    name: 'Imperial Jasper Bracelet',
    price: 183.00,
    image: 'products/product-2.png',
    element: '✨ Metal Element',
  },
  {
    id: 'product-3',
    name: 'Santa Maria Aquamarine',
    price: 2524.00,
    image: 'products/product-3.png',
    element: '🌊 Water Element',
  },
  {
    id: 'product-4',
    name: 'Labradorite Bracelet',
    price: 310.00,
    image: 'products/product-4.png',
    element: '🌿 Wood Element',
  },
  {
    id: 'product-5',
    name: 'Blue Aventurine Bracelet',
    price: 310.00,
    image: 'products/product-5.png',
    element: '🌊 Water Element',
  },
  {
    id: 'product-6',
    name: 'Tiger Eye - Hematite Pair',
    price: 60.00,
    image: 'products/product-6.png',
    element: '🔥 Fire Element',
  },
  {
    id: 'product-7',
    name: 'Lava Bracelet',
    price: 310.00,
    image: 'products/product-7.png',
    element: '🔥 Fire Element',
  },
  {
    id: 'product-8',
    name: 'Dragon Blood Jasper',
    price: 297.00,
    image: 'products/product-8.png',
    element: '🌍 Earth Element',
  },
];

// 根据 ID 获取商品（后端验证用）
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

// 计算真实总价（后端验证用）
export function calculateTotalPrice(
  items: Array<{ id: string; quantity: number }>
): number {
  return items.reduce((total, item) => {
    const product = getProductById(item.id);
    if (!product) throw new Error(`Product ${item.id} not found`);
    return total + product.price * item.quantity;
  }, 0);
}
