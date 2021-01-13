import React, { useEffect, useState } from "react"
import { PokedexData, requestGenerations } from "../api"
import "../css/App.css"
import Loading from "./loading"
import PokeList from "./pokeList"
import Tabs from "./tabs"

const POKEDEX_STATE_DEFAULT: PokedexData = {
  generations: [],
  currentGenId: 0,
}

const Pokedex: React.FC = (props) => {
  const [pokedexState, setPokedexState] = useState(POKEDEX_STATE_DEFAULT)

  useEffect(() => {
    const setInfo = async () => {
      const response = await requestGenerations()
      if (!response) return
      const { generations } = response
      setPokedexState({
        ...pokedexState,
        generations,
      })
    }
    if (pokedexState.generations.length < 1) setInfo()
    // eslint-disable-next-line
  }, [])

  const { generations, currentGenId } = pokedexState
  const generation = generations[currentGenId]

  let title
  let pokemon
  if (generation) {
    title = generation.name
    pokemon = generation.pokemons
  }

  const setCurrentTab = (tabId: number) =>
    setPokedexState({ ...pokedexState, currentGenId: tabId - 1 })

  const loading = pokedexState.generations.length < 1

  return loading ? (
    <Loading />
  ) : (
    <>
      <Tabs tabs={generations} setCurrentTab={setCurrentTab} />
      <PokeList pokemon={pokemon} title={title} />
    </>
  )
}

export default Pokedex
