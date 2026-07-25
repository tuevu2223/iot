import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../index.css';

export default function RegisterScreen({ onNavigateToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [canViewData, setCanViewData] = useState(0);
  const { register, isLoading, error } = useAuth();
  const [localError, setLocalError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMsg('');
    
    if (!username || !password || !confirmPassword) {
      setLocalError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    if (password !== confirmPassword) {
      setLocalError('Mật khẩu xác nhận không khớp');
      return;
    }

    const result = await register(username, password, role, canViewData);
    if (!result.success) {
      setLocalError(result.message);
    } else {
      setSuccessMsg(result.message || 'Đăng ký thành công!');
      // Tự động chuyển về login sau 2 giây
      setTimeout(() => {
        onNavigateToLogin();
      }, 2000);
    }
  };

  return (
    <div className="screen-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Đăng ký</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Tạo tài khoản mới</p>
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

        {successMsg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            color: 'var(--color-accent-green)',
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading || !!successMsg}
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
              disabled={isLoading || !!successMsg}
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
            <label style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading || !!successMsg}
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
            <label style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Quyền hạn (dành cho Test)</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={isLoading || !!successMsg}
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
            >
              <option value="user" style={{ background: 'var(--color-bg-primary)' }}>User thường</option>
              <option value="admin" style={{ background: 'var(--color-bg-primary)' }}>Admin</option>
            </select>
          </div>

          {role === 'user' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={canViewData === 1}
                onChange={(e) => setCanViewData(e.target.checked ? 1 : 0)}
                disabled={isLoading || !!successMsg}
                id="canViewDataCheckbox"
                style={{ width: '16px', height: '16px' }}
              />
              <label htmlFor="canViewDataCheckbox" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                Cho phép xem dữ liệu kho
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !!successMsg}
            style={{
              marginTop: '12px',
              background: 'var(--gradient-header)',
              color: 'var(--color-text-primary)',
              border: 'none',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '15px',
              fontWeight: 700,
              cursor: (isLoading || !!successMsg) ? 'not-allowed' : 'pointer',
              opacity: (isLoading || !!successMsg) ? 0.7 : 1,
              transition: 'var(--transition-normal)',
              boxShadow: 'var(--shadow-glow-blue)'
            }}
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Đã có tài khoản?{' '}
          <span
            onClick={onNavigateToLogin}
            style={{ color: 'var(--color-accent-blue)', cursor: 'pointer', fontWeight: 600 }}
          >
            Đăng nhập
          </span>
        </div>
      </div>
    </div>
  );
}
