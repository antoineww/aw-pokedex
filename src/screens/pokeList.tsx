import React from "react"
import _ from "lodash"
import "../css/App.css"
import { Pokemon } from "../api"

export interface PropsPokeList {
  pokemon?: Pokemon[]
  title?: string
}

const PokemonCard: React.FC<Pokemon> = (pokem) => {
  const formattedName = _.capitalize(pokem.name)

  const { stats } = pokem

  return (
    <div key={`slot-${pokem.name}`} className="card">
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
          <div className="pokemon-card-display">
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
          </div>
          <div className="pokemon-card-stats">
            <p>Stats</p>

            <ul>
              {Array.isArray(stats) &&
                stats.map((stat) => (
                  <li>{`${_.capitalize(stat.stat.name)}: ${
                    stat.base_stat
                  }`}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <a href={`#expand-${pokem.name}`} className="card-footer-item">
          Expand
        </a>
        <a href={`#evolve-${pokem.name}`} className="card-footer-item">
          Evolve
        </a>
      </footer>
    </div>
  )
}

export const PokeList: React.FC<PropsPokeList> = ({ pokemon, title }) => {
  if (!pokemon) return null

  return (
    <>
      <h1 className="title has-text-primary-light is-1">
        {_.capitalize(title)}
      </h1>

      <div className="poke-list">
        <div className="columns is-flex-wrap-wrap mx-6">
          {pokemon.map((pokem) => (
            <div className="column is-3">
              <PokemonCard {...pokem} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default PokeList
