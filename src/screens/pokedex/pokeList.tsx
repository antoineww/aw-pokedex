import React, { useState } from "react"
import _ from "lodash"
import "../../css/App.css"
import PokemonCard from "../../components/widget/pokeCard"
import PokeModal from "./pokeModal"

const DEFAULT_STATE: StatePokeList = {
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
  const setModalOpen: FT_setModalOpen = (open = true, pokem = null) => {
    const pokemonSelected = pokem ?? statePokeList.pokemonSelected
    // console.log({ pokemonSelected })
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
        // console.log({ evolutionChain })
        newState = {
          ...newState,
          evolutionChain,
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
    <div className="tile is-vertical ">
      <div className="tile is-child">
        <h1 className="title has-text-primary-light has-text-centered">
          {_.capitalize(title)}
        </h1>
      </div>

      <PokeModal {...modalProps} />

      <div className="tile is-parent is-flex-wrap-wrap">
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
