import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../index.css';

export default function LoginScreen({ onNavigateToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!username || !password) {
      setLocalError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const result = await login(username, password);
    if (!result.success) {
      setLocalError(result.message);
    }
  };

  return (
    <div className="screen-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Đăng nhập</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Hệ thống quản lý kho lạnh IoT</p>
        </div>

        {(error || localError) && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: 'var(--color-accent-red)',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {localError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid var(--color-glass-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                color: 'var(--color-text-primary)',
                fontSize: '15px',
                outline: 'none',
                transition: 'var(--transition-normal)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-glass-border)'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid var(--color-glass-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                color: 'var(--color-text-primary)',
                fontSize: '15px',
                outline: 'none',
                transition: 'var(--transition-normal)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-blue)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-glass-border)'}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '12px',
              background: 'var(--gradient-header)',
              color: 'var(--color-text-primary)',
              border: 'none',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '15px',
              fontWeight: 700,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'var(--transition-normal)',
              boxShadow: 'var(--shadow-glow-blue)'
            }}
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Chưa có tài khoản?{' '}
          <span
            onClick={onNavigateToRegister}
            style={{ color: 'var(--color-accent-blue)', cursor: 'pointer', fontWeight: 600 }}
          >
            Đăng ký ngay
          </span>
        </div>
      </div>
    </div>
  );
}
