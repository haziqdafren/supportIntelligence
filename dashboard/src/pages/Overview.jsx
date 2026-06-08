import { useEffect, useState, useMemo } from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

function useCountUp(target, duration = 1100, delay = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const num = parseFloat(String(target).replace(/[^0-9.]/g, ''))
    if (isNaN(num)) return
    const timeout = setTimeout(() => {
      let start = null
      const step = ts => {
        if (!start) start = ts
        const p = Math.min((ts - start) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 4)
        setVal(Math.round(ease * num * 100) / 100)
        if (p < 1) requestAnimationFrame(step)
        else setVal(num)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, delay])
  return val
}

/* ── Row 1 hero cards ── */
function HeroDark({ value, delay }) {
  const num = parseFloat(String(value))
  const animated = useCountUp(isNaN(num) ? 0 : num, 1200, delay)
  const display = isNaN(num) ? value : Math.round(animated).toLocaleString()

  return (
    <div className="card-dark lift fade-up" style={{ padding: '26px 26px 22px', animationDelay: `${delay / 1000}s`, cursor: 'default' }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 14 }}>
        Total Tickets
      </div>
      <div style={{ fontSize: 56, fontWeight: 900, color: '#fff', letterSpacing: '-2.5px', lineHeight: 1, fontFamily: 'Inter', marginBottom: 10 }}>
        {display}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter' }}>
        Support tickets this period
      </div>
    </div>
  )
}

function HeroBlue({ metric, value, delay }) {
  const num = parseFloat(String(value))
  const animated = useCountUp(isNaN(num) ? 0 : num, 1200, delay)
  const display = isNaN(num) ? value : animated.toFixed(1)

  return (
    <div className="card-blue lift fade-up" style={{ padding: '26px 22px 22px', animationDelay: `${delay / 1000}s`, cursor: 'default' }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 14 }}>
        {metric.replace(' (%)', '')}
      </div>
      <div style={{ fontSize: 52, fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1, fontFamily: 'Inter', marginBottom: 4 }}>
        {display}<span style={{ fontSize: 26, fontWeight: 700, opacity: 0.75 }}>%</span>
      </div>
    </div>
  )
}

function HeroOrange({ metric, value, delay }) {
  const num = parseFloat(String(value))
  const animated = useCountUp(isNaN(num) ? 0 : num, 1200, delay)
  const display = isNaN(num) ? value : animated.toFixed(1)

  return (
    <div className="card-orange lift fade-up" style={{ padding: '26px 22px 22px', animationDelay: `${delay / 1000}s`, cursor: 'default' }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 14 }}>
        {metric.replace(' (%)', '')}
      </div>
      <div style={{ fontSize: 52, fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1, fontFamily: 'Inter', marginBottom: 4 }}>
        {display}<span style={{ fontSize: 26, fontWeight: 700, opacity: 0.75 }}>%</span>
      </div>
    </div>
  )
}

function HeroAmber({ metric, value, delay }) {
  const num = parseFloat(String(value))
  const animated = useCountUp(isNaN(num) ? 0 : num, 1200, delay)
  const display = isNaN(num) ? value : animated.toFixed(1)

  return (
    <div className="lift fade-up" style={{
      padding: '26px 22px 22px', animationDelay: `${delay / 1000}s`, cursor: 'default',
      background: '#f59e0b', borderRadius: 20, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.45)', fontFamily: 'Inter', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 14 }}>
        {metric.replace(' (%)', '')}
      </div>
      <div style={{ fontSize: 52, fontWeight: 900, color: '#fff', letterSpacing: '-2px', lineHeight: 1, fontFamily: 'Inter', marginBottom: 4 }}>
        {display}<span style={{ fontSize: 26, fontWeight: 700, opacity: 0.75 }}>%</span>
      </div>
    </div>
  )
}

/* ── Row 2 stat cards ── */
function StatResolution({ value, delay }) {
  const num = parseFloat(String(value))
  const animated = useCountUp(isNaN(num) ? 0 : num, 1000, delay)
  const display = isNaN(num) ? value : animated.toFixed(2)
  const pct = Math.min(100, (num / 10) * 100)

  return (
    <div className="card lift fade-up" style={{ padding: '22px 24px', animationDelay: `${delay / 1000}s`, cursor: 'default' }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
        Avg Resolution Days
      </div>
      <div style={{ fontSize: 44, fontWeight: 900, color: '#2563eb', letterSpacing: '-1.8px', lineHeight: 1, fontFamily: 'Inter', marginBottom: 14 }}>
        {display}
        <span style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8', marginLeft: 4 }}>days</span>
      </div>
      <div style={{ height: 6, background: 'rgba(0,0,0,0.07)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#2563eb', borderRadius: 3 }} />
      </div>
    </div>
  )
}

function StatComplexity({ value, delay }) {
  const num = parseFloat(String(value))
  const animated = useCountUp(isNaN(num) ? 0 : num, 1000, delay)
  const display = isNaN(num) ? value : animated.toFixed(2)
  const pct = Math.min(100, (num / 10) * 100)
  const ring = [{ value: pct, fill: '#8b5cf6' }, { value: 100 - pct, fill: 'rgba(0,0,0,0.05)' }]

  return (
    <div className="card lift fade-up" style={{ padding: '22px 24px', animationDelay: `${delay / 1000}s`, cursor: 'default' }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
        Avg Complexity Score
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0, minWidth: 72 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="62%" outerRadius="100%" data={ring} startAngle={90} endAngle={-270} barSize={7}>
              <RadialBar dataKey="value" cornerRadius={4} isAnimationActive animationDuration={1200} animationBegin={delay} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: '#8b5cf6', fontFamily: 'Inter', letterSpacing: '-0.5px' }}>{display}</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#8b5cf6', letterSpacing: '-1.5px', lineHeight: 1, fontFamily: 'Inter' }}>{display}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter', marginTop: 3 }}>out of 10</div>
        </div>
      </div>
    </div>
  )
}

function HealthCard({ data }) {
  const breach = parseFloat(data.find(d => d.Metric?.includes('SLA'))?.Value || 50)
  const esc = parseFloat(data.find(d => d.Metric?.includes('Escalat'))?.Value || 50)
  const score = Math.max(0, Math.round(100 - breach * 0.55 - esc * 0.35))
  const color = score >= 65 ? '#10b981' : score >= 45 ? '#f59e0b' : '#ef4444'
  const label = score >= 65 ? 'Healthy' : score >= 45 ? 'Needs Attention' : 'Critical'
  const ring = [{ value: score, fill: color }, { value: 100 - score, fill: 'rgba(255,255,255,0.07)' }]

  return (
    <div className="card-dark fade-up" style={{ padding: '22px 26px', animationDelay: '0.35s', display: 'flex', alignItems: 'center', gap: 24 }}>
      <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0, minWidth: 88 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" data={ring} startAngle={90} endAngle={-270} barSize={9}>
            <RadialBar dataKey="value" cornerRadius={5} isAnimationActive animationDuration={1200} animationBegin={400} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 900, color, fontFamily: 'Inter', letterSpacing: '-0.5px', lineHeight: 1 }}>{score}</div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>Support Health</div>
        <div style={{ fontSize: 20, fontWeight: 800, color, fontFamily: 'Inter', letterSpacing: '-0.4px', lineHeight: 1, marginBottom: 5 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter' }}>Based on breach &amp; escalation</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', background: 'rgba(239,68,68,0.12)', borderRadius: 6, padding: '2px 8px', fontFamily: 'Inter' }}>SLA {breach.toFixed(1)}%</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,0.12)', borderRadius: 6, padding: '2px 8px', fontFamily: 'Inter' }}>Esc {esc.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}

/* ── Row 3 automation banner ── */
function AutoBanner({ topOpp }) {
  if (!topOpp) return null
  return (
    <div className="card-dark fade-up" style={{ animationDelay: '0.42s', padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
      {/* glow accents */}
      <div style={{ position: 'absolute', top: -60, right: 220, width: 300, height: 220, background: 'radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, right: 100, width: 200, height: 160, background: 'radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(37,99,235,0.28)', borderRadius: 20, padding: '3px 11px', marginBottom: 12 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 5px #60a5fa' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#93c5fd', letterSpacing: '0.7px', textTransform: 'uppercase', fontFamily: 'Inter' }}>Top Automation Opportunity</span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', letterSpacing: '-0.6px', fontFamily: 'Inter', marginBottom: 8, lineHeight: 1.2 }}>
          {topOpp.category}
        </div>
        <div style={{ fontSize: 13, color: '#64748b', fontFamily: 'Inter', lineHeight: 1.65, maxWidth: 520, marginBottom: 16 }}>
          {topOpp.recommended_action}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { l: 'Tickets', v: topOpp.total_tickets?.toLocaleString() },
            { l: 'SLA Breach', v: `${topOpp.sla_breach_rate?.toFixed(1)}%` },
            { l: 'Repetition', v: topOpp.repetition_score?.toFixed(1) },
          ].map(({ l, v }) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '5px 13px' }}>
              <span style={{ fontSize: 10, color: '#475569', fontFamily: 'Inter', fontWeight: 500 }}>{l} </span>
              <span style={{ fontSize: 12, color: '#e2e8f0', fontFamily: 'Inter', fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, minWidth: 130 }}>
        <div style={{ fontSize: 10, color: '#475569', fontWeight: 600, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 6 }}>Score</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: '#f59e0b', letterSpacing: '-3px', lineHeight: 1, fontFamily: 'Inter', textShadow: '0 0 40px rgba(245,158,11,0.35)' }}>
          {topOpp.automation_score?.toFixed(1)}
        </div>
        <div style={{ width: 80, height: 5, borderRadius: 3, background: 'rgba(245,158,11,0.15)', overflow: 'hidden', margin: '10px auto 0' }}>
          <div style={{ width: `${topOpp.automation_score}%`, height: '100%', background: '#f59e0b', borderRadius: 3 }} />
        </div>
      </div>
    </div>
  )
}

function InsightSmall({ title, valueLabel, valueSub, color, delay }) {
  return (
    <div className="card lift fade-up" style={{ padding: '18px 22px', animationDelay: `${delay}s` }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter', marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 26, fontWeight: 900, color, fontFamily: 'Inter', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 3 }}>{valueLabel}</div>
      <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter' }}>{valueSub}</div>
    </div>
  )
}

/* ── Row 4 category table ── */
function CategoryTable({ categories }) {
  const sorted = useMemo(() => [...categories].sort((a, b) => b.total_tickets - a.total_tickets), [categories])
  const maxT = sorted[0]?.total_tickets || 1

  return (
    <div className="card fade-up" style={{ padding: '22px 0 6px', animationDelay: '0.5s', overflow: 'hidden' }}>
      <div style={{ padding: '0 24px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0a0e1a', fontFamily: 'Inter' }}>Category Performance</div>
        <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter' }}>{sorted.length} categories</div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter', fontSize: 12.5 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            {['Category', 'Volume', 'SLA Breach', 'Escalation', 'Complexity'].map((h, i) => (
              <th key={h} style={{ padding: '7px 18px', textAlign: i === 0 ? 'left' : 'right', fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => {
            const slaColor = row.sla_breach_rate > 58 ? '#ef4444' : row.sla_breach_rate > 35 ? '#f59e0b' : '#10b981'
            const escColor = row.escalation_rate > 55 ? '#ef4444' : row.escalation_rate > 35 ? '#f59e0b' : '#10b981'
            return (
              <tr key={row.category}
                style={{ background: i % 2 ? 'rgba(0,0,0,0.02)' : 'transparent', transition: 'background 0.1s', borderBottom: '1px solid rgba(0,0,0,0.04)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 ? 'rgba(0,0,0,0.02)' : 'transparent'}
              >
                <td style={{ padding: '10px 18px', color: '#0a0e1a', fontWeight: 600 }}>{row.category}</td>
                <td style={{ padding: '10px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
                    <div style={{ width: 64, height: 4, background: 'rgba(0,0,0,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${(row.total_tickets / maxT) * 100}%`, height: '100%', background: '#2563eb', borderRadius: 2, opacity: 0.7 }} />
                    </div>
                    <span style={{ color: '#475569', minWidth: 46, textAlign: 'right' }}>{row.total_tickets?.toLocaleString()}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 18px', textAlign: 'right', fontWeight: 700, color: slaColor }}>{row.sla_breach_rate?.toFixed(1)}%</td>
                <td style={{ padding: '10px 18px', textAlign: 'right', fontWeight: 700, color: escColor }}>{row.escalation_rate?.toFixed(1)}%</td>
                <td style={{ padding: '10px 18px', textAlign: 'right', color: '#64748b' }}>{row.avg_complexity_score?.toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function Overview({ data }) {
  const { summary, automation, categories } = data

  const topOpp = useMemo(() => {
    if (!automation?.length) return null
    return [...automation].sort((a, b) => (b.automation_score ?? 0) - (a.automation_score ?? 0))[0]
  }, [automation])

  const kpi = {}
  summary.forEach(({ Metric, Value }) => { kpi[Metric] = Value })

  const worstSla = useMemo(() => {
    if (!categories?.length) return null
    return [...categories].sort((a, b) => b.sla_breach_rate - a.sla_breach_rate)[0]
  }, [categories])

  const highestVol = useMemo(() => {
    if (!categories?.length) return null
    return [...categories].sort((a, b) => b.total_tickets - a.total_tickets)[0]
  }, [categories])

  return (
    <div style={{ padding: '28px 28px 40px' }}>
      {/* Page title */}
      <div style={{ fontSize: 28, fontWeight: 800, color: '#0a0e1a', letterSpacing: '-0.8px', fontFamily: 'Inter', marginBottom: 20 }}>
        Overview
      </div>

      {/* Row 1: 4-col KPI bento — 2fr 1fr 1fr 1fr */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
        <HeroDark value={kpi['Total Tickets']} delay={0} />
        <HeroBlue metric="SLA Breach Rate (%)" value={kpi['SLA Breach Rate (%)']} delay={60} />
        <HeroOrange metric="Escalation Rate (%)" value={kpi['Escalation Rate (%)']} delay={120} />
        <HeroAmber metric="High Priority Rate (%)" value={kpi['High Priority Rate (%)']} delay={180} />
      </div>

      {/* Row 2: 3-col — resolution, complexity, health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
        <StatResolution value={kpi['Avg Resolution Days']} delay={240} />
        <StatComplexity value={kpi['Avg Complexity Score']} delay={300} />
        <HealthCard data={summary} />
      </div>

      {/* Row 3: automation banner + insight sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 14, marginBottom: 14 }}>
        <AutoBanner topOpp={topOpp} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {worstSla && (
            <InsightSmall
              title="Worst SLA Category"
              valueLabel={`${worstSla.sla_breach_rate?.toFixed(1)}%`}
              valueSub={worstSla.category}
              color="#ef4444"
              delay={0.48}
            />
          )}
          {highestVol && (
            <InsightSmall
              title="Top Volume Category"
              valueLabel={highestVol.total_tickets?.toLocaleString()}
              valueSub={highestVol.category}
              color="#2563eb"
              delay={0.52}
            />
          )}
        </div>
      </div>

      {/* Row 4: full-width category table */}
      {categories?.length > 0 && <CategoryTable categories={categories} />}
    </div>
  )
}
