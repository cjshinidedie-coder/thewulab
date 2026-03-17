export interface Product {
  id: string;
  name: string;
  element: string;
  elementType: 'water' | 'fire' | 'wood' | 'metal' | 'earth';
  price: number;
  image: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cosmic Turquoise Bracelet',
    element: '🌊 Water Element',
    elementType: 'water',
    price: 226.00,
    image: '/product-1.png',
    isNew: true,
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Imperial Jasper Bracelet',
    element: '✨ Metal Element',
    elementType: 'metal',
    price: 183.00,
    image: '/product-2.png',
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Santa Maria Aquamarine',
    element: '🌊 Water Element',
    elementType: 'water',
    price: 2524.00,
    image: '/product-3.png',
    isNew: true,
  },
  {
    id: '4',
    name: 'Labradorite Bracelet',
    element: '🌿 Wood Element',
    elementType: 'wood',
    price: 310.00,
    image: '/product-4.png',
  },
  {
    id: '5',
    name: 'Blue Aventurine Bracelet',
    element: '🌊 Water Element',
    elementType: 'water',
    price: 310.00,
    image: '/product-5.png',
    isNew: true,
  },
  {
    id: '6',
    name: 'Tiger Eye - Hematite Pair',
    element: '🔥 Fire Element',
    elementType: 'fire',
    price: 60.00,
    image: '/product-6.png',
    isBestSeller: true,
  },
  {
    id: '7',
    name: 'Lava Bracelet',
    element: '🔥 Fire Element',
    elementType: 'fire',
    price: 310.00,
    image: '/product-7.png',
  },
  {
    id: '8',
    name: 'Dragon Blood Jasper',
    element: '🌍 Earth Element',
    elementType: 'earth',
    price: 297.00,
    image: '/product-8.png',
  },
];

export type SortOption = 'newest' | 'price-high' | 'price-low' | 'bestseller';

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'bestseller':
      return sorted.sort((a, b) => {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return 0;
      });
    case 'newest':
    default:
      return sorted.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });
  }
}

export function filterByElement(products: Product[], element: string): Product[] {
  return products.filter(p => p.elementType === element);
}

export function filterByNewArrivals(products: Product[]): Product[] {
  return products.filter(p => p.isNew);
}
