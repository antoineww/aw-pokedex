import React from "react"

const Pane: React.FC<I_P_LayoutPane> = ({ ratio, children }) => {
  return <div style={{ flex: ratio ?? 1 }}>{children}</div>
}

export default Pane
