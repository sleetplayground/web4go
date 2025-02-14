import './App.css'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  return (
    <div className="app-container">
      <h1 className="title">Sleet Browser</h1>
      <SearchBar />
      <div className="content-frame">
        <iframe
          title="web4-content"
          className="web4-iframe"
          src="about:blank"
        />
      </div>
    </div>
  )
}

export default App
