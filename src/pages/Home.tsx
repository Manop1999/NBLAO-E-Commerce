import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { PRODUCTS, CATEGORIES } from '../data'
import { useT } from '../i18n'

const NAVY = '#082E61'
const BLUE = '#0099FF'
const BLUE_H = '#007ACC'
const GOLD = '#D4AF37'

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const STATS = [
  { value: '12+', label: 'Years in Business' },
  { value: '500+', label: 'Products Supplied' },
  { value: '200+', label: 'Clients Served' },
  { value: '15+', label: 'Countries Sourced' },
]

const CAT_IMAGES: Record<string, string> = {
  'Electrical Equipment': 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=640&h=360&fit=crop&auto=format',
  'Industrial Machinery': 'https://images.unsplash.com/photo-1717386255773-1e3037c81788?w=640&h=360&fit=crop&auto=format',
  'Power & Energy': 'https://images.unsplash.com/photo-1509390221805-d1c887a72a00?w=640&h=360&fit=crop&auto=format',
  'Tools & Equipment': 'https://images.unsplash.com/photo-1524514587686-e2909d726e9b?w=640&h=360&fit=crop&auto=format',
  'Safety & Fire Protection': 'https://images.unsplash.com/photo-1552879890-3a06dd3a06c2?w=640&h=360&fit=crop&auto=format',
  'Cables & Accessories': 'https://images.unsplash.com/photo-1518181835702-6eef8b4b2113?w=640&h=360&fit=crop&auto=format',
}

const CAT_DESC: Record<string, string> = {
  'Electrical Equipment': 'Switchgear, transformers, circuit breakers, control panels',
  'Industrial Machinery': 'Pumps, compressors, conveyors, processing equipment',
  'Power & Energy': 'Generators, UPS, solar and energy storage solutions',
  'Tools & Equipment': 'Power tools, hand tools, measuring and testing gear',
  'Safety & Fire Protection': 'PPE, fire suppression, detection and emergency equipment',
  'Cables & Accessories': 'Power cables, control cables, conduits and management',
}

const INDUSTRIES = [
  { id: 1, name: 'Power Plants', desc: 'Hydroelectric, thermal, and solar generation facilities', icon: '⚡', stat: '15+ Projects' },
  { id: 2, name: 'Manufacturing', desc: 'Automotive, food processing, and heavy manufacturing plants', icon: '🏭', stat: '40+ Clients' },
  { id: 3, name: 'Construction', desc: 'Large-scale civil, infrastructure, and building projects', icon: '🏗', stat: '60+ Projects' },
  { id: 4, name: 'Industrial Facilities', desc: 'Refineries, chemical plants, and processing facilities', icon: '🔧', stat: '25+ Facilities' },
]

const BRAND_NAMES = ['Siemens', 'ABB', 'Schneider Electric', 'Eaton', 'Legrand', 'Mitsubishi Electric', 'Bosch', 'Fluke']

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-5 h-px" style={{ background: GOLD }} />
      <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: light ? '#7dbfff' : BLUE }}>
        {children}
      </span>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const t = useT()
  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: 560, background: '#07213d' }}>
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <img
          src="https://images.unsplash.com/photo-1509390144018-eeaf65052242?w=1600&h=900&fit=crop&auto=format"
          alt="High-voltage electrical substation"
          className="w-full h-full object-cover"
          style={{ opacity: 0.52 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(7,33,61,0.97) 0%, rgba(8,46,97,0.82) 38%, rgba(8,46,97,0.35) 70%, rgba(8,46,97,0.10) 100%)', pointerEvents: 'none' }} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: GOLD, pointerEvents: 'none' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-14 lg:py-20" style={{ zIndex: 1 }}>
        <div className="max-w-[600px]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <span className="font-ui text-[10px] tracking-[0.25em] uppercase font-600" style={{ color: GOLD }}>
              Industrial Supply Solutions — Laos PDR
            </span>
          </div>
          <h1 className="font-display font-800 text-white leading-[0.95] mb-4" style={{ fontSize: 'clamp(38px, 5vw, 68px)', letterSpacing: '-0.01em' }}>
            Power. Machinery.<br />
            <span style={{ color: '#5bc5ff' }}>Built to Perform.</span>
          </h1>
          <p className="font-ui text-[14px] leading-[1.7] mb-7 max-w-[480px]" style={{ color: 'rgba(255,255,255,0.62)' }}>
            NB Lao Sole Co., Ltd. supplies certified industrial equipment, electrical systems, and safety solutions to power plants, factories, and construction projects across Southeast Asia.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link to="/products" className="flex items-center gap-2 font-ui text-[13px] font-600 px-7 py-3 no-underline" style={{ background: BLUE, color: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = BLUE_H)} onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
              {t.products.title} <ArrowRightIcon />
            </Link>
            <Link to="/rfq" className="font-ui text-[13px] font-500 px-7 py-3 no-underline" style={{ border: '1px solid rgba(255,255,255,0.28)', color: 'rgba(255,255,255,0.85)' }}>
              {t.common.request_quote}
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display font-800 leading-none" style={{ fontSize: 'clamp(22px, 2.2vw, 28px)', color: GOLD }}>{s.value}</div>
                <div className="font-ui text-[10px] mt-1 tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Product Categories ────────────────────────────────────────────────────────
function ProductCategories() {
  const t = useT()
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <section className="py-8 lg:py-14" style={{ background: '#F5F7FA' }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: '1px solid #dde2ea' }}>
          <div>
            <SectionLabel>Product Range</SectionLabel>
            <h2 className="font-display font-700 leading-[1.05]" style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', color: NAVY }}>Browse by Category</h2>
          </div>
          <Link to="/products" className="flex items-center gap-2 font-ui text-[12px] font-500 no-underline" style={{ color: BLUE }}>
            {t.common.view_all} <ArrowRightIcon />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" style={{ border: '1px solid #dde2ea' }}>
          {CATEGORIES.map((cat, i) => {
            const isHov = hovered === cat
            return (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="no-underline flex flex-col overflow-hidden"
                style={{ borderRight: (i + 1) % 6 === 0 ? 'none' : '1px solid #dde2ea', borderBottom: '1px solid #dde2ea' }}
                onMouseEnter={() => setHovered(cat)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative overflow-hidden bg-slate-200" style={{ height: 90 }}>
                  <img src={CAT_IMAGES[cat]} alt={cat} className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: isHov ? 'scale(1.06)' : 'scale(1)', opacity: isHov ? 0.85 : 0.72 }} />
                  <div className="absolute inset-0 transition-colors duration-300" style={{ background: isHov ? 'rgba(8,46,97,0.18)' : 'rgba(8,46,97,0.42)' }} />
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300" style={{ background: GOLD, opacity: isHov ? 1 : 0 }} />
                </div>
                <div className="p-2.5 lg:p-3 transition-colors duration-200" style={{ background: isHov ? '#f9fbfe' : '#fff' }}>
                  <h3 className="font-display font-700 text-[11px] lg:text-[12px] leading-snug mb-0.5" style={{ color: NAVY }}>{cat}</h3>
                  <p className="font-ui text-[10px] leading-snug line-clamp-2 hidden lg:block" style={{ color: '#7a8ea6' }}>{CAT_DESC[cat]}</p>
                  <span className="font-ui text-[9px] font-600 tracking-wide" style={{ color: BLUE }}>
                    {PRODUCTS.filter(p => p.category === cat).length}+ SKUs
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Featured Products ─────────────────────────────────────────────────────────
function FeaturedProducts() {
  const t = useT()
  const [hovered, setHovered] = useState<number | null>(null)
  const { addToCart, toggleWishlist, wishlist, addToRFQ } = useStore()
  // Show only 4 featured products on home
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4)

  return (
    <section className="py-8 lg:py-14" style={{ background: '#fff' }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-5 lg:mb-8">
          <div>
            <SectionLabel>Product Catalogue</SectionLabel>
            <h2 className="font-display font-700 leading-[1.05]" style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', color: NAVY }}>Featured Products</h2>
          </div>
          <Link to="/products" className="flex items-center gap-2 font-ui text-[12px] font-500 no-underline" style={{ color: BLUE }}>
            {t.header.view_all} <ArrowRightIcon />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px]" style={{ background: '#dde2ea' }}>
          {featured.map((p) => {
            const isHov = hovered === p.id
            const inWish = wishlist.includes(p.id)
            return (
              <div key={p.id} className="flex flex-col" style={{ background: isHov ? '#f9fbfe' : '#fff' }}
                onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
                <div className="relative overflow-hidden bg-slate-100" style={{ height: 140 }}>
                  <Link to={`/products/${p.id}`}>
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500"
                      style={{ transform: isHov ? 'scale(1.05)' : 'scale(1)' }} />
                  </Link>
                  <button onClick={() => toggleWishlist(p.id)}
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/90 hover:bg-white"
                    style={{ color: inWish ? '#ef4444' : '#94a3b8' }}>
                    <HeartIcon filled={inWish} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300" style={{ background: GOLD, opacity: isHov ? 1 : 0 }} />
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <span className="font-ui text-[9px] font-700 tracking-[0.14em] uppercase mb-1" style={{ color: BLUE }}>{p.category}</span>
                  <Link to={`/products/${p.id}`} className="no-underline">
                    <h3 className="font-display font-700 text-[13px] leading-snug mb-1 hover:text-[#0099FF] transition-colors line-clamp-2" style={{ color: NAVY }}>{p.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between mb-2 mt-auto pt-1">
                    <span className="font-display font-700 text-[15px]" style={{ color: NAVY }}>{p.priceDisplay}</span>
                    <span className="font-ui text-[10px] px-1.5 py-0.5" style={{ background: p.stock > 5 ? '#ecfdf5' : '#fef9ec', color: p.stock > 5 ? '#16a34a' : '#d97706' }}>
                      {p.stockLabel}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => addToCart({ id: p.id, name: p.name, sku: p.sku, price: p.price, img: p.img, category: p.category, brand: p.brand, stock: p.stock })}
                      className="flex-1 font-ui text-[11px] font-600 py-2 text-white"
                      style={{ background: isHov ? BLUE_H : BLUE }}>
                      {t.common.add_to_cart}
                    </button>
                    <button onClick={() => addToRFQ({ id: p.id, name: p.name, sku: p.sku, img: p.img, category: p.category })}
                      className="font-ui text-[11px] font-600 py-2 px-2.5"
                      style={{ border: `1px solid ${NAVY}`, color: NAVY }}>
                      {t.products.rfq_short}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Industries ────────────────────────────────────────────────────────────────
function IndustriesSection() {
  const [active, setActive] = useState(0)
  return (
    <section className="py-8 lg:py-14" style={{ background: NAVY }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <SectionLabel light>Sectors Served</SectionLabel>
            <h2 className="font-display font-700 leading-[1.05] mb-3" style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', color: '#fff' }}>Industries We Serve</h2>
            <p className="font-ui text-[13px] leading-[1.7] mb-6" style={{ color: 'rgba(255,255,255,0.48)' }}>
              From hydroelectric power infrastructure to precision manufacturing lines, we source and deliver the right technical equipment for demanding industrial environments.
            </p>
            <div className="flex flex-col" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {INDUSTRIES.map((ind, i) => (
                <button key={ind.id} onClick={() => setActive(i)}
                  className="text-left flex items-center justify-between px-4 py-3.5 transition-all duration-150"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', borderLeft: `2px solid ${active === i ? GOLD : 'transparent'}`, background: active === i ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[16px] opacity-80">{ind.icon}</span>
                    <div>
                      <div className="font-display font-700 text-[14px]" style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.6)' }}>{ind.name}</div>
                      {active === i && <div className="font-ui text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{ind.desc}</div>}
                    </div>
                  </div>
                  <span className="font-ui text-[11px] font-600 shrink-0 ml-4" style={{ color: active === i ? GOLD : 'rgba(255,255,255,0.3)' }}>{ind.stat}</span>
                </button>
              ))}
            </div>
            <div className="mt-5">
              <Link to="/about#industries" className="font-ui text-[12px] no-underline flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                View all industries <ArrowRightIcon />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative overflow-hidden" style={{ height: 380, background: '#0d2347' }}>
              <img src="https://images.unsplash.com/photo-1578776349090-de61da00ff1a?w=900&h=640&fit=crop&auto=format"
                alt="Industrial facility" className="w-full h-full object-cover" style={{ opacity: 0.55 }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,46,97,0.92) 0%, rgba(8,46,97,0.2) 55%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-px" style={{ background: GOLD }} />
                  <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>Currently Viewing</span>
                </div>
                <div className="font-display font-800 text-white text-[26px] leading-none mb-1">{INDUSTRIES[active].name}</div>
                <div className="font-ui text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>{INDUSTRIES[active].desc}</div>
              </div>
              <div className="absolute top-0 right-0 w-10 h-10" style={{ borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Brands ────────────────────────────────────────────────────────────────────
function BrandsSection() {
  return (
    <section className="py-7 lg:py-10" style={{ background: '#fff', borderTop: '1px solid #e4e8ef', borderBottom: '1px solid #e4e8ef' }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ background: '#dde2ea' }} />
            <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: '#94a3b8' }}>Authorised Brand Partners</span>
          </div>
          <Link to="/about#brands" className="font-ui text-[11px] no-underline" style={{ color: BLUE }}>View All</Link>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-px" style={{ background: '#e4e8ef' }}>
          {BRAND_NAMES.map((brand) => (
            <div key={brand} className="flex items-center justify-center px-3 py-4 cursor-pointer transition-colors duration-150"
              style={{ background: '#fff' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F5F7FA')} onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
              <span className="font-display font-700 text-[10px] tracking-[0.14em] uppercase text-center transition-colors duration-150" style={{ color: '#aab4c4' }}
                onMouseEnter={e => (e.currentTarget.style.color = NAVY)} onMouseLeave={e => (e.currentTarget.style.color = '#aab4c4')}>
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  const t = useT()
  return (
    <section className="relative overflow-hidden py-10 lg:py-16" style={{ background: '#07213d' }}>
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <img src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1600&h=600&fit=crop&auto=format"
          alt="Industrial factory" className="w-full h-full object-cover" style={{ opacity: 0.18 }} />
        <div className="absolute inset-0" style={{ background: 'rgba(7,33,61,0.55)', pointerEvents: 'none' }} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: GOLD, pointerEvents: 'none' }} />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 text-center" style={{ zIndex: 1 }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-8" style={{ background: GOLD, opacity: 0.6 }} />
          <span className="font-ui text-[10px] tracking-[0.24em] uppercase font-600" style={{ color: GOLD }}>Get in Touch</span>
          <div className="h-px w-8" style={{ background: GOLD, opacity: 0.6 }} />
        </div>
        <h2 className="font-display font-800 text-white mb-4" style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', letterSpacing: '-0.01em', lineHeight: 1.05 }}>
          Need Industrial Equipment?
        </h2>
        <p className="font-ui text-[13.5px] leading-[1.7] max-w-md mx-auto mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Tell us what you need. Our technical team will provide specifications, availability, and competitive pricing within 24 hours.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/rfq" className="flex items-center gap-2 font-ui text-[13px] font-600 px-8 py-3 no-underline" style={{ background: BLUE, color: '#fff' }}
            onMouseEnter={e => (e.currentTarget.style.background = BLUE_H)} onMouseLeave={e => (e.currentTarget.style.background = BLUE)}>
            {t.common.request_quote} <ArrowRightIcon />
          </Link>
          <Link to="/contact" className="font-ui text-[13px] font-500 px-8 py-3 no-underline" style={{ border: '1px solid rgba(255,255,255,0.22)', color: 'rgba(255,255,255,0.8)' }}>
            {t.common.contact_us}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <IndustriesSection />
      <BrandsSection />
      <CTASection />
    </>
  )
}
