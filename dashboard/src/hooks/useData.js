import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [r1, r2, r3, r4, r5, r6, r7] = await Promise.all([
          supabase.from('dashboard_summary').select('*'),
          supabase.from('category_analysis').select('*'),
          supabase.from('channel_analysis').select('*'),
          supabase.from('product_analysis').select('*'),
          supabase.from('model_metrics').select('*'),
          supabase.from('sample_predictions').select('*'),
          supabase.from('automation_opportunities').select('*'),
        ])

        // Log per-table errors but don't fail the whole fetch
        const results = [r1, r2, r3, r4, r5, r6, r7]
        results.forEach((r, i) => {
          if (r.error) console.warn(`Table ${i} error:`, r.error)
        })

        // Require at least summary data to render
        if (r1.error) throw r1.error

        const automation = [...(r7.data || [])].sort(
          (a, b) => (b.automation_score ?? 0) - (a.automation_score ?? 0)
        )

        setData({
          summary:      r1.data || [],
          categories:   r2.data || [],
          channels:     r3.data || [],
          products:     r4.data || [],
          modelMetrics: r5.data || [],
          predictions:  r6.data || [],
          automation,
        })
      } catch (err) {
        console.error('fetchAll error:', err)
        setError(err.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  return { data, loading, error }
}
