import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Spinner from './components/Spinner'
import Overview from './pages/Overview'
import Analytics from './pages/Analytics'
import Classification from './pages/Classification'
import Automation from './pages/Automation'
import { useData } from './hooks/useData'

export default function App() {
  const validPages = ['overview', 'analytics', 'classification', 'automation']
  const hashPage = window.location.hash.replace('#', '')
  const [activePage, setActivePage] = useState(validPages.includes(hashPage) ? hashPage : 'overview')

  const navigate = (page) => {
    setActivePage(page)
    window.location.hash = page
  }

  useEffect(() => {
    const onHash = () => {
      const p = window.location.hash.replace('#', '')
      if (validPages.includes(p)) setActivePage(p)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const { data, loading, error } = useData()

  const renderPage = () => {
    if (loading) return <Spinner />
    if (error)
      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100%', minHeight: 300, color: '#ef4444',
          fontFamily: 'Inter, sans-serif', fontSize: 14,
        }}>
          Error loading data: {error}
        </div>
      )

    switch (activePage) {
      case 'overview':      return <Overview data={data} />
      case 'analytics':     return <Analytics data={data} />
      case 'classification': return <Classification data={data} />
      case 'automation':    return <Automation data={data} />
      default:              return <Overview data={data} />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar activePage={activePage} onNavigate={navigate} />
      <main style={{ flex: 1, overflowY: 'auto', minHeight: 0, background: '#f4f5f7' }}>
        {renderPage()}
      </main>
    </div>
  )
}
