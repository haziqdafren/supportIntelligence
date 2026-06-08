import React, { useState, useMemo } from 'react'

function ScoreBar({ value }) {
  const pct = Math.min(100, Math.max(0, value))
  const color = pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 800, color: '#0a0e1a', fontFamily: 'Inter', minWidth: 34, letterSpacing: '-0.5px' }}>
        {value.toFixed(1)}
      </span>
      <div style={{ flex: 1, height: 6, background: 'rgba(0,0,0,0.07)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.6s cubic-bezier(0.34,1.56,0.64,1)', boxShadow: `0 0 8px ${color}60` }} />
      </div>
    </div>
  )
}

function ExpandPanel({ row }) {
  const fmtPct = v => v == null ? '—' : `${v.toFixed(1)}%`
  const dims = [
    { label: 'Repetition Score', value: row.repetition_score, max: 100, color: '#2563eb' },
    { label: 'Avg Complexity', value: row.avg_complexity_score != null ? row.avg_complexity_score * 10 : null, max: 100, color: '#8b5cf6' },
    { label: 'Escalation Rate', value: row.escalation_rate, max: 100, color: '#f59e0b' },
    { label: 'SLA Breach Rate', value: row.sla_breach_rate, max: 100, color: '#ef4444' },
  ]
  return (
    <tr>
      <td colSpan={5} style={{ padding: 0 }}>
        <div style={{
          background: 'rgba(37,99,235,0.025)',
          borderBottom: '1px solid rgba(37,99,235,0.08)',
          padding: '18px 20px 20px 56px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 40px',
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter', marginBottom: 12 }}>Score Breakdown</div>
            {dims.map(d => (
              <div key={d.label} style={{ marginBottom: 9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'Inter' }}>{d.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: d.color, fontFamily: 'Inter' }}>{d.value == null ? '—' : d.value.toFixed(1)}{d.label.includes('Rate') ? '%' : ''}</span>
                </div>
                <div style={{ height: 4, background: 'rgba(0,0,0,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${d.value == null ? 0 : Math.min(100, (d.value / (d.max || 100)) * 100)}%`, height: '100%', background: d.color, borderRadius: 2, opacity: 0.75 }} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter', marginBottom: 12 }}>Business Impact</div>
            <div style={{ fontSize: 12.5, color: '#475569', fontFamily: 'Inter', lineHeight: 1.65, marginBottom: 14 }}>{row.business_reason}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.14)', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontFamily: 'Inter' }}>
                <span style={{ color: '#64748b' }}>Tickets: </span><span style={{ fontWeight: 700, color: '#2563eb' }}>{row.total_tickets?.toLocaleString()}</span>
              </div>
              <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.14)', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontFamily: 'Inter' }}>
                <span style={{ color: '#64748b' }}>SLA: </span><span style={{ fontWeight: 700, color: '#ef4444' }}>{fmtPct(row.sla_breach_rate)}</span>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default function Automation({ data }) {
  const sorted = useMemo(() =>
    [...(data.automation || [])].sort((a, b) => (b.automation_score ?? 0) - (a.automation_score ?? 0)),
    [data.automation]
  )
  const [expanded, setExpanded] = useState(null)

  const high = sorted.filter(r => r.automation_score >= 70).length
  const mid  = sorted.filter(r => r.automation_score >= 40 && r.automation_score < 70).length
  const low  = sorted.filter(r => r.automation_score < 40).length

  const summaryCards = [
    { label: 'Total Categories', val: sorted.length, cardClass: 'card-dark', textColor: '#fff', subColor: 'rgba(255,255,255,0.4)' },
    { label: 'High Potential (>=70)', val: high, cardClass: 'card-green', textColor: '#fff', subColor: 'rgba(255,255,255,0.55)' },
    { label: 'Medium (40-69)', val: mid, cardClass: 'card-orange', textColor: '#fff', subColor: 'rgba(255,255,255,0.55)' },
    { label: 'Low (<40)', val: low, cardClass: 'card-red', textColor: '#fff', subColor: 'rgba(255,255,255,0.55)' },
  ]

  return (
    <div style={{ padding: '28px 28px 48px' }}>
      {/* Page title */}
      <div style={{ fontSize: 28, fontWeight: 800, color: '#0a0e1a', letterSpacing: '-0.8px', fontFamily: 'Inter', marginBottom: 20 }}>
        Automation
      </div>

      {/* Row 1: 4 summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 14 }}>
        {summaryCards.map(({ label, val, cardClass, textColor, subColor }) => (
          <div key={label} className={`${cardClass} lift fade-up`} style={{ padding: '22px 24px', cursor: 'default' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: subColor, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>{label}</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: textColor, letterSpacing: '-2px', lineHeight: 1, fontFamily: 'Inter' }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Row 2: ranked table */}
      <div className="card fade-up" style={{ overflow: 'hidden', animationDelay: '0.1s' }}>
        <div style={{ padding: '16px 24px 14px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0a0e1a', fontFamily: 'Inter' }}>Ranked Opportunities</div>
          <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'Inter' }}>Click any row to expand details</div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'Inter' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              {['#', 'Category', 'Automation Score', 'Recommended Action', ''].map((col, i) => (
                <th key={i} style={{ padding: '10px 18px', textAlign: i === 0 ? 'center' : 'left', fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => {
              const isFirst = i === 0
              const isExp = expanded === row.category
              const baseBg = isFirst ? 'rgba(253,246,178,0.35)' : i % 2 ? 'rgba(0,0,0,0.02)' : 'transparent'
              return (
                <React.Fragment key={row.category}>
                  <tr
                    onClick={() => setExpanded(isExp ? null : row.category)}
                    style={{ background: isExp ? 'rgba(37,99,235,0.04)' : baseBg, cursor: 'pointer', transition: 'background 0.12s', borderBottom: isExp ? 'none' : '1px solid rgba(0,0,0,0.04)' }}
                    onMouseEnter={e => { if (!isExp) e.currentTarget.style.background = 'rgba(37,99,235,0.04)' }}
                    onMouseLeave={e => { if (!isExp) e.currentTarget.style.background = baseBg }}
                  >
                    <td style={{ padding: '13px 18px', textAlign: 'center', fontWeight: 800, color: isFirst ? '#d97706' : '#d1d5db', fontSize: isFirst ? 16 : 13 }}>{i + 1}</td>
                    <td style={{ padding: '13px 18px' }}>
                      <div style={{ fontWeight: 700, color: '#0a0e1a', marginBottom: 2, fontSize: 13 }}>{row.category}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{row.total_tickets?.toLocaleString()} tickets</div>
                    </td>
                    <td style={{ padding: '13px 18px', minWidth: 220 }}>
                      <ScoreBar value={row.automation_score} />
                    </td>
                    <td style={{ padding: '13px 18px', color: '#475569', maxWidth: 320, lineHeight: 1.55, fontSize: 12.5 }}>
                      {row.recommended_action}
                    </td>
                    <td style={{ padding: '13px 18px', textAlign: 'center' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: isExp ? 'rgba(37,99,235,0.12)' : 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: isExp ? '#2563eb' : '#94a3b8', transition: 'all 0.2s', transform: isExp ? 'rotate(180deg)' : 'none', margin: '0 auto' }}>
                        v
                      </div>
                    </td>
                  </tr>
                  {isExp && <ExpandPanel row={row} />}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
