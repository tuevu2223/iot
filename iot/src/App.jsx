import { useState, useEffect } from 'react'
import TemperatureScreen from './screens/TemperatureScreen'
import PermissionScreen from './screens/PermissionScreen'
import AccessDeniedScreen from './screens/AccessDeniedScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import BottomNav from './components/BottomNav'
import { useAuth } from './context/AuthContext'
import './index.css'

function resolveInitialPage(user) {
  if (!user) return 'login'
  if (user.role === 'admin') return 'temperature'
  if (user.canViewData) return 'temperature'
  return 'denied'
}

export default function App() {
  const { user, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState('login')

  useEffect(() => {
    if (user) {
      if (currentPage === 'login' || currentPage === 'register') {
        setCurrentPage(resolveInitialPage(user))
      }
    } else {
      if (currentPage !== 'login' && currentPage !== 'register') {
        setCurrentPage('login')
      }
    }
  }, [user])

  function handleNavigate(destination) {
    if (destination === 'home') {
      if (user?.canViewData) {
        setCurrentPage('temperature')
      } else {
        setCurrentPage('denied')
      }
      return
    }
    setCurrentPage(destination)
  }

  function renderActiveScreen() {
    if (!user) {
      if (currentPage === 'register') {
        return <RegisterScreen onNavigateToLogin={() => setCurrentPage('login')} />
      }
      return <LoginScreen onNavigateToRegister={() => setCurrentPage('register')} />
    }

    if (currentPage === 'permission' && user.role === 'admin') {
      return <PermissionScreen />
    }

    if (currentPage === 'denied') {
      return <AccessDeniedScreen />
    }

    if (currentPage === 'temperature') {
      if (user.role === 'admin' || user.canViewData) {
        return <TemperatureScreen />
      }
      return <AccessDeniedScreen />
    }

    return <TemperatureScreen />
  }

  return (
    <div id="app-root">
      {user && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 200,
            background: 'rgba(10,14,26,0.96)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Tài khoản:
            </span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: user.role === 'admin' ? 'var(--color-accent-blue)' : 'var(--color-accent-green)',
                background: user.role === 'admin' ? 'rgba(59,130,246,0.12)' : 'rgba(16,185,129,0.12)',
                padding: '2px 10px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${user.role === 'admin' ? 'rgba(59,130,246,0.25)' : 'rgba(16,185,129,0.25)'}`,
              }}
            >
              {user.role === 'admin' ? '👑 Admin' : `👤 ${user.username}`}
            </span>
          </div>

          <div className="role-switcher">
            <button
              onClick={logout}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--color-accent-red)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}

      <div style={{ paddingTop: user ? '45px' : '0', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        {renderActiveScreen()}
      </div>

      {user && (
        <BottomNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
          userRole={user.role}
        />
      )}
    </div>
  )
}
