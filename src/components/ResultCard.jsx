import { useState } from 'react'
import './ResultCard.css'

export default function ResultCard({ result }) {
  const [imageError, setImageError] = useState(false)

  // Extraer información del resultado
  const username = result.name || result.username || result.user || 'Desconocido'
  let serverName = result.server || result.serverName || 'hycraft.us'
  let serverIP = result.serverip || result.ip || result.server_ip || ''

  // Si el servidor es desconocido, usar hycraft.us
  if (serverName === 'Servidor Desconocido' || !serverName) {
    serverName = 'hycraft.us'
    serverIP = 'hycraft.us'
  }

  // Construir URL del banner
  let bannerUrl = ''
  if (serverIP && serverIP.trim()) {
    const encodedServerName = encodeURIComponent(serverName)
    bannerUrl = `http://status.mclive.eu/${encodedServerName}/${serverIP}/25565/banner.png`
  } else {
    // Usar el banner default de HyaCraft si no hay IP disponible
    bannerUrl = 'http://status.mclive.eu/HyaCraft/play.hyacraft.com/25565/banner.png'
  }

  // Formatear fecha si existe
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Desconocida'
    try {
      const date = new Date(parseInt(timestamp))
      return date.toLocaleDateString('es-ES')
    } catch {
      return 'Desconocida'
    }
  }

  return (
    <div className="result-card">
      <div className="card-banner">
        {!imageError ? (
          <img
            src={bannerUrl}
            alt={`Banner de ${serverName}`}
            className="banner-image"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="banner-fallback">
            <p>Banner no disponible</p>
          </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="username">
          <span className="username-icon">👤</span>
          {username}
        </h3>

        <div className="server-info">
          <p className="info-item">
            <span className="info-label">🖥️ Servidor:</span>
            <span className="info-value server-ip">{serverIP || serverName}</span>
          </p>
        </div>

        {result.regdate && (
          <p className="info-item">
            <span className="info-label">📅 Registro:</span>
            <span className="info-value">{formatDate(result.regdate)}</span>
          </p>
        )}

        {result.lastlogin && (
          <p className="info-item">
            <span className="info-label">⏰ Último acceso:</span>
            <span className="info-value">{formatDate(result.lastlogin)}</span>
          </p>
        )}

        {result.email && (
          <p className="info-item">
            <span className="info-label">📧 Email:</span>
            <span className="info-value">{result.email}</span>
          </p>
        )}

        {result.password && (
          <p className="info-item password-item">
            <span className="info-label">🔐 Contraseña:</span>
            <span className="info-value password-value">{result.password}</span>
          </p>
        )}
      </div>

      <div className="card-footer">
        <a
          href={`https://mc.hypixel.net/player/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
        >
          Ver perfil en Hypixel
        </a>
      </div>
    </div>
  )
}
