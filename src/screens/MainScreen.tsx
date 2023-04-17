import React from "react"

import Pokedex from "./Pokedex"
import ContainerCentered from "../components/layout/ContainerCentered"

const MainScreen: React.FC = () => {
  return (
    <ContainerCentered>
      <Pokedex />
    </ContainerCentered>
  )
}

export default MainScreen
