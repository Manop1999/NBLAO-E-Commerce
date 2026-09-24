import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { useT } from "../i18n";
import { CATEGORY_SUBS } from "../data";
import logo from "../assets/image/LOGO.png";

const NAVY = "#082E61";
const BLUE = "#0099FF";
const BLUE_H = "#007ACC";
const GOLD = "#D4AF37";

// ─── Icons ───────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const CartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MenuIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const XIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6z" />
  </svg>
);
const MailIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const MapPinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ChevronDown = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MAIN_CATEGORIES = Object.keys(CATEGORY_SUBS);

const NAV_ITEMS = [
  { labelKey: "home", to: "/" },
  { labelKey: "products", to: "/products", hasMega: true },
  { labelKey: "industries", to: "/about#industries" },
  { labelKey: "services", to: "/services" },
  { labelKey: "about", to: "/about" },
  { labelKey: "brands", to: "/about#brands" },
  { labelKey: "contact", to: "/contact" },
];

// ─── Logo ────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <Link to="/" className="flex items-center shrink-0 no-underline">
      <img
        src={logo}
        alt="NB Lao Sole Co., Ltd."
        className="block w-auto h-10 max-w-[190px] object-contain"
      />
    </Link>
  );
}

// ─── Desktop Mega Menu ────────────────────────────────────────────────────────
function MegaMenu({
  onClose,
  t,
}: {
  onClose: () => void;
  t: ReturnType<typeof useT>;
}) {
  return (
    <div
      className="bg-white w-full"
      style={{
        border: "1px solid #dde2ea",
        borderTop: `2px solid ${GOLD}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-display font-700 text-[13px] tracking-wide"
            style={{ color: NAVY }}
          >
            {t.header.browse_category}
          </span>
          <Link
            to="/products"
            onClick={onClose}
            className="font-ui text-[12px] no-underline flex items-center gap-1 hover:underline"
            style={{ color: BLUE }}
          >
            {t.header.all_products} →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-x-10 gap-y-0">
          {MAIN_CATEGORIES.map((cat) => {
            const subs = CATEGORY_SUBS[cat];
            return (
              <div key={cat} className="mb-5">
                <Link
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  onClick={onClose}
                  className="no-underline block font-display font-700 text-[12px] tracking-wide mb-2 hover:text-[#0099FF] transition-colors"
                  style={{ color: NAVY }}
                >
                  {cat}
                </Link>
                <div className="flex flex-col gap-0.5">
                  {subs.map((sub) => (
                    <Link
                      key={sub}
                      to={`/products?category=${encodeURIComponent(cat)}&subcategory=${encodeURIComponent(sub)}`}
                      onClick={onClose}
                      className="no-underline font-ui text-[12px] py-0.5 hover:text-[#0099FF] transition-colors"
                      style={{ color: "#52677D" }}
                    >
                      {sub}
                    </Link>
                  ))}
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={onClose}
                    className="no-underline font-ui text-[11px] font-600 py-0.5 mt-0.5 hover:underline"
                    style={{ color: BLUE }}
                  >
                    {t.header.view_all_cat} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-4 mt-1" style={{ borderTop: "1px solid #e4e8ef" }}>
          <Link
            to="/rfq"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-ui text-[12px] font-600 px-5 py-2.5 no-underline text-white transition-colors"
            style={{ background: BLUE }}
          >
            {t.header.request_quote}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Language Switcher (dark on white header) ─────────────────────────────────
function LangSwitcherHeader() {
  const { lang, setLang } = useStore();
  return (
    <div
      className="flex items-center shrink-0"
      style={{ border: "1px solid #dde2ea", borderRadius: 3 }}
    >
      <button
        onClick={() => setLang("en")}
        className="font-ui text-[11px] font-600 px-2.5 py-1.5 transition-colors"
        style={{
          background: lang === "en" ? NAVY : "transparent",
          color: lang === "en" ? "#fff" : "#64748b",
          borderRadius: "2px 0 0 2px",
        }}
      >
        EN
      </button>
      <span style={{ color: "#dde2ea", fontSize: 10, lineHeight: 1 }}>|</span>
      <button
        onClick={() => setLang("lo")}
        className="font-ui text-[11px] font-600 px-2.5 py-1.5 transition-colors"
        style={{
          background: lang === "lo" ? NAVY : "transparent",
          color: lang === "lo" ? "#fff" : "#64748b",
          borderRadius: "0 2px 2px 0",
        }}
      >
        ລາວ
      </button>
    </div>
  );
}

// ─── Language Switcher (light on navy utility bar) ─────────────────────────────
function LangSwitcherUtility() {
  const { lang, setLang } = useStore();
  return (
    <div
      className="flex items-center gap-0 shrink-0"
      style={{ border: "1px solid rgba(255,255,255,0.18)", borderRadius: 3 }}
    >
      <button
        onClick={() => setLang("en")}
        className="font-ui text-[11px] font-600 px-2.5 py-1 transition-colors"
        style={{
          background: lang === "en" ? "rgba(255,255,255,0.18)" : "transparent",
          color: lang === "en" ? "#fff" : "rgba(255,255,255,0.45)",
        }}
      >
        EN
      </button>
      <span style={{ color: "rgba(255,255,255,0.18)", fontSize: 10 }}>|</span>
      <button
        onClick={() => setLang("lo")}
        className="font-ui text-[11px] font-600 px-2.5 py-1 transition-colors"
        style={{
          background: lang === "lo" ? "rgba(255,255,255,0.18)" : "transparent",
          color: lang === "lo" ? "#fff" : "rgba(255,255,255,0.45)",
        }}
      >
        ລາວ
      </button>
    </div>
  );
}

// ─── Mobile Nav Drawer ────────────────────────────────────────────────────────
function MobileDrawer({ t }: { t: ReturnType<typeof useT> }) {
  const { activeDrawer, setActiveDrawer } = useStore();
  const open = activeDrawer === "nav";
  const onClose = () => setActiveDrawer(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const navLinks = NAV_ITEMS.filter(
    (i) => i.labelKey !== "home" && i.labelKey !== "products",
  );
  const navT = t.nav as Record<string, string>;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{
          background: "rgba(0,0,0,0.45)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 200ms ease-out",
        }}
        onClick={onClose}
      />

      {/* Drawer — slides from right */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col w-[300px] max-w-[90vw]"
        style={{
          background: "#fff",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.18)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms ease-out",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid #e4e8ef" }}
        >
          <Logo />
          <button onClick={onClose} className="p-1" style={{ color: NAVY }}>
            <XIcon />
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto">
          {/* Home */}
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center font-ui text-[14px] px-5 py-3.5 no-underline"
            style={{ color: NAVY, borderBottom: "1px solid #f0f3f7" }}
          >
            {t.nav.home}
          </Link>

          {/* Products — DIRECT LINK, no arrow, no accordion, no dropdown */}
          <Link
            to="/products"
            onClick={onClose}
            className="flex items-center font-ui text-[14px] px-5 py-3.5 no-underline"
            style={{ color: NAVY, borderBottom: "1px solid #f0f3f7" }}
          >
            {t.nav.products}
          </Link>

          {/* Remaining nav items */}
          {navLinks.map((item) => (
            <Link
              key={item.labelKey}
              to={item.to}
              onClick={onClose}
              className="flex items-center font-ui text-[14px] px-5 py-3.5 no-underline"
              style={{ color: NAVY, borderBottom: "1px solid #f0f3f7" }}
            >
              {navT[item.labelKey]}
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="px-5 py-4" style={{ borderTop: "1px solid #e4e8ef" }}>
          <Link
            to="/rfq"
            onClick={onClose}
            className="block font-ui text-[13px] font-600 py-3 text-center no-underline text-white"
            style={{ background: BLUE }}
          >
            {t.nav.rfq}
          </Link>
        </div>
      </div>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header() {
  const [search, setSearch] = useState("");
  const [megaOpen, setMegaOpen] = useState(false);
  const { cartCount, setActiveDrawer } = useStore();
  const navigate = useNavigate();
  const t = useT();
  const navT = t.nav as Record<string, string>;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ boxShadow: "0 1px 0 #dde2ea" }}
    >
      {/* ── Utility bar — DESKTOP ONLY ──────────────────────────────────────── */}
      <div className="hidden lg:block" style={{ background: NAVY }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-[7px] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:+85620555567890"
              className="flex items-center gap-1.5 font-ui text-[11px]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <PhoneIcon /> +856 20 5555 6789
            </a>
            <a
              href="mailto:info@nblaosolelao.com"
              className="flex items-center gap-1.5 font-ui text-[11px]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <MailIcon /> info@nblaosolelao.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="font-ui text-[10px] tracking-[0.16em] uppercase"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Industrial Supply · Vientiane, Laos PDR
            </span>
            <Link
              to="/admin"
              className="font-ui text-[10px] tracking-wide"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t.nav.admin}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main header ──────────────────────────────────────────────────────── */}
      <div
        className="bg-white relative"
        style={{ borderBottom: "1px solid #eaecf0" }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header row */}
          <div className="flex items-center justify-between h-[62px] gap-3 lg:gap-6">
            <Logo />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0 flex-1 justify-center">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.labelKey}
                  className="relative"
                  onMouseEnter={() => item.hasMega && setMegaOpen(true)}
                  onMouseLeave={() => item.hasMega && setMegaOpen(false)}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 font-ui text-[13px] font-500 px-3.5 py-5 transition-colors duration-150 no-underline ${isActive ? "border-b-2" : ""}`
                    }
                    style={({ isActive }) => ({
                      color: isActive ? NAVY : "#475569",
                      borderBottomColor: isActive ? GOLD : "transparent",
                    })}
                    end={item.to === "/"}
                  >
                    {navT[item.labelKey]}
                    {item.hasMega && <ChevronDown />}
                  </NavLink>
                </div>
              ))}
            </nav>

            {/* Desktop actions: Search + Account + Cart + Lang */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Persistent search box */}
              <form onSubmit={handleSearch} className="shrink-0">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 w-[240px]"
                  style={{ border: "1px solid #dde2ea", background: "#f7f8fa" }}
                >
                  <span className="text-[#94a3b8] shrink-0">
                    <SearchIcon />
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t.header.search_placeholder}
                    className="flex-1 bg-transparent font-ui text-[13px] outline-none"
                    style={{ color: NAVY }}
                  />
                </div>
              </form>
              <Link
                to="/account"
                className="text-[#94a3b8] hover:text-[#082E61] transition-colors"
              >
                <UserIcon />
              </Link>
              <Link
                to="/cart"
                className="relative text-[#94a3b8] hover:text-[#082E61] transition-colors"
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-white text-[9px] font-700 rounded-full"
                    style={{ background: BLUE }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
              {/* Language switcher — replaces RFQ button */}
              <LangSwitcherHeader />
            </div>

            {/* Mobile icons: Account + Cart + Hamburger */}
            <div className="lg:hidden flex items-center gap-3">
              <Link to="/account" style={{ color: "#94a3b8" }}>
                <UserIcon />
              </Link>
              <Link
                to="/cart"
                className="relative"
                style={{ color: "#94a3b8" }}
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-white text-[9px] font-700 rounded-full"
                    style={{ background: BLUE }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
              <button
                style={{ color: NAVY }}
                onClick={() => setActiveDrawer("nav")}
              >
                <MenuIcon />
              </button>
            </div>
          </div>

          {/* ── Mobile search bar — directly below header row ─────────────────── */}
          <div className="lg:hidden pb-3">
            <form onSubmit={handleSearch}>
              <div
                className="flex items-center gap-2.5 px-3 py-2.5"
                style={{ border: "1px solid #e4e8ef", background: "#f7f8fa" }}
              >
                <span className="text-[#94a3b8] shrink-0">
                  <SearchIcon />
                </span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.header.search_placeholder}
                  className="flex-1 bg-transparent font-ui text-[14px] outline-none"
                  style={{ color: NAVY }}
                />
              </div>
            </form>
          </div>
        </div>

        {/* ── Desktop Mega Menu — anchored to header container, full width ──── */}
        {megaOpen && (
          <div
            className="absolute left-0 right-0 top-full z-50 hidden lg:block"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <MegaMenu onClose={() => setMegaOpen(false)} t={t} />
          </div>
        )}
      </div>

      {/* Mobile/tablet drawer */}
      <MobileDrawer t={t} />
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      className="md:border-none"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 md:hidden"
        style={{ background: "transparent", color: "#fff" }}
      >
        <span className="font-display font-700 text-[11px] tracking-[0.18em] uppercase">
          {title}
        </span>
        <span
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        >
          <ChevronDown size={14} />
        </span>
      </button>
      <h4 className="hidden md:block font-display font-700 text-[11px] tracking-[0.18em] uppercase mb-3 text-white">
        {title}
      </h4>
      <div className={open ? "pb-3" : ""}>
        <div className={`md:block ${open ? "block" : "hidden"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const t = useT();
  return (
    <footer style={{ background: "#060f1c", color: "#7a8ea6" }}>
      <div
        className="h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${GOLD} 0%, #b8941e 30%, transparent 100%)`,
        }}
      />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_1fr_1fr] gap-0 md:gap-8 lg:gap-10">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img
                src={logo}
                alt="NB Lao Sole Co., Ltd."
                className="block w-auto h-9 max-w-[180px] object-contain"
              />
            </div>
            <p className="font-ui text-[12px] leading-[1.7] mb-4">
              {t.footer.tagline}
            </p>
            <div className="flex flex-col gap-2">
              <span className="flex items-start gap-2 font-ui text-[12px]">
                <span className="mt-0.5 shrink-0" style={{ color: GOLD }}>
                  <MapPinIcon />
                </span>
                123 Industrial Zone, Saysettha, Vientiane, Laos PDR
              </span>
              <a
                href="tel:+85620555567890"
                className="flex items-center gap-2 font-ui text-[12px] hover:text-white transition-colors"
              >
                <span style={{ color: GOLD }}>
                  <PhoneIcon />
                </span>{" "}
                +856 20 5555 6789
              </a>
              <a
                href="mailto:info@nblaosolelao.com"
                className="flex items-center gap-2 font-ui text-[12px] hover:text-white transition-colors"
              >
                <span style={{ color: GOLD }}>
                  <MailIcon />
                </span>{" "}
                info@nblaosolelao.com
              </a>
            </div>
          </div>

          {/* Products */}
          <FooterSection title={t.footer.products}>
            <ul className="flex flex-col gap-1.5">
              {[
                "Electrical Equipment",
                "Industrial Machinery",
                "Power & Energy",
                "Tools & Equipment",
                "Safety & Fire Protection",
                "Cables & Accessories",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/products?category=${encodeURIComponent(item)}`}
                    className="font-ui text-[12px] hover:text-white transition-colors no-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Company */}
          <FooterSection title={t.footer.company}>
            <ul className="flex flex-col gap-1.5">
              {[
                { label: t.footer.about, to: "/about" },
                { label: t.footer.industries, to: "/about#industries" },
                { label: t.footer.our_services, to: "/services" },
                { label: t.footer.brand_partners, to: "/about#brands" },
                { label: t.footer.contact, to: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-ui text-[12px] hover:text-white transition-colors no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Quick Access */}
          <FooterSection title={t.footer.quick_access}>
            <ul className="flex flex-col gap-1.5">
              {[
                { label: t.footer.rfq, to: "/rfq" },
                { label: t.footer.my_orders, to: "/account?tab=orders" },
                {
                  label: t.footer.my_quotations,
                  to: "/account?tab=quotations",
                },
                { label: t.footer.wishlist, to: "/account?tab=wishlist" },
                { label: t.footer.support, to: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-ui text-[12px] hover:text-white transition-colors no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-ui text-[11px]">
            © {new Date().getFullYear()} NB Lao Sole Co., Ltd. {t.footer.rights}
          </p>
          <div className="flex gap-5">
            <Link
              to="/privacy"
              className="font-ui text-[11px] hover:text-white transition-colors no-underline"
            >
              {t.footer.privacy}
            </Link>
            <Link
              to="/terms"
              className="font-ui text-[11px] hover:text-white transition-colors no-underline"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/*
        Mobile: header row (62px) + mobile search bar (~52px) = ~114px
        Desktop (lg): utility bar (~30px) + header row (62px) = ~92px
      */}
      <main className="flex-1 pt-[114px] lg:pt-[96px]">{children}</main>
      <Footer />
    </div>
  );
}

export default PageLayout;
