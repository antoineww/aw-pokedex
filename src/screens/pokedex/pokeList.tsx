import React, { useState } from "react"
import _ from "lodash"
import "../../css/App.css"
import { PokeEvolutionChain, Pokemon } from "../../api"
import PokemonCard from "./pokeCard"
import PokeModal from "./pokeModal"

export interface PropsPokeList {
  pokemon?: Pokemon[]
  title?: string
  getPokeEvolutionChain?: (pokem: Pokemon) => PokeEvolutionChain | null
}

const DEFAULT_STATE: {
  modalOpen: boolean
  pokemonSelected: Pokemon | null
  evolutionChain: PokeEvolutionChain | null
} = {
  modalOpen: false,
  pokemonSelected: null,
  evolutionChain: null,
}

export const PokeList: React.FC<PropsPokeList> = ({
  pokemon,
  title,
  getPokeEvolutionChain,
}) => {
  const [statePokeList, setStatePokeList] = useState(DEFAULT_STATE)

  if (!pokemon) return null
  const { modalOpen, pokemonSelected, evolutionChain } = statePokeList
  const setModalOpen = (open = true, pokem = null) => {
    const pokemonSelected = pokem ?? statePokeList.pokemonSelected
    // setStatePokeList({
    //   ...statePokeList,
    //   modalOpen: open,
    //   pokemonSelected,
    // })
    if (pokemonSelected) {
      let newState = {
        ...statePokeList,
        modalOpen: open,
        pokemonSelected,
      }
      if (getPokeEvolutionChain) {
        const evolutionChain = getPokeEvolutionChain(pokemonSelected)
        if (evolutionChain) {
          newState = {
            ...newState,
            evolutionChain,
          }
        }
      }
      setStatePokeList(newState)
    }
  }

  const modalProps = {
    modalOpen,
    setModalOpen,
    pokemonSelected,
    evolutionChain,
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
