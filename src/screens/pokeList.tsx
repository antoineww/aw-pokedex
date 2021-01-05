import React from "react"
import "../css/App.css"
import { Pokemon } from "../api"

export interface PropsPokeList {
  pokemon?: Pokemon[]
}

export const PokeList: React.FC<PropsPokeList> = ({ pokemon }) => {
  if (!pokemon) return null

  return (
    <div className="poke-list">
      {pokemon.map((pokem) => (
        <div key={`slot-${pokem.name}`}>
          <p>{pokem.name}</p>

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
      ))}
    </div>
  )
}

export default PokeList