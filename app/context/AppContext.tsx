  'use client';

  import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

  interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }

  export interface DiyCartItem {
    id: string;
    name: string;
    beads: Array<{ name: string; nameEn: string; size: string; price: number; image: string }>;
    totalPrice: number;
    beadCount: number;
  }

  interface AppContextType {
    language: 'en' | 'zh';
    setLanguage: (lang: 'en' | 'zh') => void;
    cartCount: number;
    setCartCount: (count: number) => void;
    cartItems: CartItem[];
    addToCart: (product: { id: string; name: string; price: number; image: string }) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    diyCartItems: DiyCartItem[];
    addDiyToCart: (item: DiyCartItem) => void;
    removeDiyFromCart: (id: string) => void;
    favorites: string[];
    toggleFavorite: (productId: string) => void;
  }

  const AppContext = createContext<AppContextType | undefined>(undefined);

  export function AppProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<'en' | 'zh'>('en');

    // Hydrate language from localStorage on mount
    useEffect(() => {
      const saved = localStorage.getItem('wu-lang');
      if (saved === 'en' || saved === 'zh') {
        setLanguageState(saved);
      }
    }, []);

    const setLanguage = (lang: 'en' | 'zh') => {
      setLanguageState(lang);
      localStorage.setItem('wu-lang', lang);
    };
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [diyCartItems, setDiyCartItems] = useState<DiyCartItem[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    const addToCart = (product: { id: string; name: string; price: number; image: string }) => {
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      setCartCount(prev => prev + 1);
    };

    const removeFromCart = (productId: string) => {
      setCartItems(prev => {
        const item = prev.find(item => item.id === productId);
        if (item) {
          setCartCount(prevCount => Math.max(0, prevCount - item.quantity));
        }
        return prev.filter(item => item.id !== productId);
      });
    };

    const clearCart = () => {
      setCartCount(0);
      setCartItems([]);
      setDiyCartItems([]);
    };

    const addDiyToCart = (item: DiyCartItem) => {
      setDiyCartItems(prev => [...prev, item]);
      setCartCount(prev => prev + 1);
    };

    const removeDiyFromCart = (id: string) => {
      setDiyCartItems(prev => prev.filter(item => item.id !== id));
      setCartCount(prev => Math.max(0, prev - 1));
    };

    const toggleFavorite = (productId: string) => {
      setFavorites(prev =>
        prev.includes(productId)
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      );
    };

    return (
      <AppContext.Provider
        value={{
          language,
          setLanguage,
          cartCount,
          setCartCount,
          cartItems,
          addToCart,
          removeFromCart,
          clearCart,
          diyCartItems,
          addDiyToCart,
          removeDiyFromCart,
          favorites,
          toggleFavorite,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }

  export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('useApp must be used within AppProvider');
    }
    return context;
  }
