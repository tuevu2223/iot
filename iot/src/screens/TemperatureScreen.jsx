import { useRealtimeTemperature } from '../hooks/useRealtimeTemperature'

function WarehouseCard({ warehouse, index, formatTemperature, getTemperatureColorClass }) {
  const colorClass = getTemperatureColorClass(warehouse.currentTemp, warehouse.type)

  return (
    <div
      className={`temp-card ${warehouse.type}`}
      style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}
    >
      <div className="temp-card-header">
        <span className="temp-card-name">{warehouse.name}</span>
        <span className="temp-card-range">
          {warehouse.rangeMin}° / {warehouse.rangeMax}°
        </span>
      </div>

      <div style={{ marginBottom: '6px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
        {warehouse.description}
      </div>

      <div className="temp-value-wrapper">
        <span className={`temp-value ${colorClass} ${warehouse.isUpdating ? 'updating' : ''}`}>
          {formatTemperature(warehouse.currentTemp)}
        </span>
        <span className="temp-unit">°C</span>
      </div>

      <div className="temp-card-footer">
        <div className="temp-indicator-dot" />
        <div className="temp-stat">
          <span className="temp-stat-label">Min:</span>
          <span className="temp-stat-value">{warehouse.rangeMin}°</span>
        </div>
        <div className="temp-stat">
          <span className="temp-stat-label">Max:</span>
          <span className="temp-stat-value">{warehouse.rangeMax}°</span>
        </div>
      </div>
    </div>
  )
}

export default function TemperatureScreen() {
  const { warehouses, formatTemperature, getTemperatureColorClass } = useRealtimeTemperature()

  const now = new Date()
  const timeString = now.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const dateString = now.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <div className="screen-container">
      <div className="screen-header">
        <div className="screen-header-icon">🌡️</div>
        <div>
          <div className="screen-header-title">Giám Sát Nhiệt Độ</div>
          <div className="screen-header-subtitle">Hệ thống kho lạnh - Real-time</div>
        </div>
      </div>

      <div className="status-bar">
        <div className="status-bar-info">
          <div className="status-live-dot" />
          <span>Đang cập nhật trực tiếp</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          {timeString}
        </div>
      </div>

      <div className="screen-content">
        <div
          className="section-title"
          style={{ marginBottom: '16px' }}
        >
          🏭 4 Kho Lạnh
        </div>

        <div className="temp-grid">
          {warehouses.map((warehouse, index) => (
            <WarehouseCard
              key={warehouse.id}
              warehouse={warehouse}
              index={index}
              formatTemperature={formatTemperature}
              getTemperatureColorClass={getTemperatureColorClass}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: '20px',
            padding: '14px 16px',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-glass-border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              Ngày cập nhật
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              {dateString}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              Chu kỳ đọc
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--color-accent-green)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                justifyContent: 'flex-end',
              }}
            >
              <div className="status-live-dot" />
              2.5 giây / lần
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
