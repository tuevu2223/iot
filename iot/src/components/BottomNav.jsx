export default function BottomNav({ currentPage, onNavigate, userRole }) {
  const isAdmin = userRole === 'admin'

  return (
    <nav className="bottom-nav" aria-label="Thanh điều hướng chính">
      {isAdmin ? (
        <>
          <button
            id="nav-temperature"
            className={`nav-item ${currentPage === 'temperature' ? 'active' : ''}`}
            onClick={() => onNavigate('temperature')}
            aria-label="Màn hình nhiệt độ"
          >
            <span className="nav-icon">🌡️</span>
            <span className="nav-label">Nhiệt Độ</span>
          </button>

          <button
            id="nav-permission"
            className={`nav-item ${currentPage === 'permission' ? 'active' : ''}`}
            onClick={() => onNavigate('permission')}
            aria-label="Màn hình phân quyền"
          >
            <span className="nav-icon">🔐</span>
            <span className="nav-label">Phân Quyền</span>
          </button>
        </>
      ) : (
        <button
          id="nav-home"
          className={`nav-item ${currentPage === 'temperature' || currentPage === 'denied' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
          aria-label="Trang chủ"
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Trang Chủ</span>
        </button>
      )}
    </nav>
  )
}
