import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useT } from '../i18n'
import { useToast } from '../components/Toast'

const NAVY = '#082E61'
const BLUE = '#0099FF'
const BLUE_H = '#007ACC'
const GOLD = '#D4AF37'

const MinusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
)
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
)
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const ShoppingBagIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart, cartTotal, addToRFQ } = useStore()
  const { addToast } = useToast()
  const t = useT()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div style={{ background: '#F5F7FA', minHeight: '70vh' }}>
        <div className="bg-white" style={{ borderBottom: '1px solid #dde2ea' }}>
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
            <h1 className="font-display font-800 text-[32px]" style={{ color: NAVY }}>{t.cart.title}</h1>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 flex flex-col items-center justify-center">
          <div style={{ color: '#D9E2EC' }}><ShoppingBagIcon /></div>
          <h2 className="font-display font-700 text-[24px] mt-6 mb-3" style={{ color: NAVY }}>{t.cart.empty}</h2>
          <p className="font-ui text-[14px] mb-8" style={{ color: '#52677D' }}>{t.cart.empty_desc}</p>
          <div className="flex gap-3">
            <Link to="/products" className="font-ui text-[13px] font-600 px-7 py-3 text-white no-underline" style={{ background: BLUE }}>{t.common.view_all}</Link>
            <Link to="/rfq" className="font-ui text-[13px] font-600 px-7 py-3 no-underline" style={{ border: `1px solid ${NAVY}`, color: NAVY }}>{t.nav.rfq}</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#F5F7FA', minHeight: '70vh' }}>
      <div className="bg-white" style={{ borderBottom: '1px solid #dde2ea' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 flex items-center justify-between">
          <div>
            <h1 className="font-display font-800 text-[32px]" style={{ color: NAVY }}>{t.cart.title}</h1>
            <p className="font-ui text-[13px] mt-1" style={{ color: '#52677D' }}>{cart.length} {t.cart.items}</p>
          </div>
          <button onClick={clearCart} className="font-ui text-[12px] text-[#94a3b8] hover:text-[#ef4444] transition-colors">
            {t.cart.clear_cart}
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-7">
          {/* Cart items */}
          <div className="bg-white" style={{ border: '1px solid #dde2ea' }}>
            {/* Table header - desktop */}
            <div className="hidden md:grid grid-cols-[1fr_120px_100px_100px_40px] gap-4 px-6 py-3 font-ui text-[11px] font-600 tracking-wide uppercase" style={{ borderBottom: '1px solid #dde2ea', color: '#8f9faf', background: '#fafbfc' }}>
              <span>{t.products.title}</span>
              <span className="text-center">{t.cart.qty}</span>
              <span className="text-center">{t.common.price}</span>
              <span className="text-right">{t.cart.subtotal}</span>
              <span></span>
            </div>

            {cart.map((item) => (
              <div key={item.id} style={{ borderBottom: '1px solid #f0f4f8' }}>
                {/* Desktop row */}
                <div className="hidden md:grid grid-cols-[1fr_120px_100px_100px_40px] gap-4 items-center px-6 py-5">
                  <div className="flex gap-4 items-center">
                    <Link to={`/products/${item.id}`} className="shrink-0 overflow-hidden" style={{ width: 72, height: 54, background: '#f0f4f8' }}>
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="min-w-0">
                      <div className="font-ui text-[10px] font-600 tracking-wide uppercase mb-1" style={{ color: BLUE }}>{item.category}</div>
                      <Link to={`/products/${item.id}`} className="no-underline">
                        <div className="font-display font-700 text-[14px] leading-snug" style={{ color: NAVY }}>{item.name}</div>
                      </Link>
                      <div className="font-ui text-[11px] mt-0.5" style={{ color: '#8f9faf' }}>SKU: {item.sku} · {item.brand}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start">
                    <div className="flex items-center" style={{ border: '1px solid #D9E2EC' }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2.5 py-2 hover:bg-slate-50 transition-colors"><MinusIcon /></button>
                      <span className="font-ui text-[13px] font-600 px-3" style={{ color: NAVY }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2.5 py-2 hover:bg-slate-50 transition-colors" disabled={item.qty >= item.stock}><PlusIcon /></button>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-ui text-[13px]" style={{ color: '#52677D' }}>${item.price.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-700 text-[15px]" style={{ color: NAVY }}>${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-center">
                    <button onClick={() => removeFromCart(item.id)} className="text-[#94a3b8] hover:text-[#ef4444] transition-colors p-1">
                      <TrashIcon />
                    </button>
                  </div>
                </div>

                {/* Mobile compact card */}
                <div className="md:hidden flex gap-2.5 px-3 py-2.5">
                  <Link to={`/products/${item.id}`} className="shrink-0 overflow-hidden" style={{ width: 52, height: 52, minWidth: 52, background: '#f0f4f8' }}>
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.id}`} className="no-underline">
                      <div className="font-display font-700 text-[12px] leading-snug line-clamp-1" style={{ color: NAVY }}>{item.name}</div>
                    </Link>
                    <div className="font-ui text-[10px] mt-0.5" style={{ color: '#8f9faf' }}>{item.brand} · {item.sku}</div>
                    <div className="flex items-center justify-between mt-1.5 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center" style={{ border: '1px solid #D9E2EC' }}>
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-2 py-1 hover:bg-slate-50 transition-colors"><MinusIcon /></button>
                          <span className="font-ui text-[11px] font-600 px-2" style={{ color: NAVY }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-2 py-1 hover:bg-slate-50 transition-colors" disabled={item.qty >= item.stock}><PlusIcon /></button>
                        </div>
                        <span className="font-display font-700 text-[13px]" style={{ color: NAVY }}>${(item.price * item.qty).toLocaleString()}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-[#94a3b8] hover:text-[#ef4444] transition-colors p-1 shrink-0">
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Convert to RFQ */}
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: '#fafbfc', borderTop: '1px solid #f0f4f8' }}>
              <p className="font-ui text-[12px]" style={{ color: '#52677D' }}>{t.cart.order_summary}</p>
              <button onClick={() => {
                cart.forEach(item => addToRFQ({ id: item.id, name: item.name, sku: item.sku, img: item.img, category: item.category }, item.qty))
                addToast(t.cart.convert_rfq, 'success')
                navigate('/rfq')
              }}
                className="font-ui text-[12px] font-600 px-4 py-2 transition-colors" style={{ border: `1px solid ${NAVY}`, color: NAVY }}>
                {t.cart.convert_rfq}
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white p-6" style={{ border: '1px solid #dde2ea' }}>
              <h2 className="font-display font-700 text-[18px] mb-5 pb-4" style={{ color: NAVY, borderBottom: '1px solid #f0f4f8' }}>{t.cart.order_summary}</h2>

              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between">
                  <span className="font-ui text-[13px]" style={{ color: '#52677D' }}>{t.cart.subtotal} ({cart.length} {t.cart.items})</span>
                  <span className="font-ui text-[13px] font-600" style={{ color: NAVY }}>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-ui text-[13px]" style={{ color: '#52677D' }}>{t.checkout.shipping_fee}</span>
                  <span className="font-ui text-[13px]" style={{ color: '#52677D' }}>{t.cart.shipping_note}</span>
                </div>
              </div>

              <div className="flex justify-between py-4 mb-5" style={{ borderTop: '2px solid #dde2ea' }}>
                <span className="font-display font-700 text-[16px]" style={{ color: NAVY }}>{t.cart.total}</span>
                <span className="font-display font-700 text-[22px]" style={{ color: NAVY }}>${cartTotal.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="flex items-center justify-center gap-2 w-full font-ui text-[13px] font-600 py-3.5 text-white no-underline transition-colors"
                style={{ background: BLUE }} onMouseEnter={e => (e.currentTarget.style.background = BLUE_H)} onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
                {t.cart.checkout} <ArrowRightIcon />
              </Link>

              <Link to="/products" className="block text-center font-ui text-[12px] mt-3 no-underline transition-colors" style={{ color: '#52677D' }}>
                ← {t.cart.continue_shopping}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-4 bg-white p-5" style={{ border: '1px solid #dde2ea' }}>
              {['Secure payment processing', 'ISO-certified products', 'Technical support included', 'After-sales service'].map(t => (
                <div key={t} className="flex items-center gap-2.5 py-2">
                  <div className="w-1.5 h-1.5 shrink-0" style={{ background: GOLD }} />
                  <span className="font-ui text-[12px]" style={{ color: '#52677D' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
