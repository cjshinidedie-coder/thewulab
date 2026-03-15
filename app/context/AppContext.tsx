  'use client';

  import React, { createContext, useContext, useState, ReactNode } from 'react';

  interface AppContextType {
    language: 'en' | 'zh';
    setLanguage: (lang: 'en' | 'zh') => void;
    cartCount: number;
    setCartCount: (count: number) => void;
    cartItems: Array<{ id: string; name: string; price: number; image: string; quantity: number }>;
    addToCart: (product: { id: string; name: string; price: number; image: string }) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    favorites: string[];
    toggleFavorite: (productId: string) => void;
  }

  const AppContext = createContext<AppContextType | undefined>(undefined);

  export function AppProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<'en' | 'zh'>('en');
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState<Array<{ id: string; name: string; price: number; image: string; quantity: number }>>([]);
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
