import React, { useState, useEffect } from 'react'
import api from '../utils/api'

const AVATAR_COLORS = [
  'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  'linear-gradient(135deg, #06b6d4, #10b981)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
  'linear-gradient(135deg, #10b981, #3b82f6)',
  'linear-gradient(135deg, #ef4444, #f59e0b)',
]

function EmployeeRow({ employee, colorIndex, onToggleAccess }) {
  const hasAccess = Boolean(employee.canViewData);
  const avatarText = employee.username ? employee.username.charAt(0).toUpperCase() : 'U';

  return (
    <div className="employee-card">
      <div
        className="employee-avatar"
        style={{ background: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length] }}
      >
        {avatarText}
      </div>

      <div className="employee-info">
        <div className="employee-name">{employee.username}</div>
        <div className="employee-role">{employee.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</div>
      </div>

      <span className={`employee-badge ${hasAccess ? 'badge-granted' : 'badge-denied'}`}>
        {hasAccess ? '✓ Có quyền' : '✗ Từ chối'}
      </span>

      <label className="toggle-switch" aria-label={`Quyền truy cập ${employee.username}`}>
        <input
          type="checkbox"
          checked={hasAccess}
          onChange={() => onToggleAccess(employee.id, !hasAccess)}
          disabled={employee.role === 'admin'}
        />
        <span className="toggle-track" />
      </label>
    </div>
  )
}

export default function PermissionScreen() {
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/admin/users');
      setEmployees(response.data);
    } catch (err) {
      setError('Lỗi khi tải danh sách người dùng.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAccess = async (userId, newStatus) => {
    try {
      const canViewData = newStatus ? 1 : 0;
      await api.post('/admin/toggle-permission', { userId, canViewData });
      
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === userId
            ? { ...employee, canViewData }
            : employee
        )
      );
    } catch (err) {
      alert('Có lỗi xảy ra khi cập nhật quyền!');
    }
  };

  const grantedCount = employees.filter((e) => Boolean(e.canViewData)).length
  const deniedCount = employees.length - grantedCount

  return (
    <div className="screen-container">
      <div className="screen-header">
        <div className="screen-header-icon">🔐</div>
        <div>
          <div className="screen-header-title">Phân Quyền Truy Cập</div>
          <div className="screen-header-subtitle">Quản lý quyền xem nhiệt độ kho</div>
        </div>
      </div>

      <div className="screen-content">
        {error && (
          <div style={{ color: 'var(--color-accent-red)', marginBottom: '10px' }}>
            {error}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '24px' }}>✅</span>
            <div>
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: 'var(--color-accent-green)',
                  lineHeight: 1,
                }}
              >
                {grantedCount}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Có quyền truy cập
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '24px' }}>❌</span>
            <div>
              <div
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#f87171',
                  lineHeight: 1,
                }}
              >
                {deniedCount}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                Chưa cấp quyền
              </div>
            </div>
          </div>
        </div>

        <div className="section-title">
          👥 Danh Sách Người Dùng
        </div>

        <div className="employee-list">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-secondary)' }}>
              Đang tải danh sách...
            </div>
          ) : (
            employees.map((employee, index) => (
              <EmployeeRow
                key={employee.id}
                employee={employee}
                colorIndex={index}
                onToggleAccess={handleToggleAccess}
              />
            ))
          )}
        </div>

        <div
          style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'rgba(59, 130, 246, 0.06)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            borderRadius: 'var(--radius-lg)',
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          💡 Bật/tắt toggle để cấp hoặc thu hồi quyền xem nhiệt độ kho của nhân viên. Quản trị viên luôn có quyền xem dữ liệu.
        </div>
      </div>
    </div>
  )
}
