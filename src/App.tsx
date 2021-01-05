import React from "react"
import logo from "./logo.svg"
import "./css/App.css"
import Pokedex from "./screens/pokedex"

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Pokedex />
      </header>
    </div>
  )
}

export default App
