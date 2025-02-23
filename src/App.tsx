import './css/App.css'
import SearchBar from './components/SearchBar'
import Web4Content from './pages/Web4Content'
import { Routes, Route, useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  const handleSearch = (accountId: string) => {
    navigate(`/app/${accountId}`)
  }

  return (
    <div className="app-container">
      <h1 className="title">Sleet Browser</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="home-message">Enter a NEAR account to view content</div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app/:accountId" element={<Web4Content />} />
    </Routes>
  )
}

export default App
