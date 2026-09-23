import { createContext, useContext, useState, useEffect, ReactNode, createElement } from 'react'

export interface CartItem {
  id: number
  name: string
  sku: string
  price: number
  qty: number
  img: string
  category: string
  brand: string
  stock: number
  priceUnit?: string
}

export interface RFQItem {
  id: number
  name: string
  sku: string
  img: string
  qty: number
  category: string
}

export interface Address {
  id: string
  name: string
  company: string
  phone: string
  address: string
  district: string
  province: string
  postalCode: string
  country: string
  isDefault: boolean
}

interface StoreCtx {
  cart: CartItem[]
  wishlist: number[]
  compare: number[]
  rfqItems: RFQItem[]
  addresses: Address[]
  addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  removeFromCart: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void
  toggleWishlist: (id: number) => void
  toggleCompare: (id: number) => void
  addToRFQ: (item: Omit<RFQItem, 'qty'>, qty?: number) => void
  removeFromRFQ: (id: number) => void
  updateRFQQty: (id: number, qty: number) => void
  clearRFQ: () => void
  cartTotal: number
  cartCount: number
  addAddress: (addr: Omit<Address, 'id'>) => void
  updateAddress: (id: string, addr: Partial<Address>) => void
  deleteAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
  activeDrawer: 'nav' | 'filters' | null
  setActiveDrawer: (d: 'nav' | 'filters' | null) => void
  lang: 'en' | 'lo'
  setLang: (l: 'en' | 'lo') => void
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch { /* quota exceeded or private mode */ }
}

const Ctx = createContext<StoreCtx | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load('nblao_cart', []))
  const [wishlist, setWishlist] = useState<number[]>(() => load('nblao_wishlist', []))
  const [compare, setCompare] = useState<number[]>(() => load('nblao_compare', []))
  const [rfqItems, setRFQItems] = useState<RFQItem[]>(() => load('nblao_rfq', []))
  const [addresses, setAddresses] = useState<Address[]>(() => load('nblao_addresses', []))
  const [activeDrawer, setActiveDrawer] = useState<'nav' | 'filters' | null>(null)
  const [lang, setLangState] = useState<'en' | 'lo'>(() => {
    try { return (localStorage.getItem('nblao_lang') as 'en' | 'lo') || 'en' } catch { return 'en' }
  })
  const setLang = (l: 'en' | 'lo') => {
    setLangState(l)
    try { localStorage.setItem('nblao_lang', l) } catch { /* quota */ }
  }

  useEffect(() => { save('nblao_cart', cart) }, [cart])
  useEffect(() => { save('nblao_wishlist', wishlist) }, [wishlist])
  useEffect(() => { save('nblao_compare', compare) }, [compare])
  useEffect(() => { save('nblao_rfq', rfqItems) }, [rfqItems])
  useEffect(() => { save('nblao_addresses', addresses) }, [addresses])

  const addToCart = (item: Omit<CartItem, 'qty'>, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: Math.min(c.qty + qty, c.stock) } : c)
      return [...prev, { ...item, qty }]
    })
  }

  const removeFromCart = (id: number) => setCart(p => p.filter(c => c.id !== id))

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return removeFromCart(id)
    setCart(p => p.map(c => c.id === id ? { ...c, qty: Math.min(qty, c.stock) } : c))
  }

  const clearCart = () => setCart([])

  const toggleWishlist = (id: number) =>
    setWishlist(p => p.includes(id) ? p.filter(w => w !== id) : [...p, id])

  const toggleCompare = (id: number) =>
    setCompare(p => p.includes(id) ? p.filter(c => c !== id) : p.length < 4 ? [...p, id] : p)

  const addToRFQ = (item: Omit<RFQItem, 'qty'>, qty = 1) => {
    setRFQItems(prev => {
      const existing = prev.find(r => r.id === item.id)
      if (existing) return prev.map(r => r.id === item.id ? { ...r, qty: r.qty + qty } : r)
      return [...prev, { ...item, qty }]
    })
  }

  const removeFromRFQ = (id: number) => setRFQItems(p => p.filter(r => r.id !== id))

  const updateRFQQty = (id: number, qty: number) => {
    if (qty < 1) return removeFromRFQ(id)
    setRFQItems(p => p.map(r => r.id === id ? { ...r, qty } : r))
  }

  const clearRFQ = () => setRFQItems([])

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const id = `addr-${Date.now()}`
    setAddresses(prev => {
      const list = addr.isDefault
        ? prev.map(a => ({ ...a, isDefault: false }))
        : prev
      return [...list, { ...addr, id }]
    })
  }

  const updateAddress = (id: string, addr: Partial<Address>) => {
    setAddresses(prev => {
      let list = prev
      if (addr.isDefault) list = prev.map(a => ({ ...a, isDefault: false }))
      return list.map(a => a.id === id ? { ...a, ...addr } : a)
    })
  }

  const deleteAddress = (id: string) => setAddresses(p => p.filter(a => a.id !== id))

  const setDefaultAddress = (id: string) =>
    setAddresses(p => p.map(a => ({ ...a, isDefault: a.id === id })))

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0)
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0)

  return createElement(Ctx.Provider, {
    value: {
      cart, wishlist, compare, rfqItems, addresses,
      addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, toggleCompare,
      addToRFQ, removeFromRFQ, updateRFQQty, clearRFQ,
      cartTotal, cartCount,
      addAddress, updateAddress, deleteAddress, setDefaultAddress,
      activeDrawer, setActiveDrawer,
      lang, setLang,
    }
  }, children)
}

export const useStore = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
