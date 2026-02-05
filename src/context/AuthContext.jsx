import { createContext, useState, useContext, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restaurar sesión del localStorage
    const savedUser = localStorage.getItem('mardifyUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('mardifyUser')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      let data
      try {
        data = await response.json()
      } catch (e) {
        throw new Error('Respuesta inválida del servidor')
      }

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login')
      }

      setUser(data)
      localStorage.setItem('mardifyUser', JSON.stringify(data))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (email, password, confirmPassword) => {
    setLoading(true)
    try {
      const response = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      })

      let data
      try {
        data = await response.json()
      } catch (e) {
        throw new Error('Respuesta inválida del servidor')
      }

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro')
      }

      setUser(data)
      localStorage.setItem('mardifyUser', JSON.stringify(data))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mardifyUser')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
