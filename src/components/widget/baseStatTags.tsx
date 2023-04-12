import React from "react"
import _ from "lodash"
import { sortStatsAscending } from "../../utils"

export const baseStatTags: React.FC<{ stats: BaseStat[]; pokem: Pokemon }> = ({
  stats,
  pokem,
}) => (
  <div className="columns is-flex-wrap-wrap">
    {stats.sort(sortStatsAscending).map((stat) => (
      <div key={`${pokem.name}-${stat.stat.name}`} className="column is-6 p-1">
        <div className="tags has-addons are-medium">
          <span className="tag is-flex-grow-1 p-0">{`${_.capitalize(
            stat.stat.name
          )}`}</span>
          <span className="tag is-primary">{`${stat.base_stat}`}</span>
        </div>
      </div>
    ))}
  </div>
)

export default baseStatTags
