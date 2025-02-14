import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Web4Content from './components/Web4Content/Web4Content'
import { Routes, Route, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const handleSearch = (accountId: string) => {
    navigate(`/app/${accountId}`)
  }

  return (
    <div className="app-container">
      <h1 className="title">Sleet Browser</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="content-frame">
        <Routes>
          <Route path="/app/:accountId" element={<Web4Content />} />
          <Route path="/" element={<div>Enter a NEAR account to view content</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
