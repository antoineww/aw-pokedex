import React from "react"
import _ from "lodash"
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
    <div className="tab-bar">
      {tabs.map((tab) => (
        <button
          key={`tab-${tab.id}`}
          onClick={() => setCurrentTab(tab.id)}
          className="tab"
        >
          {_.capitalize(tab.name)}
        </button>
      ))}
    </div>
  )
}

export default Tabs
