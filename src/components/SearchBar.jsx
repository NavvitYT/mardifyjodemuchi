import { useState } from 'react'
import './SearchBar.css'

export default function SearchBar({ onSearch, disabled }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(input)
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(input)
    }
  }

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Escribe el nombre de usuario de Minecraft..."
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          autoFocus
        />
        <button
          type="submit"
          className="search-button"
          disabled={disabled}
        >
          {disabled ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
    </div>
  )
}
