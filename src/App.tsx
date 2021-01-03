import React from "react"
import logo from "./logo.svg"
import "./css/App.css"
import PokeList from "./screens/pokeList"

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PokeList />
      </header>
    </div>
  )
}

export default App
