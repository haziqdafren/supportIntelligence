const TITLES = {
  overview: 'Overview',
  analytics: 'Support Analytics',
  classification: 'AI Classification',
  automation: 'Automation',
}
const SUBS = {
  overview: 'Support operations at a glance',
  analytics: 'Ticket volume, SLA trends & breakdowns',
  classification: 'ML model performance & predictions',
  automation: 'Opportunities to reduce manual work',
}

export default function TopBar({ activePage }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  return (
    <header style={{
      height: 60, background: 'rgba(240,242,245,0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', position: 'sticky', top: 0, zIndex: 9,
    }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#0a0e1a', letterSpacing: '-0.4px', fontFamily: 'Inter', lineHeight: 1.1 }}>
          {TITLES[activePage]}
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter', fontWeight: 400, marginTop: 1 }}>
          {SUBS[activePage]}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 11.5, color: '#94a3b8', fontFamily: 'Inter' }}>Updated {today}</div>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 2px rgba(16,185,129,0.2)' }}/>
      </div>
    </header>
  )
}
