import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import { useState } from 'react'

function App() {
  const [contentUrl, setContentUrl] = useState('about:blank')

  const handleContentUrlFound = (url: string) => {
    setContentUrl(url)
  }

  return (
    <div className="app-container">
      <h1 className="title">Sleet Browser</h1>
      <SearchBar onContentUrlFound={handleContentUrlFound} />
      <div className="content-frame">
        <iframe
          title="web4-content"
          className="web4-iframe"
          src={contentUrl}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  )
}

export default App
