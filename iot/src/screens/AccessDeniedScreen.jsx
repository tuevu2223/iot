export default function AccessDeniedScreen() {
  return (
    <div className="screen-container">
      <div className="screen-header">
        <div className="screen-header-icon">🏠</div>
        <div>
          <div className="screen-header-title">Trang Chủ</div>
          <div className="screen-header-subtitle">Nhân viên</div>
        </div>
      </div>

      <div className="access-denied-container">
        <div className="access-denied-icon">🔒</div>

        <div className="access-denied-title">Không Có Quyền Truy Cập</div>

        <div className="access-denied-desc">
          Tài khoản của bạn chưa được cấp quyền xem dữ liệu nhiệt độ kho lạnh. Vui lòng liên hệ quản trị viên để được cấp quyền.
        </div>

        <div className="access-denied-badge">⛔ Truy cập bị từ chối</div>

        <div
          style={{
            marginTop: '12px',
            padding: '16px 20px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--color-glass-border)',
            borderRadius: 'var(--radius-lg)',
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              marginBottom: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            Liên hệ hỗ trợ
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <span>📧</span>
              <span>admin@kholanhiot.com</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
              }}
            >
              <span>📞</span>
              <span>1800 - 9999</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
