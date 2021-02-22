import React, { useState } from "react"
import _ from "lodash"
import "../../css/App.css"
import { Pokemon } from "../../api"
import PokemonCard from "./pokeCard"
import PokeModal from "./pokeModal"

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
  const setModalOpen = (open = true, pokem = null) =>
    setStatePokeList({
      ...statePokeList,
      modalOpen: open,
      pokemonSelected: pokem ?? statePokeList.pokemonSelected,
    })

  const modalProps = {
    modalOpen,
    setModalOpen,
    pokemonSelected,
  }

  return (
    <div className="mx-6 ">
      <h1 className="title has-text-primary-light has-text-centered">
        {_.capitalize(title)}
      </h1>

      <PokeModal {...modalProps} />

      <div className="columns is-flex-wrap-wrap ">
        {pokemon.map((pokem, index) => (
          <PokemonCard
            key={`slot-${index}`}
            pokemon={pokem}
            setModalOpen={setModalOpen}
          />
        ))}
      </div>
    </div>
  )
}

export default PokeList
