import './css/App.css'
import SearchBar from './components/SearchBar'
import Web4Content from './pages/Web4Content'
import DiscoverApps from './components/DiscoverApps'
import DiscoverPeople from './components/DiscoverPeople'
import { Routes, Route, useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  const handleSearch = (accountId: string) => {
    navigate(`/app/${accountId}`)
  }

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} />
      <DiscoverApps />
      <DiscoverPeople />
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
