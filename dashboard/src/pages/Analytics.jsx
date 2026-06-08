import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LabelList, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend,
} from 'recharts'

const PALETTE = ['#2563eb','#3b82f6','#60a5fa','#7c3aed','#8b5cf6','#1d4ed8','#1e40af','#6366f1','#4f46e5','#0ea5e9']

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  return (
    <div style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, padding: '10px 14px', fontFamily: 'Inter', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', minWidth: 160 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{row?.category || payload[0]?.name}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 11.5, color: '#94a3b8', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: 2, background: p.fill || p.color, display: 'inline-block' }} />
            <span style={{ color: '#94a3b8' }}>{p.name}</span>
          </div>
          <span style={{ color: '#fff', fontWeight: 700 }}>{p.value?.toLocaleString?.() ?? p.value}</span>
        </div>
      ))}
    </div>
  )
}

function SlaChip({ val }) {
  const pct = typeof val === 'number' ? val : parseFloat(val)
  const [color, bg] = pct > 58 ? ['#ef4444','rgba(239,68,68,0.1)'] : pct > 35 ? ['#f59e0b','rgba(245,158,11,0.1)'] : ['#10b981','rgba(16,185,129,0.1)']
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', background: bg, borderRadius: 20, padding: '2px 9px', fontSize: 11, fontWeight: 700, color }}>
      {pct.toFixed(1)}%
    </span>
  )
}

function ChartCard({ title, subtitle, children, delay = 0, dark }) {
  return (
    <div className={`${dark ? 'card-dark' : 'card'} fade-up`} style={{ padding: '22px 24px', animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18, gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: dark ? '#fff' : '#0a0e1a', fontFamily: 'Inter', letterSpacing: '-0.1px' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'Inter' }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  )
}

function MiniTable({ columns, rows, dark }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, fontFamily: 'Inter' }}>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} style={{ padding: '6px 10px', textAlign: c.align || 'left', fontSize: 10, fontWeight: 600, color: '#94a3b8', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}
              style={{ background: i % 2 ? 'rgba(0,0,0,0.025)' : 'transparent', transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 ? 'rgba(0,0,0,0.025)' : 'transparent'}
            >
              {columns.map(c => (
                <td key={c.key} style={{ padding: '8px 10px', color: c.bold ? '#0a0e1a' : '#475569', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, textAlign: c.align || 'left', fontWeight: c.bold ? 600 : 400 }}>
                  {c.render ? c.render(row[c.key], row) : c.format ? c.format(row[c.key]) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Analytics({ data }) {
  const { categories, channels, products } = data
  const [active, setActive] = useState(null)

  const byVol = [...categories].sort((a, b) => b.total_tickets - a.total_tickets)
  const bySla = [...categories].sort((a, b) => b.sla_breach_rate - a.sla_breach_rate)
  const maxT = Math.max(...categories.map(c => c.total_tickets))

  const radarData = categories.map(c => ({
    category: c.category.length > 11 ? c.category.slice(0, 11) + '…' : c.category,
    Volume: Math.round((c.total_tickets / maxT) * 100),
    'SLA Breach': Math.round(c.sla_breach_rate),
    Escalation: Math.round(c.escalation_rate),
    Complexity: Math.round(c.avg_complexity_score * 10),
  }))

  const filteredVol = active ? byVol.filter(c => c.category === active) : byVol
  const filteredSla = active ? bySla.filter(c => c.category === active) : bySla
  const barH = n => n * 42 + 16

  const fmt = v => v == null ? '—' : typeof v === 'number' ? v.toFixed(2) : v

  const chCols = [
    { key: 'channel', label: 'Channel', bold: true },
    { key: 'total_tickets', label: 'Tickets', align: 'right' },
    { key: 'sla_breach_rate', label: 'SLA', align: 'right', render: v => <SlaChip val={v} /> },
    { key: 'avg_resolution_days', label: 'Avg Days', align: 'right', format: fmt },
  ]
  const prCols = [
    { key: 'product', label: 'Product', bold: true },
    { key: 'total_tickets', label: 'Tickets', align: 'right' },
    { key: 'sla_breach_rate', label: 'SLA', align: 'right', render: v => <SlaChip val={v} /> },
    { key: 'avg_resolution_days', label: 'Avg Days', align: 'right', format: fmt },
  ]

  return (
    <div style={{ padding: '28px 28px 48px' }}>
      {/* Page title */}
      <div style={{ fontSize: 28, fontWeight: 800, color: '#0a0e1a', letterSpacing: '-0.8px', fontFamily: 'Inter', marginBottom: 20 }}>
        Support Analytics
      </div>

      {/* Category filter chips */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
        <button className={`chip${!active ? ' active' : ''}`} onClick={() => setActive(null)}>All</button>
        {categories.map(c => (
          <button key={c.category} className={`chip${active === c.category ? ' active' : ''}`} onClick={() => setActive(active === c.category ? null : c.category)}>
            {c.category}
          </button>
        ))}
      </div>

      {/* Row 1: two bar charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <ChartCard title="Ticket Volume by Category" delay={0}>
          <ResponsiveContainer width="100%" height={barH(filteredVol.length)}>
            <BarChart layout="vertical" data={filteredVol} margin={{ top: 0, right: 54, left: 4, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke="rgba(0,0,0,0.04)" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="category" width={130} tick={{ fontSize: 11, fill: '#475569', fontFamily: 'Inter', fontWeight: 500 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} cursor={{ fill: 'rgba(37,99,235,0.04)' }} />
              <Bar dataKey="total_tickets" radius={[0, 8, 8, 0]} barSize={17} name="Tickets">
                {filteredVol.map((entry, i) => (
                  <Cell key={i} fill={active === entry.category ? '#2563eb' : active ? 'rgba(37,99,235,0.22)' : PALETTE[byVol.indexOf(entry) % PALETTE.length]} />
                ))}
                <LabelList dataKey="total_tickets" position="right" style={{ fontSize: 10.5, fill: '#94a3b8', fontFamily: 'Inter', fontWeight: 600 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="SLA Breach Rate by Category" delay={0.05}>
          <ResponsiveContainer width="100%" height={barH(filteredSla.length)}>
            <BarChart layout="vertical" data={filteredSla} margin={{ top: 0, right: 54, left: 4, bottom: 0 }}>
              <CartesianGrid horizontal={false} stroke="rgba(0,0,0,0.04)" />
              <XAxis type="number" tickFormatter={v => `${v.toFixed(0)}%`} tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="category" width={130} tick={{ fontSize: 11, fill: '#475569', fontFamily: 'Inter', fontWeight: 500 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} cursor={{ fill: 'rgba(245,158,11,0.04)' }} />
              <Bar dataKey="sla_breach_rate" radius={[0, 8, 8, 0]} barSize={17} name="SLA Breach %">
                {filteredSla.map((entry, i) => {
                  const v = entry.sla_breach_rate
                  const fill = v > 58 ? '#ef4444' : v > 35 ? '#f59e0b' : '#10b981'
                  return <Cell key={i} fill={active && active !== entry.category ? `${fill}35` : fill} />
                })}
                <LabelList dataKey="sla_breach_rate" position="right" formatter={v => `${v.toFixed(1)}%`} style={{ fontSize: 10.5, fill: '#94a3b8', fontFamily: 'Inter', fontWeight: 600 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: radar dark + 2 tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14 }}>
        <ChartCard title="Multi-Dimension Radar" subtitle="Normalised 0-100" delay={0.1} dark>
          <ResponsiveContainer width="100%" height={270}>
            <RadarChart data={radarData} margin={{ top: 4, right: 22, left: 22, bottom: 4 }}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'Inter' }} />
              <Radar name="Volume" dataKey="Volume" stroke="#2563eb" fill="#2563eb" fillOpacity={0.12} strokeWidth={2} dot={{ r: 2.5, fill: '#2563eb' }} />
              <Radar name="SLA Breach" dataKey="SLA Breach" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} dot={{ r: 2.5, fill: '#ef4444' }} />
              <Radar name="Escalation" dataKey="Escalation" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.08} strokeWidth={2} dot={{ r: 2.5, fill: '#f59e0b' }} />
              <Radar name="Complexity" dataKey="Complexity" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.08} strokeWidth={2} dot={{ r: 2.5, fill: '#8b5cf6' }} />
              <Tooltip content={<Tip />} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 10.5, fontFamily: 'Inter', paddingTop: 8, color: '#64748b' }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Channel Breakdown" delay={0.14}>
          <MiniTable columns={chCols} rows={channels} />
        </ChartCard>

        <ChartCard title="Product Breakdown" delay={0.17}>
          <MiniTable columns={prCols} rows={products} />
        </ChartCard>
      </div>
    </div>
  )
}
