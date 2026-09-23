import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'

const NAVY = '#082E61'
const BLUE = '#0099FF'
const BLUE_H = '#007ACC'
const GOLD = '#D4AF37'

export default function ForgotPassword() {
  const t = useT()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div style={{ background: '#F5F7FA', minHeight: '100vh' }}>
      <div style={{ background: NAVY, padding: '10px 0' }}>
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="relative flex items-center justify-center w-8 h-8" style={{ background: NAVY, border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="font-display font-800 text-white text-[11px] tracking-widest">NB</span>
              <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: GOLD }} />
            </div>
            <span className="font-display font-800 text-[15px] tracking-[0.1em] uppercase text-white">NB LAO</span>
          </Link>
          <Link to="/login" className="font-ui text-[12px] no-underline" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Back to sign in
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-[400px]">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: GOLD, opacity: 0.5 }} />
              <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>
                Account Recovery
              </span>
              <div className="h-px w-10" style={{ background: GOLD, opacity: 0.5 }} />
            </div>
            <h1 className="font-display font-800 text-[28px] leading-tight" style={{ color: NAVY }}>
              {submitted ? 'Check Your Email' : t.auth.reset_title}
            </h1>
          </div>

          <div className="bg-white p-8" style={{ border: '1px solid #dde2ea' }}>
            {submitted ? (
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center" style={{ background: '#ecfdf5', border: '1px solid #bbf7d0' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-ui text-[13px] leading-relaxed mb-6" style={{ color: '#52677D' }}>
                  If an account exists for <strong style={{ color: NAVY }}>{email}</strong>,
                  you will receive a password reset link within a few minutes.
                </p>
                <p className="font-ui text-[11px] mb-6" style={{ color: '#94a3b8' }}>
                  This is a prototype — no email is actually sent.
                </p>
                <Link
                  to="/login"
                  className="block w-full font-ui text-[13px] font-600 py-3 text-white text-center no-underline transition-colors"
                  style={{ background: BLUE }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = BLUE_H}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = BLUE}
                >
                  Return to Sign In
                </Link>
              </div>
            ) : (
              <>
                <p className="font-ui text-[13px] mb-5 leading-relaxed" style={{ color: '#52677D' }}>
                  {t.auth.reset_desc}
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block font-ui text-[12px] font-600 mb-1.5" style={{ color: NAVY }}>
                      {t.auth.email} <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                      className="w-full font-ui text-[13px] px-3 py-2.5 outline-none"
                      style={{ border: '1px solid #D9E2EC', color: NAVY, background: '#fff' }}
                      placeholder="your@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full font-ui text-[13px] font-600 py-3 text-white transition-colors disabled:opacity-60"
                    style={{ background: loading || !email ? '#52677D' : BLUE }}
                    onMouseEnter={e => { if (!loading && email) (e.currentTarget as HTMLElement).style.background = BLUE_H }}
                    onMouseLeave={e => { if (!loading && email) (e.currentTarget as HTMLElement).style.background = BLUE }}
                  >
                    {loading ? '...' : t.auth.send_reset}
                  </button>
                </form>

                <div className="mt-6 pt-5 text-center" style={{ borderTop: '1px solid #f0f4f8' }}>
                  <Link to="/login" className="font-ui text-[12px] font-600 no-underline hover:underline" style={{ color: BLUE }}>
                    ← {t.auth.back_login}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
