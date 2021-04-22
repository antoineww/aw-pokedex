import React from "react"
import _ from "lodash"

export const sortAscending = (a: string, b: string) => a.length - b.length
export const sortStatsAscending = (a: BaseStat, b: BaseStat) =>
  sortAscending(a.stat.name, b.stat.name)

export const BaseStatTags: React.FC<{ stats: BaseStat[]; pokem: Pokemon }> = ({
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

export const PokemonCard: React.FC<I_PokemonCard> = ({
  pokemon: pokem,
  setModalOpen,
}) => {
  const formattedName = _.capitalize(pokem.name)
  const { stats } = pokem
  const expandInfo: T_ButtonClick = (e) => {
    e.preventDefault()
    setModalOpen(true, pokem)
  }

  return (
    <div className="tile is-parent is-3">
      <div className="tile is-child card">
        <header className="card-header">
          {!!pokem.id && (
            <p className="card-header-title">{`No. ${pokem.id}   ${formattedName}`}</p>
          )}

          {/* <button className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button> */}
        </header>
        <div className="card-image">
          {!!pokem?.sprites?.front_default && (
            <figure className="image is-256x256 mk-center-x">
              <img
                loading="lazy"
                src={pokem.sprites.front_default}
                alt={pokem.name}
              />
            </figure>
          )}
        </div>
        <div className="card-content">
          <div className="content">
            {!!pokem.url && (
              <a
                className="App-link"
                href={pokem.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`See ${pokem.name}'s stats`}
              </a>
            )}

            {Array.isArray(stats) && (
              <div className="box">
                <BaseStatTags stats={stats} pokem={pokem} />
              </div>
            )}
          </div>
        </div>
        <footer className="card-footer">
          <a
            href={`#expand-${pokem.name}`}
            className="card-footer-item"
            onClick={expandInfo}
          >
            Expand
          </a>
          <a href={`#evolve-${pokem.name}`} className="card-footer-item">
            Evolve
          </a>
        </footer>
      </div>
    </div>
  )
}

export default PokemonCard
