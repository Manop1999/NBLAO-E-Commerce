import { Link } from 'react-router-dom'
import { useT } from '../i18n'

const NAVY = '#082E61'
const BLUE = '#0099FF'
const GOLD = '#D4AF37'

export default function NotFound() {
  const t = useT()
  return (
    <div style={{ background: '#F5F7FA', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: NAVY, padding: '10px 0' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <Link to="/" className="flex items-center gap-2.5 no-underline w-fit">
            <div className="relative flex items-center justify-center w-8 h-8" style={{ background: NAVY, border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="font-display font-800 text-white text-[11px] tracking-widest">NB</span>
              <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: GOLD }} />
            </div>
            <span className="font-display font-800 text-[15px] tracking-[0.1em] uppercase text-white">NB LAO</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-[480px]">
          <div className="font-display font-800 mb-4" style={{ fontSize: 96, lineHeight: 1, color: '#dde2ea' }}>
            404
          </div>
          <div className="h-[3px] w-12 mx-auto mb-6" style={{ background: GOLD }} />
          <h1 className="font-display font-800 text-[28px] mb-3" style={{ color: NAVY }}>
            {t.not_found.title}
          </h1>
          <p className="font-ui text-[13px] leading-relaxed mb-8" style={{ color: '#52677D' }}>
            {t.not_found.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="font-ui text-[13px] font-600 px-6 py-2.5 text-white no-underline transition-colors"
              style={{ background: NAVY }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0a3d7a'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = NAVY}
            >
              {t.not_found.back_home}
            </Link>
            <Link
              to="/products"
              className="font-ui text-[13px] font-600 px-6 py-2.5 no-underline transition-colors"
              style={{ border: '1px solid #D9E2EC', color: NAVY, background: '#fff' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f5f7fa'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
            >
              {t.products.title}
            </Link>
          </div>

          <p className="font-ui text-[12px] mt-8" style={{ color: '#94a3b8' }}>
            Need help?{' '}
            <Link to="/" className="no-underline hover:underline" style={{ color: BLUE }}>
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
