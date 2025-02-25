import './css/App.css'
import SearchBar from './components/SearchBar'
import Web4Content from './pages/Web4Content'
import DiscoverApps from './components/DiscoverApps'
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
    </div>
  )
}

function App() {
  return (
    <AppsProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/web4/:accountId" element={<Web4Content />} />
        <Route path="/apps/:dapp_account_id" element={<AppDetails />} />
      </Routes>
    </AppsProvider>
  )
}

export default App
