import React, { useState } from "react"
import _ from "lodash"
import "../../css/App.css"
import { Pokemon } from "../../api"
import { PokemonCard } from "./pokeCard"

export interface PropsPokeList {
  pokemon?: Pokemon[]
  title?: string
}

export const PokeList: React.FC<PropsPokeList> = ({ pokemon, title }) => {
  const [statePokeList, setStatePokeList] = useState({
    pokemonSelected: null,
    modalOpen: false,
  })

  if (!pokemon) return null
  const { pokemonSelected, modalOpen } = statePokeList
  const setPokemonSelected = (pokemon = null) =>
    setStatePokeList({ ...statePokeList, pokemonSelected: pokemon })
  const setModalOpen = (open = true) =>
    setStatePokeList({ ...statePokeList, modalOpen: open })

  return (
    <div className="mx-6 ">
      <h1 className="title has-text-primary-light has-text-centered">
        {_.capitalize(title)}
      </h1>

      <div className={`modal ${modalOpen ? `is-active` : ``}`}>
        <div className="modal-background"></div>
        <div className="modal-content"></div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => setModalOpen(false)}
        ></button>
      </div>

      <div className="columns is-flex-wrap-wrap ">
        {pokemon.map((pokem, index) => (
          <PokemonCard
            key={`slot-${index}`}
            pokemon={pokem}
            setPokemonSelected={setPokemonSelected}
            setModalOpen={setModalOpen}
          />
        ))}
      </div>
    </div>
  )
}

export default PokeList
