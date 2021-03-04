import React, { useEffect, useState } from "react"
import { GenResponse, PokedexData, requestGenerations } from "../../api"
import "../../css/App.css"
import Loading from "../loading"
import PokeList from "./pokeList"
import Tabs from "./tabs"
import { testGeneration } from "../../__tests__/testList"
import { requestEvolutions } from "../../api/paw"
const POKEDEX_STATE_DEFAULT: PokedexData = {
  generations: [],
  evolutionChains: [],
  currentGenId: 0,
  loadEvolutions: "empty",
}

const getPokemonGenerations: (
  arg?: boolean
) => Promise<GenResponse | null> = async (isTest = false) => {
  if (isTest) return await testGeneration
  return await requestGenerations()
}

const Pokedex: React.FC = (props) => {
  const [pokedexState, setPokedexState] = useState(POKEDEX_STATE_DEFAULT)
  const { generations, currentGenId, loadEvolutions } = pokedexState

  useEffect(() => {
    if (pokedexState.generations.length > 0) return

    const setInfo = async () => {
      const response = await getPokemonGenerations(true)
      if (!response) return
      const { generations } = response
      setPokedexState({
        ...pokedexState,
        generations,
        loadEvolutions: "load",
      })
    }
    setInfo()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (loadEvolutions !== "load") return

    const setInfo = async () => {
      const response = await requestEvolutions()
      if (!response) {
        return setPokedexState({
          ...pokedexState,
          loadEvolutions: "error",
        })
      }
      const { evolutionChains } = response
      setPokedexState({
        ...pokedexState,
        evolutionChains,
        loadEvolutions: "complete",
      })
    }

    setInfo()
    // eslint-disable-next-line
  }, [loadEvolutions])

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
      <Tabs
        tabs={generations}
        setCurrentTab={setCurrentTab}
        currentId={currentGenId + 1}
      />
      <PokeList pokemon={pokemon} title={title} />
    </>
  )
}

export default Pokedex
