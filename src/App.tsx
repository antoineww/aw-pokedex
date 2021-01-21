import React from "react"
import "./App.sass"

// import Pokedex from "./screens/pokedex"
import Loading from "./screens/loading"

const App: React.FC = () => {
  return (
    <div className="App">
      <Loading />
    </div>
  )
}

export default App
