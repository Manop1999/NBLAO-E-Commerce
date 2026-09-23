import { Link } from 'react-router-dom'
import { useT } from '../i18n'

const NAVY = '#082E61'
const BLUE = '#0099FF'
const GOLD = '#D4AF37'

const INDUSTRIES = [
  { name: 'Power & Energy', img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=280&fit=crop&auto=format', desc: 'High-voltage equipment, transformers, and grid infrastructure.' },
  { name: 'Oil & Gas', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=280&fit=crop&auto=format', desc: 'Pumps, valves, and pressure-rated industrial components.' },
  { name: 'Construction', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=280&fit=crop&auto=format', desc: 'Heavy machinery, lifting equipment, and site safety solutions.' },
  { name: 'Manufacturing', img: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=280&fit=crop&auto=format', desc: 'Automation, conveyors, and precision engineering tools.' },
  { name: 'Mining', img: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=400&h=280&fit=crop&auto=format', desc: 'Extraction equipment, safety systems, and site infrastructure.' },
  { name: 'Water & Utilities', img: 'https://images.unsplash.com/photo-1536494126589-29fadf0d7e3c?w=400&h=280&fit=crop&auto=format', desc: 'Pumping stations, flow control, and treatment equipment.' },
]

const BRANDS = ['ABB', 'Siemens', 'Schneider Electric', 'Bosch Rexroth', 'Parker Hannifin', 'SKF', 'Fluke', '3M Safety', 'Legrand', 'Hager', 'Phoenix Contact', 'Weidmüller']

const CERTS = [
  { label: 'ISO 9001:2015', sub: 'Quality Management' },
  { label: 'ISO 45001', sub: 'Occupational Health & Safety' },
  { label: 'CE Certified', sub: 'European Conformity' },
  { label: 'Authorised Distributor', sub: 'ABB, Siemens, Schneider' },
]

const TEAM = [
  { name: 'Mr. Bounkhong Phommasack', role: 'Chief Executive Officer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&face=center' },
  { name: 'Ms. Khamla Sysouphanh', role: 'Head of Sales & Partnerships', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&auto=format&face=center' },
  { name: 'Mr. Somphong Viravong', role: 'Technical Director', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format&face=center' },
  { name: 'Ms. Naly Keovongsa', role: 'Operations Manager', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format&face=center' },
]

const STATS = [
  { value: '15+', label: 'Years of Operation' },
  { value: '800+', label: 'Product Lines' },
  { value: '200+', label: 'Active Clients' },
  { value: '12', label: 'Brand Partners' },
]

export default function About() {
  const t = useT()
  return (
    <div style={{ background: '#F5F7FA' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: NAVY, minHeight: 320 }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1440&h=400&fit=crop&auto=format" alt="Industrial" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16 py-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px]" style={{ background: GOLD }} />
            <span className="font-ui text-[11px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>{t.about.title}</span>
          </div>
          <h1 className="font-display font-800 text-[48px] leading-[1.08] text-white mb-5">
            Laos' Most Trusted<br />Industrial Supplier
          </h1>
          <p className="font-ui text-[15px] leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Since 2009, NB Lao has equipped Laos' most demanding industrial projects with world-class equipment, technical expertise, and unmatched after-sales support.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-white" style={{ borderBottom: '1px solid #dde2ea' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#f0f4f8]">
            {STATS.map(s => (
              <div key={s.label} className="py-6 px-8 text-center">
                <div className="font-display font-800 text-[36px] leading-none mb-1" style={{ color: NAVY }}>{s.value}</div>
                <div className="font-ui text-[12px]" style={{ color: '#52677D' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission / Vision */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[2px]" style={{ background: GOLD }} />
              <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>Our Story</span>
            </div>
            <h2 className="font-display font-800 text-[32px] leading-[1.15] mb-5" style={{ color: NAVY }}>
              Building Laos' Industrial Future
            </h2>
            <p className="font-ui text-[14px] leading-relaxed mb-4" style={{ color: '#52677D' }}>
              NB Lao Sole Co., Ltd. was founded with a singular vision: to bridge the gap between global industrial excellence and Laos' rapidly growing infrastructure demands. Starting as a small electrical components distributor in Vientiane, we have grown into the country's most comprehensive industrial supply partner.
            </p>
            <p className="font-ui text-[14px] leading-relaxed mb-4" style={{ color: '#52677D' }}>
              Today, we maintain authorised distributor agreements with 12 of the world's leading industrial brands, a technical team of 45+ specialists, and a warehouse exceeding 5,000 m² fully stocked with critical inventory.
            </p>
            <p className="font-ui text-[14px] leading-relaxed" style={{ color: '#52677D' }}>
              Our clients include power generation companies, construction conglomerates, mining operations, and government infrastructure projects across Laos and the Greater Mekong Subregion.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Mission', text: 'To empower Laos\' industries with reliable, certified equipment and the technical knowledge to operate it safely and efficiently.' },
              { label: 'Vision', text: 'To be Southeast Asia\'s most trusted industrial supply partner, connecting regional markets with world-class technology.' },
              { label: 'Values', text: 'Quality without compromise. Service beyond the sale. Partnerships built on integrity and long-term commitment.' },
            ].map(v => (
              <div key={v.label} className="bg-white p-6" style={{ border: '1px solid #dde2ea' }}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-3 h-3 shrink-0" style={{ background: GOLD }} />
                  <span className="font-display font-700 text-[16px]" style={{ color: NAVY }}>{v.label}</span>
                </div>
                <p className="font-ui text-[13px] leading-relaxed" style={{ color: '#52677D' }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white" style={{ borderTop: '1px solid #dde2ea', borderBottom: '1px solid #dde2ea' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-6 h-[2px]" style={{ background: GOLD }} />
              <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>Sectors We Serve</span>
              <div className="w-6 h-[2px]" style={{ background: GOLD }} />
            </div>
            <h2 className="font-display font-800 text-[30px]" style={{ color: NAVY }}>Industries We Serve</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="overflow-hidden group" style={{ border: '1px solid #dde2ea' }}>
                <div className="overflow-hidden" style={{ height: 160 }}>
                  <img src={ind.img} alt={ind.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4 bg-white">
                  <div className="font-display font-700 text-[14px] mb-1.5" style={{ color: NAVY }}>{ind.name}</div>
                  <p className="font-ui text-[12px] leading-relaxed" style={{ color: '#52677D' }}>{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand partners */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-[2px]" style={{ background: GOLD }} />
            <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>Our Partners</span>
            <div className="w-6 h-[2px]" style={{ background: GOLD }} />
          </div>
          <h2 className="font-display font-800 text-[30px]" style={{ color: NAVY }}>Authorised Brand Partners</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0" style={{ border: '1px solid #dde2ea' }}>
          {BRANDS.map((b, i) => (
            <div key={b} className="flex items-center justify-center py-6 px-4" style={{
              borderRight: (i + 1) % 6 !== 0 ? '1px solid #f0f4f8' : 'none',
              borderBottom: i < BRANDS.length - 6 ? '1px solid #f0f4f8' : 'none',
              background: '#fff'
            }}>
              <span className="font-display font-700 text-[12px] text-center" style={{ color: NAVY }}>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white" style={{ borderTop: '1px solid #dde2ea', borderBottom: '1px solid #dde2ea' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14">
          <div className="text-center mb-8">
            <h2 className="font-display font-800 text-[28px]" style={{ color: NAVY }}>Certifications & Compliance</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CERTS.map(c => (
              <div key={c.label} className="text-center p-6" style={{ border: `1px solid #dde2ea`, background: '#fafbfc' }}>
                <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center" style={{ background: `${GOLD}20`, border: `1px solid ${GOLD}40` }}>
                  <div className="w-3 h-3" style={{ background: GOLD }} />
                </div>
                <div className="font-display font-700 text-[14px] mb-1" style={{ color: NAVY }}>{c.label}</div>
                <div className="font-ui text-[11px]" style={{ color: '#52677D' }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership team */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-14">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-[2px]" style={{ background: GOLD }} />
            <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>Leadership</span>
            <div className="w-6 h-[2px]" style={{ background: GOLD }} />
          </div>
          <h2 className="font-display font-800 text-[30px]" style={{ color: NAVY }}>Our Leadership Team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {TEAM.map(m => (
            <div key={m.name} className="bg-white overflow-hidden" style={{ border: '1px solid #dde2ea' }}>
              <div style={{ height: 180, overflow: 'hidden' }}>
                <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-4" style={{ borderTop: `2px solid ${GOLD}` }}>
                <div className="font-display font-700 text-[14px] leading-snug mb-1" style={{ color: NAVY }}>{m.name}</div>
                <div className="font-ui text-[11px]" style={{ color: BLUE }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ background: NAVY }}>
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h2 className="font-display font-800 text-[32px] text-white mb-4">Ready to Work With Us?</h2>
          <p className="font-ui text-[14px] mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Contact our sales team to discuss your project requirements, request a quotation, or schedule a technical consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="font-ui text-[13px] font-600 px-8 py-3.5 text-white no-underline" style={{ background: BLUE }}>Get In Touch</Link>
            <Link to="/rfq" className="font-ui text-[13px] font-600 px-8 py-3.5 no-underline" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>Request a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
