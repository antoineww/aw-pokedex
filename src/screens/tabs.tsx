import React, { useEffect, useState } from "react"
import "../css/App.css"

export interface Tab {
  name: string
  id: number
}

export interface PropsTabs {
  tabs: Tab[]
  setCurrentTab: (tabId: number) => void
}

const Tabs: React.FC<PropsTabs> = ({ tabs = [], setCurrentTab = () => {} }) => {
  return (
    <>
      {tabs.map((tab) => (
        <button key={`tab-${tab.id}`} onClick={() => setCurrentTab(tab.id)}>
          {tab.name}
        </button>
      ))}
    </>
  )
}

export default Tabs
