import React from "react"
import "./App.sass"
import "./css/App.css"

import Pokedex from "./screens/pokedex"

const App: React.FC = () => {
  return (
    <div className="App">
      <Pokedex />
    </div>
  )
}

export default App
