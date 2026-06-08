import { useState } from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

function Ring({ value }) {
  const pct = value <= 1 ? value * 100 : value
  const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444'
  const ring = [{ value: pct, fill: color }, { value: 100 - pct, fill: 'rgba(255,255,255,0.05)' }]
  return (
    <div style={{ position: 'relative', width: 130, height: 130, minWidth: 130 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="66%" outerRadius="100%" data={ring} startAngle={90} endAngle={-270} barSize={10}>
          <RadialBar dataKey="value" cornerRadius={5} isAnimationActive animationDuration={1400} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 26, fontWeight: 900, color, fontFamily: 'Inter', letterSpacing: '-1px', lineHeight: 1 }}>{pct.toFixed(0)}%</div>
        <div style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>Accuracy</div>
      </div>
    </div>
  )
}

function MetricBar({ label, value, color }) {
  const pct = value <= 1 ? value * 100 : value
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 11.5, color: '#64748b', fontFamily: 'Inter', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12, color: '#e2e8f0', fontFamily: 'Inter', fontWeight: 700 }}>{value.toFixed(4)}</span>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)' }} />
      </div>
    </div>
  )
}

function CatAccuracy({ predictions }) {
  const stats = {}
  predictions.forEach(p => {
    if (!stats[p.actual_category]) stats[p.actual_category] = { c: 0, w: 0 }
    const ok = p.correct === true || p.correct === 'true' || p.correct === 1
    ok ? stats[p.actual_category].c++ : stats[p.actual_category].w++
  })
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: 'Inter', marginBottom: 12 }}>Per-Category Accuracy</div>
      {Object.entries(stats).map(([cat, s]) => {
        const total = s.c + s.w
        const pct = total ? (s.c / total) * 100 : 0
        const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444'
        return (
          <div key={cat} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 150 }}>{cat}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: 'Inter' }}>{pct.toFixed(0)}%</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 2 }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Classification({ data }) {
  const { modelMetrics, predictions } = data
  const model = modelMetrics?.[0]
  const [filter, setFilter] = useState('all')
  const isOk = r => r.correct === true || r.correct === 'true' || r.correct === 1
  const filtered = filter === 'all' ? predictions : predictions.filter(r => filter === 'correct' ? isOk(r) : !isOk(r))
  const correct = predictions.filter(isOk).length
  const wrong = predictions.length - correct
  const trunc = (s, n = 56) => s && s.length > n ? s.slice(0, n) + '…' : s

  return (
    <div style={{ padding: '28px 28px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Page title */}
      <div style={{ fontSize: 28, fontWeight: 800, color: '#0a0e1a', letterSpacing: '-0.8px', fontFamily: 'Inter', marginBottom: 6 }}>
        AI Classification
      </div>

      {/* Row 1: model dark card + predictions */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 14 }}>

        {/* Model metrics dark card */}
        {model && (
          <div className="card-dark fade-up" style={{ padding: '26px 24px' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.7px', fontFamily: 'Inter', marginBottom: 4 }}>{model.task}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: 'Inter', lineHeight: 1.2 }}>{model.model_name}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
              <Ring value={model.accuracy} />
            </div>

            <div style={{ marginBottom: 22 }}>
              <MetricBar label="Precision (Macro)" value={model.precision_macro} color="#2563eb" />
              <MetricBar label="Recall (Macro)" value={model.recall_macro} color="#8b5cf6" />
              <MetricBar label="F1 Score (Macro)" value={model.f1_macro} color="#10b981" />
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 18 }}>
              <CatAccuracy predictions={predictions} />
            </div>
          </div>
        )}

        {/* Predictions table */}
        <div className="card fade-up" style={{ padding: '22px 24px', animationDelay: '0.07s', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0a0e1a', fontFamily: 'Inter' }}>Sample Predictions</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: 20, padding: '3px 11px' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', fontFamily: 'Inter' }}>{correct} correct</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 20, padding: '3px 11px' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'Inter' }}>{wrong} wrong</span>
              </div>
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {[['all','All'],['correct','Correct'],['wrong','Incorrect']].map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)}
                style={{ padding: '5px 14px', borderRadius: 10, fontSize: 11.5, fontWeight: 600, fontFamily: 'Inter', border: `1.5px solid ${filter === v ? '#2563eb' : 'rgba(0,0,0,0.09)'}`, background: filter === v ? 'rgba(37,99,235,0.08)' : 'transparent', color: filter === v ? '#2563eb' : '#64748b', cursor: 'pointer', transition: 'all 0.15s' }}>
                {l}
              </button>
            ))}
          </div>

          <div style={{ overflowY: 'auto', flex: 1, maxHeight: 480 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: 'Inter' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)', zIndex: 1 }}>
                <tr>
                  {['Issue Description','Actual','Predicted',''].map(c => (
                    <th key={c} style={{ padding: '7px 10px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: '#94a3b8', borderBottom: '1px solid rgba(0,0,0,0.07)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 20).map((row, i) => {
                  const ok = isOk(row)
                  return (
                    <tr key={i} style={{ background: i % 2 ? 'rgba(0,0,0,0.018)' : 'transparent', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 ? 'rgba(0,0,0,0.018)' : 'transparent'}
                    >
                      <td style={{ padding: '8px 10px', color: '#475569', borderBottom: '1px solid rgba(0,0,0,0.04)', maxWidth: 280 }} title={row.issue_description}>{trunc(row.issue_description)}</td>
                      <td style={{ padding: '8px 10px', color: '#0a0e1a', borderBottom: '1px solid rgba(0,0,0,0.04)', fontWeight: 500, whiteSpace: 'nowrap', fontSize: 11.5 }}>{row.actual_category}</td>
                      <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.04)', whiteSpace: 'nowrap', fontSize: 11.5 }}>
                        <span style={{ color: ok ? '#0a0e1a' : '#ef4444', fontWeight: ok ? 500 : 600, textDecoration: ok ? 'none' : 'line-through', textDecorationColor: '#ef444470' }}>{row.predicted_category}</span>
                      </td>
                      <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(0,0,0,0.04)', textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: ok ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', fontSize: 10, fontWeight: 800, color: ok ? '#10b981' : '#ef4444' }}>
                          {ok ? '+' : 'x'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Note */}
      {model?.note && (
        <div className="card fade-up" style={{ animationDelay: '0.14s', padding: '16px 22px', background: 'rgba(241,245,249,0.9)' }}>
          <p style={{ margin: 0, fontSize: 12.5, color: '#64748b', fontFamily: 'Inter', fontStyle: 'italic', lineHeight: 1.7 }}>{model.note}</p>
        </div>
      )}
    </div>
  )
}
