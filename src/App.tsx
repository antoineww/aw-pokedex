import React from "react"

import Pokedex from "./screens/pokedex"
import ContainerCentered from "./components/layout/containerCentered"

const App: React.FC = () => {
  return (
    <ContainerCentered>
      <Pokedex />
    </ContainerCentered>
  )
}

export default App
