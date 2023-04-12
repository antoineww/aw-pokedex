import React from "react"

const pane: React.FC<I_LayoutPane> = ({ ratio, children }) => {
  return <div style={{ flex: ratio ?? 1 }}>{children}</div>
}

export default pane
