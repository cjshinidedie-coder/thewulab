  'use client';

  import React, { createContext, useContext, useState, ReactNode } from 'react';

  interface AppContextType {
    language: 'en' | 'zh';
    setLanguage: (lang: 'en' | 'zh') => void;
    cartCount: number;
    setCartCount: (count: number) => void;
    addToCart: () => void;
    clearCart: () => void;
    favorites: string[];
    toggleFavorite: (productId: string) => void;
  }

  const AppContext = createContext<AppContextType | undefined>(undefined);

  export function AppProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<'en' | 'zh'>('en');
    const [cartCount, setCartCount] = useState(0);
    const [favorites, setFavorites] = useState<string[]>([]);

    const addToCart = () => {
      setCartCount(prev => prev + 1);
    };

    const clearCart = () => {
      setCartCount(0);
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
          addToCart,
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
