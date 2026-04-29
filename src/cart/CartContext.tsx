import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export interface CartItem {
  /** Unique key per cart line: serviceId or serviceId:variantId */
  key: string;
  serviceId: string;
  slug: string;
  name: string;
  /** Optional variant label appended to display name (e.g. "1 sesión") */
  variantLabel?: string;
  priceCRC: number;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  totalCRC: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  addItem: (item: Omit<CartItem, 'qty' | 'key'> & { key?: string; qty?: number }) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartCtx | null>(null);
const STORAGE_KEY = 'add-cart-v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem: CartCtx['addItem'] = (incoming) => {
    const key = incoming.key ?? incoming.serviceId;
    const qty = incoming.qty ?? 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...incoming, key, qty }];
    });
    setOpen(true);
  };

  const removeItem = (key: string) =>
    setItems((prev) => prev.filter((i) => i.key !== key));

  const updateQty = (key: string, qty: number) =>
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );

  const clear = () => setItems([]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      totalCRC: items.reduce((sum, i) => sum + i.priceCRC * i.qty, 0),
      open,
      setOpen,
      addItem,
      removeItem,
      updateQty,
      clear,
    }),
    [items, open]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
