import './LoadingSpinner.css'

export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Buscando en la base de datos...</p>
    </div>
  )
}
