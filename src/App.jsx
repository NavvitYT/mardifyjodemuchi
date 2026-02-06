import { useState } from 'react'
import './App.css'
import { useAuth } from './context/AuthContext'
import { API_ENDPOINTS } from './config/api'
import AuthPage from './components/AuthPage'
import SearchBar from './components/SearchBar'
import ResultsList from './components/ResultsList'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { user, logout } = useAuth()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearch = async (username) => {
    if (!username.trim()) {
      setError('Por favor ingresa un nombre de usuario')
      return
    }

    setLoading(true)
    setError('')
    setResults([])

    try {
      const response = await fetch(API_ENDPOINTS.search(username))
      
      if (!response.ok) {
        throw new Error('Usuario no encontrado')
      }

      const data = await response.json()
      
      // Procesar los resultados - manejar tanto array directo como objeto con results
      let resultsArray = []
      if (Array.isArray(data)) {
        resultsArray = data
      } else if (data.results && Array.isArray(data.results)) {
        resultsArray = data.results
      } else {
        throw new Error('Formato de respuesta inválido')
      }

      const processedResults = resultsArray.map((result) => {
        // Si el resultado tiene una propiedad 'data', procesarla
        if (result.data) {
          try {
            const parsedData = typeof result.data === 'string' 
              ? JSON.parse(result.data) 
              : result.data
            return parsedData
          } catch (e) {
            return result
          }
        }
        // Si no tiene 'data', devolver el resultado directamente
        return result
      })
      setResults(processedResults)
      setSearched(true)
    } catch (err) {
      setError(err.message || 'Error al buscar el usuario')
      setResults([])
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      {!user ? (
        <AuthPage />
      ) : (
        <>
          <header className="header">
            <div className="header-content">
              <div className="header-top">
                <h1 className="title">🔍 MARDIFY</h1>
                <button className="logout-button" onClick={logout}>
                  Cerrar Sesión
                </button>
              </div>
              <p className="subtitle">Buscador de Cuentas en Servidores Minecraft</p>
              <p className="user-info">📧 {user.email}</p>
            </div>
          </header>

          <main className="main-content">
            <SearchBar onSearch={handleSearch} disabled={loading} />

            {loading && <LoadingSpinner />}

            {error && <div className="error-message">{error}</div>}

            {searched && !loading && !error && results.length === 0 && (
              <div className="no-results">Sin resultados para esta búsqueda</div>
            )}

            {results.length > 0 && <ResultsList results={results} />}
          </main>

          <footer className="footer">
            <p>Mardify © 2026 - Buscador de Cuentas Minecraft</p>
          </footer>
        </>
      )}
    </div>
  )
}

export default App
