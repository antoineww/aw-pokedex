import React, { useState } from "react"
import _ from "lodash"
import "../../css/App.css"
import PokemonCard from "./PokeCard"
import TiledList from "../layout/TiledList"
import PokeModal from "./PokeModal"

const DEFAULT_STATE: I_StatePokeList = {
  modalOpen: false,
  pokemonSelected: null,
  evolutionChain: null,
}

export const PokeList: React.FC<I_P_PokeList> = ({
  pokemon,
  title,
  getPokeEvolutionChain,
}) => {
  const [statePokeList, setStatePokeList] = useState(DEFAULT_STATE)

  if (!pokemon) return null
  const { modalOpen, pokemonSelected, evolutionChain } = statePokeList
  const setModalOpen: T_F_setModalOpen = (open = true, pokem = null) => {
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
    <>
      <PokeModal {...modalProps} />
      <TiledList
        title={title}
        items={pokemon}
        itemKey={"pokemon"}
        itemWidget={PokemonCard}
        moreProps={{ setModalOpen }}
      ></TiledList>
    </>
  )
}

export default PokeList
