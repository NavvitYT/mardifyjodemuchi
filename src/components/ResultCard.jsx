import './ResultCard.css'

export default function ResultCard({ result }) {
  // Extraer información del resultado
  const username = result.name || result.username || result.user || 'Desconocido'
  const password = result.password || 'No disponible'
  
  // Determinar el servidor - si no hay server ni serverip, usar "hycraft"
  let serverDisplay = 'hycraft'
  if (result.server && result.serverip) {
    serverDisplay = `${result.server} (${result.serverip})`
  } else if (result.server) {
    serverDisplay = result.server
  } else if (result.serverip) {
    serverDisplay = result.serverip
  } else if (result.ip) {
    serverDisplay = result.ip
  }

  return (
    <div className="result-card">
      <div className="card-content list-format">
        <div className="list-item">
          <span className="list-label">🖥️ Servidor:</span>
          <span className="list-value">{serverDisplay}</span>
        </div>
        
        <div className="list-item">
          <span className="list-label">👤 Usuario:</span>
          <span className="list-value">{username}</span>
        </div>
        
        <div className="list-item">
          <span className="list-label">🔐 Contraseña:</span>
          <span className="list-value password-value">{password}</span>
        </div>
      </div>
    </div>
  )
}
