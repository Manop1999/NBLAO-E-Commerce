import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'

const NAVY = '#082E61'
const BLUE = '#0099FF'
const GOLD = '#D4AF37'

const inputStyle = {
  border: '1px solid #D9E2EC', color: NAVY, background: '#fff',
  padding: '10px 12px', width: '100%', fontFamily: 'Inter, sans-serif', fontSize: 13, outline: 'none',
}

const OFFICES = [
  {
    city: 'Vientiane (HQ)',
    address: 'Km 3, Thadeua Road, Xaysettha District, Vientiane Capital, Laos PDR 01000',
    phone: '+856 21 314 556',
    email: 'info@nblao.la',
    hours: 'Mon–Fri 08:00–17:30, Sat 08:00–12:00',
  },
  {
    city: 'Savannakhet Branch',
    address: '123 Khanthabouli Road, Savannakhet Province, Laos PDR',
    phone: '+856 41 212 233',
    email: 'svk@nblao.la',
    hours: 'Mon–Fri 08:00–17:00',
  },
]

const DEPTS = [
  { label: 'General Enquiries', email: 'info@nblao.la' },
  { label: 'Sales & Quotations', email: 'sales@nblao.la' },
  { label: 'Technical Support', email: 'techsupport@nblao.la' },
  { label: 'Procurement / Vendors', email: 'procurement@nblao.la' },
]

export default function Contact() {
  const t = useT()
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', department: 'General Enquiries', subject: '', message: '',
  })
  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(v => ({ ...v, [f]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSent(true) }, 1400)
  }

  return (
    <div style={{ background: '#F5F7FA' }}>
      {/* Page header */}
      <div className="bg-white" style={{ borderBottom: '1px solid #dde2ea' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px]" style={{ background: GOLD }} />
            <span className="font-ui text-[10px] tracking-[0.22em] uppercase font-600" style={{ color: GOLD }}>{t.contact.title}</span>
          </div>
          <h1 className="font-display font-800 text-[40px]" style={{ color: NAVY }}>{t.contact.title}</h1>
          <p className="font-ui text-[14px] mt-2" style={{ color: '#52677D' }}>
            {t.contact.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Contact form */}
          <div className="bg-white p-8" style={{ border: '1px solid #dde2ea' }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 flex items-center justify-center mb-5" style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}` }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2 className="font-display font-800 text-[24px] mb-3" style={{ color: NAVY }}>{t.common.success}</h2>
                <p className="font-ui text-[14px] mb-6" style={{ color: '#52677D' }}>
                  {t.contact.success}
                </p>
                <button onClick={() => setSent(false)} className="font-ui text-[13px] font-600 px-6 py-2.5" style={{ border: `1px solid ${NAVY}`, color: NAVY }}>
                  {t.contact.send}
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display font-700 text-[22px] mb-6" style={{ color: NAVY }}>Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-ui text-[12px] font-600 mb-1.5" style={{ color: NAVY }}>{t.contact.name} <span style={{ color: '#ef4444' }}>*</span></label>
                      <input value={form.name} onChange={set('name')} required style={inputStyle} />
                    </div>
                    <div>
                      <label className="block font-ui text-[12px] font-600 mb-1.5" style={{ color: NAVY }}>Company Name</label>
                      <input value={form.company} onChange={set('company')} style={inputStyle} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-ui text-[12px] font-600 mb-1.5" style={{ color: NAVY }}>{t.contact.email} <span style={{ color: '#ef4444' }}>*</span></label>
                      <input type="email" value={form.email} onChange={set('email')} required style={inputStyle} />
                    </div>
                    <div>
                      <label className="block font-ui text-[12px] font-600 mb-1.5" style={{ color: NAVY }}>Phone Number</label>
                      <input value={form.phone} onChange={set('phone')} style={inputStyle} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-ui text-[12px] font-600 mb-1.5" style={{ color: NAVY }}>Department</label>
                      <select value={form.department} onChange={set('department')} style={inputStyle}>
                        {DEPTS.map(d => <option key={d.label}>{d.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block font-ui text-[12px] font-600 mb-1.5" style={{ color: NAVY }}>{t.contact.subject} <span style={{ color: '#ef4444' }}>*</span></label>
                      <input value={form.subject} onChange={set('subject')} required style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-ui text-[12px] font-600 mb-1.5" style={{ color: NAVY }}>{t.contact.message} <span style={{ color: '#ef4444' }}>*</span></label>
                    <textarea value={form.message} onChange={set('message')} required rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="submit" disabled={submitting}
                      className="font-ui text-[13px] font-600 px-8 py-3 text-white disabled:opacity-60"
                      style={{ background: BLUE }}>
                      {submitting ? t.common.loading : t.contact.send}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Offices */}
            {OFFICES.map(o => (
              <div key={o.city} className="bg-white p-6" style={{ border: '1px solid #dde2ea' }}>
                <div className="flex items-center gap-2.5 mb-4 pb-3" style={{ borderBottom: `2px solid ${GOLD}` }}>
                  <span className="font-display font-700 text-[15px]" style={{ color: NAVY }}>{o.city}</span>
                </div>
                {[
                  { icon: '📍', text: o.address },
                  { icon: '📞', text: o.phone },
                  { icon: '✉️', text: o.email },
                  { icon: '🕐', text: o.hours },
                ].map(row => (
                  <div key={row.icon} className="flex gap-3 py-2">
                    <span className="text-[14px] shrink-0 mt-0.5">{row.icon}</span>
                    <span className="font-ui text-[12px] leading-relaxed" style={{ color: '#52677D' }}>{row.text}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Department contacts */}
            <div className="bg-white p-6" style={{ border: '1px solid #dde2ea' }}>
              <div className="font-display font-700 text-[15px] mb-4 pb-3" style={{ color: NAVY, borderBottom: `1px solid #f0f4f8` }}>
                Direct Contacts
              </div>
              {DEPTS.map(d => (
                <div key={d.label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #f0f4f8' }}>
                  <span className="font-ui text-[12px]" style={{ color: '#52677D' }}>{d.label}</span>
                  <span className="font-ui text-[12px] font-600" style={{ color: BLUE }}>{d.email}</span>
                </div>
              ))}
            </div>

            {/* RFQ shortcut */}
            <div className="p-5" style={{ background: NAVY }}>
              <div className="font-display font-700 text-[16px] text-white mb-2">Need a Quotation?</div>
              <p className="font-ui text-[12px] mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Submit a Request for Quotation and our team will respond within 24 hours.
              </p>
              <Link to="/rfq" className="block text-center font-ui text-[12px] font-600 py-2.5 no-underline" style={{ background: GOLD, color: NAVY }}>
                Submit RFQ →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
