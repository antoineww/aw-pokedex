import React from "react"

import Pokedex from "./pokedex"
import ContainerCentered from "../components/layout/containerCentered"

const MainScreen: React.FC = () => {
  return (
    <ContainerCentered>
      <Pokedex />
    </ContainerCentered>
  )
}

export default MainScreen
