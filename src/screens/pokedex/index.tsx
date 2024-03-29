import React from "react"

import "../../css/App.css"
import PokeList from "../../components/widget/PokeList"
import Tabs from "../../components/layout/Tabs"
import { SpinAtom, Pokefight as Loading } from "../../components/widget/Loading"

import { usePokedexState } from "../../hooks/ui"
import {
  getTitleAndPokemon,
  getFn_getPokeEvolutionChain,
  getCurrentLoadStates,
} from "./helper"

const DEV_MODE = process.env.REACT_APP_DEV_MODE === "true"
const DEV_MODE_LOADING = process.env.REACT_APP_DEV_MODE_LOADING === "true"

const Pokedex: React.FC = () => {
  const { pokedexState, setPokedexState } = usePokedexState(DEV_MODE)
  const {
    generations,
    evolutionChains,
    currentGenId,
    progressGenerations,
    loadingSafeToStop,
  } = pokedexState

  const generation = generations[currentGenId]
  const { title, pokemon } = getTitleAndPokemon(generation)

  let getPokeEvolutionChain = getFn_getPokeEvolutionChain(
    pokemon,
    evolutionChains
  )

  const { loading, endLoading } = getCurrentLoadStates(
    DEV_MODE_LOADING,
    pokedexState,
    setPokedexState,
    progressGenerations,
    loadingSafeToStop
  )

  const setCurrentTab = (tabId: number) =>
    setPokedexState({ ...pokedexState, currentGenId: tabId - 1 })

  return loading ? (
    <Loading isTest={DEV_MODE_LOADING} canLoop={true} endLoading={endLoading} />
  ) : (
    <>
      <Tabs
        tabs={generations}
        setCurrentTab={setCurrentTab}
        currentId={currentGenId + 1}
      />
      <PokeList
        pokemon={pokemon}
        title={title}
        getPokeEvolutionChain={getPokeEvolutionChain}
      />
    </>
  )
}

export default Pokedex
