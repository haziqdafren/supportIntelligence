const NAV = [
  { id: 'overview', label: 'Overview', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  )},
  { id: 'analytics', label: 'Analytics', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="9" width="4" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="7" y="5" width="4" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <rect x="13" y="1" width="4" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  )},
  { id: 'classification', label: 'AI Classification', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { id: 'automation', label: 'Automation', icon: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1L11.5 6.5H17L12.5 10L14.5 16L9 12.5L3.5 16L5.5 10L1 6.5H6.5L9 1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  )},
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside style={{
      width: 200, minWidth: 200,
      background: '#0f1117',
      display: 'flex', flexDirection: 'column',
      padding: '20px 12px 24px',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      position: 'sticky', top: 0, height: '100vh', zIndex: 20,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px', marginBottom: 32 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="2" width="11" height="11" rx="3.5" fill="#2563eb"/>
          <rect x="15" y="2" width="11" height="11" rx="3.5" fill="#2563eb" opacity="0.45"/>
          <rect x="2" y="15" width="11" height="11" rx="3.5" fill="#2563eb" opacity="0.45"/>
          <rect x="15" y="15" width="11" height="11" rx="3.5" fill="#2563eb" opacity="0.2"/>
        </svg>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', fontFamily: 'Inter', letterSpacing: '-0.3px', lineHeight: 1.1 }}>SupportIQ</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter', fontWeight: 400, marginTop: 1 }}>Dashboard</div>
        </div>
      </div>

      {/* Nav label */}
      <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: 'Inter', padding: '0 6px', marginBottom: 6 }}>
        Menu
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(item => (
          <button
            key={item.id}
            className={`snav-item${activePage === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
          >
            <span style={{ flexShrink: 0, opacity: activePage === item.id ? 1 : 0.6 }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom status */}
      <div style={{ marginTop: 'auto', padding: '0 6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.04)' }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 2px rgba(16,185,129,0.25)', flexShrink: 0 }}/>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter', fontWeight: 500 }}>Connected</span>
        </div>
      </div>
    </aside>
  )
}
