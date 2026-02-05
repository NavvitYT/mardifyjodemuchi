import ResultCard from './ResultCard'
import './ResultsList.css'

export default function ResultsList({ results }) {
  return (
    <div className="results-container">
      <h2 className="results-title">
        Se encontraron {results.length} resultado{results.length !== 1 ? 's' : ''}
      </h2>
      <div className="results-grid">
        {results.map((result, index) => (
          <ResultCard key={index} result={result} />
        ))}
      </div>
    </div>
  )
}
