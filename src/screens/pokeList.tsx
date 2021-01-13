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
    <div key={`slot-${pokem.name}`} className="pokemon-card">
      <div className="pokemon-card-display">
        {!!pokem.id && <h3>{`No. ${pokem.id}`}</h3>}
        <p>{formattedName}</p>

        {!!pokem?.sprites?.front_default && (
          <img
            loading="lazy"
            src={pokem.sprites.front_default}
            alt={pokem.name}
          ></img>
        )}

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
              <li>{`${_.capitalize(stat.stat.name)}: ${stat.base_stat}`}</li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export const PokeList: React.FC<PropsPokeList> = ({ pokemon, title }) => {
  if (!pokemon) return null

  return (
    <>
      <h2>{_.capitalize(title)}</h2>

      <div className="poke-list">
        {pokemon.map((pokem) => (
          <PokemonCard {...pokem} />
        ))}
      </div>
    </>
  )
}

export default PokeList
