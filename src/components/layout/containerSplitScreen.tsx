import React from "react"
import ContainerCentered from "./ContainerCentered"
import Pane from "./Pane"

const ContainerSplitScreen: React.FC<I_P_FC_Basic> = ({ children }) => {
  const [left, right] = React.Children.toArray(children)

  return (
    <ContainerCentered>
      <Pane ratio={1}>{left}</Pane>
      <Pane ratio={1}>{right}</Pane>
    </ContainerCentered>
  )
}

export default ContainerSplitScreen
