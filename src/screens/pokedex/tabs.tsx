import React from "react"
import _ from "lodash"
import "../../css/App.css"

export interface Tab {
  name: string
  id: number
}

export interface PropsTabs {
  tabs: Tab[]
  setCurrentTab: (tabId: number) => void
  currentId: number
}

const Tabs: React.FC<PropsTabs> = ({
  tabs = [],
  setCurrentTab = () => {},
  currentId,
}) => {
  return (
    <div className="tabs is-toggle is-centered is-fullwidth m-4">
      <ul>
        {tabs.map((tab) => (
          <li
            className={currentId === tab.id ? `is-active` : ``}
            key={`tab-${tab.id}`}
          >
            <a href={`#${tab.name}`} onClick={() => setCurrentTab(tab.id)}>
              <span>{_.capitalize(tab.name)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tabs
