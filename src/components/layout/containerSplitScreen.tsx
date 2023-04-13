import React from "react"
import Pane from "./pane"
import ContainerCentered from "./containerCentered"

const containerSplitScreen: React.FC<I_P_BasicFC> = ({ children }) => {
  const [left, right] = React.Children.toArray(children)

  return (
    <ContainerCentered>
      <Pane ratio={1}>{left}</Pane>
      <Pane ratio={1}>{right}</Pane>
    </ContainerCentered>
  )
}

export default containerSplitScreen
