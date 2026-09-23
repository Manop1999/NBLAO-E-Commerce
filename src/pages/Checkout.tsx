import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { useT } from '../i18n'

const NAVY = '#082E61'
const BLUE = '#0099FF'
const BLUE_H = '#007ACC'
const GOLD = '#D4AF37'

const CheckCircleIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const STEPS = ['Customer', 'Delivery', 'Review', 'Confirmation']

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center font-ui text-[12px] font-700"
              style={{ background: i <= current ? BLUE : '#dde2ea', color: i <= current ? '#fff' : '#94a3b8' }}>
              {i < current ? '✓' : i + 1}
            </div>
            <div className="font-ui text-[10px] mt-1 hidden sm:block" style={{ color: i === current ? NAVY : '#94a3b8' }}>{step}</div>
          </div>
          {i < STEPS.length - 1 && <div className="w-12 sm:w-20 h-px mb-5" style={{ background: i < current ? BLUE : '#dde2ea' }} />}
        </div>
      ))}
    </div>
  )
}

function FormGroup({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block font-ui text-[12px] font-600 mb-1.5" style={{ color: NAVY }}>
        {label}{required && <span style={{ color: '#ef4444' }}> *</span>}
      </label>
      {children}
    </div>
  )
}

const inputStyle = { border: '1px solid #D9E2EC', color: NAVY, background: '#fff', padding: '10px 12px', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none' }

export default function Checkout() {
  const t = useT()
  const { cart, cartTotal, clearCart } = useStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [orderNum] = useState(`NB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', company: '',
    address: '', city: '', country: 'Laos PDR', notes: '',
    payment: 'bank-transfer',
  })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      clearCart()
      setStep(3)
    }, 1800)
  }

  if (cart.length === 0 && step < 3) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-display font-700 text-[28px] mb-4" style={{ color: NAVY }}>Your cart is empty</h2>
        <Link to="/products" className="font-ui text-[13px] font-600 px-6 py-3 text-white no-underline" style={{ background: BLUE }}>Browse Products</Link>
      </div>
    )
  }

  // Step 3: Confirmation
  if (step === 3) {
    return (
      <div style={{ background: '#F5F7FA', minHeight: '70vh' }}>
        <div className="max-w-[600px] mx-auto px-6 py-16 text-center">
          <div className="mb-6" style={{ color: '#16a34a' }}><CheckCircleIcon /></div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>{t.checkout.order_success}</span>
            <div className="w-6 h-px" style={{ background: GOLD }} />
          </div>
          <h1 className="font-display font-800 text-[32px] mb-4" style={{ color: NAVY }}>Thank You!</h1>
          <p className="font-ui text-[14px] leading-relaxed mb-2" style={{ color: '#52677D' }}>
            {t.checkout.order_success_desc}
          </p>
          <div className="bg-white p-5 my-8" style={{ border: '1px solid #dde2ea' }}>
            <div className="flex items-center justify-between py-2">
              <span className="font-ui text-[13px]" style={{ color: '#52677D' }}>Order Number</span>
              <span className="font-display font-700 text-[15px]" style={{ color: NAVY }}>{orderNum}</span>
            </div>
            <div className="flex items-center justify-between py-2" style={{ borderTop: '1px solid #f0f4f8' }}>
              <span className="font-ui text-[13px]" style={{ color: '#52677D' }}>Customer</span>
              <span className="font-ui text-[13px]" style={{ color: NAVY }}>{form.firstName} {form.lastName}</span>
            </div>
            <div className="flex items-center justify-between py-2" style={{ borderTop: '1px solid #f0f4f8' }}>
              <span className="font-ui text-[13px]" style={{ color: '#52677D' }}>Company</span>
              <span className="font-ui text-[13px]" style={{ color: NAVY }}>{form.company || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between py-2" style={{ borderTop: '1px solid #f0f4f8' }}>
              <span className="font-ui text-[13px]" style={{ color: '#52677D' }}>Payment</span>
              <span className="font-ui text-[13px]" style={{ color: NAVY }}>Bank Transfer</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/account?tab=orders" className="font-ui text-[13px] font-600 px-6 py-3 text-white no-underline" style={{ background: BLUE }}>View My Orders</Link>
            <Link to="/products" className="font-ui text-[13px] font-600 px-6 py-3 no-underline" style={{ border: `1px solid ${NAVY}`, color: NAVY }}>Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#F5F7FA', minHeight: '70vh' }}>
      <div className="bg-white" style={{ borderBottom: '1px solid #dde2ea' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
          <h1 className="font-display font-800 text-[32px]" style={{ color: NAVY }}>{t.checkout.title}</h1>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 py-10">
        <StepIndicator current={step} />

        <div className="grid lg:grid-cols-[1fr_300px] gap-7">
          {/* Main form */}
          <div className="bg-white p-7" style={{ border: '1px solid #dde2ea' }}>
            {/* Step 0: Customer */}
            {step === 0 && (
              <div>
                <h2 className="font-display font-700 text-[20px] mb-6" style={{ color: NAVY }}>Customer Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <FormGroup label={t.checkout.full_name} required><input value={form.firstName} onChange={set('firstName')} style={inputStyle} /></FormGroup>
                  <FormGroup label={t.checkout.full_name} required><input value={form.lastName} onChange={set('lastName')} style={inputStyle} /></FormGroup>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <FormGroup label={t.checkout.email} required><input type="email" value={form.email} onChange={set('email')} style={inputStyle} /></FormGroup>
                  <FormGroup label={t.checkout.phone} required><input value={form.phone} onChange={set('phone')} style={inputStyle} /></FormGroup>
                </div>
                <FormGroup label={t.checkout.company}>
                  <input value={form.company} onChange={set('company')} style={inputStyle} />
                </FormGroup>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setStep(1)} disabled={!form.firstName || !form.lastName || !form.email || !form.phone}
                    className="flex items-center gap-2 font-ui text-[13px] font-600 px-8 py-3 text-white transition-colors disabled:opacity-40"
                    style={{ background: BLUE }}>
                    Next: Delivery <ArrowRightIcon />
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Delivery */}
            {step === 1 && (
              <div>
                <h2 className="font-display font-700 text-[20px] mb-6" style={{ color: NAVY }}>Delivery Information</h2>
                <FormGroup label={t.checkout.address} required>
                  <input value={form.address} onChange={set('address')} style={{ ...inputStyle, marginBottom: 12 }} />
                </FormGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <FormGroup label={t.checkout.city} required><input value={form.city} onChange={set('city')} style={inputStyle} /></FormGroup>
                  <FormGroup label="Country">
                    <select value={form.country} onChange={set('country')} style={inputStyle}>
                      <option>Laos PDR</option>
                      <option>Thailand</option>
                      <option>Vietnam</option>
                      <option>Cambodia</option>
                      <option>Myanmar</option>
                    </select>
                  </FormGroup>
                </div>
                <FormGroup label={t.checkout.notes}>
                  <textarea value={form.notes} onChange={set('notes')} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </FormGroup>
                <div className="mt-6 flex gap-3 justify-between">
                  <button onClick={() => setStep(0)} className="font-ui text-[13px] font-600 px-6 py-3 transition-all" style={{ border: `1px solid ${NAVY}`, color: NAVY }}>← Back</button>
                  <button onClick={() => setStep(2)} disabled={!form.address || !form.city}
                    className="flex items-center gap-2 font-ui text-[13px] font-600 px-8 py-3 text-white disabled:opacity-40" style={{ background: BLUE }}>
                    Next: Review <ArrowRightIcon />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div>
                <h2 className="font-display font-700 text-[20px] mb-6" style={{ color: NAVY }}>Review Your Order</h2>

                {/* Customer summary */}
                <div className="mb-5 p-4" style={{ background: '#F5F7FA', border: '1px solid #dde2ea' }}>
                  <div className="font-display font-700 text-[13px] tracking-wide mb-3" style={{ color: NAVY }}>Customer Details</div>
                  <div className="font-ui text-[13px]" style={{ color: '#52677D' }}>
                    {form.firstName} {form.lastName} · {form.email} · {form.phone}
                    {form.company && ` · ${form.company}`}
                  </div>
                  <div className="font-ui text-[13px] mt-1" style={{ color: '#52677D' }}>
                    {form.address}, {form.city}, {form.country}
                  </div>
                </div>

                {/* Items */}
                <div className="mb-5">
                  <div className="font-display font-700 text-[13px] tracking-wide mb-3" style={{ color: NAVY }}>Order Items</div>
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #f0f4f8' }}>
                      <div className="flex items-center gap-3">
                        <div className="overflow-hidden shrink-0" style={{ width: 48, height: 36, background: '#f0f4f8' }}>
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-ui text-[13px] font-600" style={{ color: NAVY }}>{item.name}</div>
                          <div className="font-ui text-[11px]" style={{ color: '#8f9faf' }}>Qty: {item.qty} · SKU: {item.sku}</div>
                        </div>
                      </div>
                      <span className="font-display font-700 text-[14px]" style={{ color: NAVY }}>${(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Payment method */}
                <div className="mb-6">
                  <div className="font-display font-700 text-[13px] tracking-wide mb-3" style={{ color: NAVY }}>Payment Method</div>
                  {['bank-transfer', 'company-account', 'cash'].map(m => (
                    <label key={m} className="flex items-center gap-3 py-2.5 cursor-pointer">
                      <input type="radio" name="payment" value={m} checked={form.payment === m} onChange={set('payment')} style={{ accentColor: BLUE }} />
                      <span className="font-ui text-[13px]" style={{ color: NAVY }}>
                        {m === 'bank-transfer' ? t.checkout.bank_transfer : m === 'company-account' ? 'Company Account (Net-30)' : t.checkout.cod}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 justify-between">
                  <button onClick={() => setStep(1)} className="font-ui text-[13px] font-600 px-6 py-3 transition-all" style={{ border: `1px solid ${NAVY}`, color: NAVY }}>← Back</button>
                  <button onClick={handleSubmit} disabled={submitting}
                    className="flex items-center gap-2 font-ui text-[13px] font-600 px-8 py-3 text-white transition-colors disabled:opacity-60"
                    style={{ background: BLUE }}>
                    {submitting ? '...' : t.checkout.place_order}
                    {!submitting && <ArrowRightIcon />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-white p-5 sticky top-[110px]" style={{ border: '1px solid #dde2ea' }}>
              <h3 className="font-display font-700 text-[16px] mb-4 pb-3" style={{ color: NAVY, borderBottom: '1px solid #f0f4f8' }}>{t.checkout.order_summary}</h3>
              <div className="flex flex-col gap-3 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <span className="font-ui text-[12px] leading-snug flex-1" style={{ color: '#52677D' }}>{item.name} ×{item.qty}</span>
                    <span className="font-ui text-[12px] font-600 shrink-0" style={{ color: NAVY }}>${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between py-3" style={{ borderTop: '2px solid #dde2ea' }}>
                <span className="font-display font-700 text-[14px]" style={{ color: NAVY }}>{t.checkout.total}</span>
                <span className="font-display font-700 text-[20px]" style={{ color: NAVY }}>${cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
