import React from "react"
import * as ReactDOMClient from "react-dom/client"
import reportWebVitals from "./reportWebVitals"

import App from "./App"

const run = () => {
  const container = document.getElementById("root")

  if (container == null) return ""

  const root = ReactDOMClient.createRoot(container)

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}

run()
