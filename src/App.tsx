import './css/App.css'
import SearchBar from './components/SearchBar'
import Web4Content from './pages/Web4Content'
import DiscoverApps from './components/DiscoverApps'
import DiscoverPeople from './components/DiscoverPeople'
import AppDetails from './pages/AppDetails'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AppsProvider } from './context/AppsContext'

function HomePage() {
  const navigate = useNavigate()

  const handleSearch = (accountId: string) => {
    navigate(`/web4/${accountId}`)
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
    <AppsProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/web4/:accountId" element={<Web4Content />} />
        <Route path="/apps/:slug" element={<AppDetails />} />
      </Routes>
    </AppsProvider>
  )
}

export default App
