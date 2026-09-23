import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { PRODUCTS } from '../data'
import { StockBadge } from '../components/StockBadge'
import { useT } from '../i18n'

const NAVY = '#082E61'
const BLUE = '#0099FF'
const GOLD = '#D4AF37'

export default function Compare() {
  const t = useT()
  const { compare, toggleCompare, addToCart } = useStore()
  const products = PRODUCTS.filter(p => compare.includes(p.id))

  if (products.length === 0) {
    return (
      <div>
        <div className="max-w-[1440px] mx-auto px-6 py-20 text-center">
          <div className="font-display font-800 text-[64px] mb-4" style={{ color: '#dde2ea' }}>⇌</div>
          <h1 className="font-display font-800 text-[26px] mb-3" style={{ color: NAVY }}>{t.compare.empty}</h1>
          <p className="font-ui text-[13px] mb-8" style={{ color: '#52677D' }}>
            {t.compare.empty_desc}
          </p>
          <Link
            to="/products"
            className="font-ui text-[13px] font-600 px-6 py-2.5 text-white no-underline"
            style={{ background: BLUE }}
          >
            {t.compare.browse}
          </Link>
        </div>
      </div>
    )
  }

  // Collect all unique spec labels
  const allSpecLabels = Array.from(
    new Set(products.flatMap(p => p.specs.map(s => s.label)))
  )

  return (
    <div>
      <div style={{ background: NAVY, padding: '32px 0' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8" style={{ background: GOLD, opacity: 0.5 }} />
            <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>Comparison</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-display font-800 text-[28px] text-white">
              {t.compare.title} ({products.length})
            </h1>
            <Link to="/products" className="font-ui text-[12px] no-underline" style={{ color: 'rgba(255,255,255,0.55)' }}>
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-10 overflow-x-auto">
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600 }}>
          {/* Product header row */}
          <thead>
            <tr>
              <th className="text-left py-3 pr-6 w-40 font-ui text-[11px] uppercase tracking-[0.1em]" style={{ color: '#94a3b8', borderBottom: '2px solid #dde2ea' }}>
                &nbsp;
              </th>
              {products.map(p => (
                <th key={p.id} className="pb-4 px-4 align-top" style={{ borderBottom: '2px solid #dde2ea', verticalAlign: 'bottom' }}>
                  <div className="relative">
                    <button
                      onClick={() => toggleCompare(p.id)}
                      className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center font-ui text-[11px] hover:opacity-70"
                      style={{ color: '#94a3b8' }}
                      title={t.compare.remove}
                    >
                      ✕
                    </button>
                    <div
                      className="w-full aspect-square max-w-[140px] mx-auto mb-3 flex items-center justify-center text-[36px]"
                      style={{ background: '#F5F7FA', border: '1px solid #dde2ea' }}
                    >
                      {p.img}
                    </div>
                    <Link
                      to={`/products/${p.id}`}
                      className="font-display font-700 text-[14px] no-underline hover:underline block text-center"
                      style={{ color: NAVY }}
                    >
                      {p.name}
                    </Link>
                    <p className="font-ui text-[12px] text-center mt-1" style={{ color: '#52677D' }}>{p.brand}</p>
                    <p className="font-ui text-[11px] text-center mt-0.5" style={{ color: '#94a3b8' }}>{p.sku}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Price row */}
            <tr style={{ background: '#fafbfd' }}>
              <td className="py-3 pr-6 font-ui text-[12px] font-600" style={{ color: NAVY, borderBottom: '1px solid #f0f4f8' }}>Price</td>
              {products.map(p => (
                <td key={p.id} className="py-3 px-4 text-center" style={{ borderBottom: '1px solid #f0f4f8' }}>
                  <span className="font-display font-700 text-[16px]" style={{ color: NAVY }}>{p.priceDisplay}</span>
                  <span className="font-ui text-[11px] ml-1" style={{ color: '#94a3b8' }}>/{p.priceUnit}</span>
                </td>
              ))}
            </tr>

            {/* MOQ row */}
            <tr>
              <td className="py-3 pr-6 font-ui text-[12px] font-600" style={{ color: NAVY, borderBottom: '1px solid #f0f4f8' }}>MOQ</td>
              {products.map(p => (
                <td key={p.id} className="py-3 px-4 text-center font-ui text-[13px]" style={{ color: '#374151', borderBottom: '1px solid #f0f4f8' }}>
                  {p.moq ? `${p.moq} ${p.priceUnit}` : '—'}
                </td>
              ))}
            </tr>

            {/* Lead time row */}
            <tr style={{ background: '#fafbfd' }}>
              <td className="py-3 pr-6 font-ui text-[12px] font-600" style={{ color: NAVY, borderBottom: '1px solid #f0f4f8' }}>Lead Time</td>
              {products.map(p => (
                <td key={p.id} className="py-3 px-4 text-center font-ui text-[13px]" style={{ color: '#374151', borderBottom: '1px solid #f0f4f8' }}>
                  {p.leadTime || 'Stock item'}
                </td>
              ))}
            </tr>

            {/* Stock row */}
            <tr>
              <td className="py-3 pr-6 font-ui text-[12px] font-600" style={{ color: NAVY, borderBottom: '1px solid #f0f4f8' }}>Availability</td>
              {products.map(p => (
                <td key={p.id} className="py-3 px-4 text-center" style={{ borderBottom: '1px solid #f0f4f8' }}>
                  <StockBadge stock={p.stock} stockLabel={p.stockLabel} />
                </td>
              ))}
            </tr>

            {/* Certifications */}
            <tr style={{ background: '#fafbfd' }}>
              <td className="py-3 pr-6 font-ui text-[12px] font-600" style={{ color: NAVY, borderBottom: '1px solid #f0f4f8' }}>Certifications</td>
              {products.map(p => (
                <td key={p.id} className="py-3 px-4 text-center" style={{ borderBottom: '1px solid #f0f4f8' }}>
                  {p.certifications.length > 0 ? (
                    <div className="flex flex-wrap gap-1 justify-center">
                      {p.certifications.map(c => (
                        <span key={c} className="font-ui text-[10px] px-2 py-0.5 font-600" style={{ background: '#EEF4FF', color: NAVY }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="font-ui text-[12px]" style={{ color: '#94a3b8' }}>—</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr>
              <td className="py-3 pr-6 font-ui text-[12px] font-600" style={{ color: NAVY, borderBottom: '1px solid #f0f4f8' }}>Category</td>
              {products.map(p => (
                <td key={p.id} className="py-3 px-4 text-center font-ui text-[12px]" style={{ color: '#374151', borderBottom: '1px solid #f0f4f8' }}>
                  {p.subcategory}
                </td>
              ))}
            </tr>

            {/* Specs */}
            {allSpecLabels.map((label, i) => (
              <tr key={label} style={{ background: i % 2 === 0 ? '#fafbfd' : '#fff' }}>
                <td className="py-3 pr-6 font-ui text-[12px] font-600" style={{ color: NAVY, borderBottom: '1px solid #f0f4f8' }}>
                  {label}
                </td>
                {products.map(p => {
                  const spec = p.specs.find(s => s.label === label)
                  return (
                    <td key={p.id} className="py-3 px-4 text-center font-ui text-[12px]" style={{ color: '#374151', borderBottom: '1px solid #f0f4f8' }}>
                      {spec ? spec.value : <span style={{ color: '#94a3b8' }}>—</span>}
                    </td>
                  )
                })}
              </tr>
            ))}

            {/* CTA row */}
            <tr>
              <td className="py-4 pr-6 font-ui text-[12px] font-600" style={{ color: NAVY }}>Actions</td>
              {products.map(p => (
                <td key={p.id} className="py-4 px-4">
                  <div className="flex flex-col gap-2 items-center">
                    {p.stock > 0 ? (
                      <button
                        onClick={() => addToCart({ id: p.id, name: p.name, sku: p.sku, price: p.price, img: p.img, category: p.category, brand: p.brand, stock: p.stock, priceUnit: p.priceUnit })}
                        className="w-full font-ui text-[12px] font-600 py-2 text-white"
                        style={{ background: BLUE }}
                      >
                        {t.compare.add_to_cart}
                      </button>
                    ) : (
                      <span className="font-ui text-[12px]" style={{ color: '#94a3b8' }}>{t.common.out_of_stock}</span>
                    )}
                    <Link
                      to={`/products/${p.id}`}
                      className="w-full font-ui text-[12px] font-600 py-2 text-center no-underline"
                      style={{ border: '1px solid #D9E2EC', color: NAVY, background: '#fff' }}
                    >
                      {t.common.learn_more}
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
