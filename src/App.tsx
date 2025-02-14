import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Web4Content from './components/Web4Content/Web4Content'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const navigate = useNavigate()
  const [contentUrl, setContentUrl] = useState<string | null>(null)

  const handleContentUrlFound = (url: string) => {
    setContentUrl(url)
  }

  const handleSearch = (accountId: string) => {
    navigate(`/app/${accountId}`)
  }

  return (
    <div className="app-container">
      <h1 className="title">Sleet Browser</h1>
      <SearchBar onSearch={handleSearch} onContentUrlFound={handleContentUrlFound} />
      <div className="content-frame">
        <Routes>
          <Route path="/app/:accountId" element={<Web4Content onContentUrlFound={handleContentUrlFound} />} />
          <Route path="/" element={<div>Enter a NEAR account to view content</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
