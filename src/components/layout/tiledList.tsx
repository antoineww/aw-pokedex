import React from "react"
import _ from "lodash"

export const tiledList: React.FC<I_P_WidgetList> = ({
  title,
  items,
  itemKey,
  itemWidget: ItemWidget,
  moreProps,
}) => {
  return (
    <div className="tile is-vertical ">
      <div className="tile is-child">
        <h1 className="title has-text-primary-light has-text-centered">
          {_.capitalize(title)}
        </h1>
      </div>

      <div className="tile is-parent is-flex-wrap-wrap">
        {items.map((item, index) => (
          <ItemWidget
            key={`slot-${index}`}
            {...{
              [itemKey]: item,
              ...moreProps,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default tiledList
