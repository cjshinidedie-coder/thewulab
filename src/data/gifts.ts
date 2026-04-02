export interface GiftProduct {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  image: string;
  category: 'for-her' | 'for-him';
}

export const giftProducts: GiftProduct[] = [
  {
    id: 'gift-1',
    name: '福运红绳 · 祖母绿点睛金马',
    nameEn: 'Lucky Red String · Emerald Eye Golden Horse',
    price: 699,
    image: '/gifts/red-string-horse.png',
    category: 'for-her',
  },
];
