import React, { useEffect, useState } from "react"
import "../css/App.css"
import { Pokemon, requestPokemon } from "../api"

interface Pokedex {
  pokemon: Pokemon[]
}

const POKEDEX_STATE_DEFAULT: Pokedex = {
  pokemon: [],
}

export const PokeList: React.FC = (params) => {
  const [pokedexState, setPokedexState] = useState(POKEDEX_STATE_DEFAULT)
  useEffect(() => {
    const setInfo = async () => {
      const pokeInfo = await requestPokemon({})
      if (!pokeInfo) return
      const {
        data: { results },
      } = pokeInfo
      setPokedexState({ ...pokedexState, pokemon: results })
    }
    setInfo()
    // eslint-disable-next-line
  }, [])

  const { pokemon } = pokedexState
  return (
    <div className="poke-list">
      {pokemon.map((pokem) => (
        <>
          <p>{pokem.name}</p>
          <a
            className="App-link"
            href={pokem.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`See ${pokem.name}'s stats`}
          </a>
        </>
      ))}
    </div>
  )
}

export default PokeList
