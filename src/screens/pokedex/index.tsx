import React, { useEffect, useState } from "react"
import {
  GenResponse,
  PokedexData,
  PokeEvolutionsResponse,
  requestGenerations,
} from "../../api"
import "../../css/App.css"
import Loading from "../loading"
import PokeList from "./pokeList"
import Tabs from "./tabs"
import { testEvolutionChain, testGeneration } from "../../__tests__/testList"
import { requestEvolutions } from "../../api/paw"
const POKEDEX_STATE_DEFAULT: PokedexData = {
  generations: [],
  evolutionChains: [],
  currentGenId: 0,
  progressGenerations: "empty",
  progressEvolutions: "empty",
}

const getPokemonGenerations: (
  arg?: boolean
) => Promise<GenResponse | null> = async (isTest = false) => {
  if (isTest) return await testGeneration
  return await requestGenerations()
}

const getPokemonEvolutions: (
  arg?: boolean
) => Promise<PokeEvolutionsResponse | null> = async (isTest = false) => {
  if (isTest) return await testEvolutionChain
  return await requestEvolutions()
}

const DEV_MODE = true

const Pokedex: React.FC = (props) => {
  const [pokedexState, setPokedexState] = useState(POKEDEX_STATE_DEFAULT)
  const {
    generations,
    currentGenId,
    progressGenerations,
    progressEvolutions,
  } = pokedexState

  useEffect(() => {
    if (pokedexState.generations.length > 0) return

    const setInfo = async () => {
      const response = await getPokemonGenerations(DEV_MODE)
      if (!response) return
      const { generations } = response
      setPokedexState({
        ...pokedexState,
        generations,
        progressGenerations: "complete",
        progressEvolutions: "load",
      })
    }
    setInfo()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (progressEvolutions !== "load") return

    const setInfo = async () => {
      const response = await getPokemonEvolutions(DEV_MODE)
      if (!response) {
        return setPokedexState({
          ...pokedexState,
          progressEvolutions: "error",
        })
      }
      const { evolutionChains } = response
      setPokedexState({
        ...pokedexState,
        evolutionChains,
        progressEvolutions: "complete",
      })
    }

    setInfo()
    // eslint-disable-next-line
  }, [progressEvolutions])

  const generation = generations[currentGenId]

  let title
  let pokemon
  if (generation) {
    title = generation.name
    pokemon = generation.pokemons
  }

  const setCurrentTab = (tabId: number) =>
    setPokedexState({ ...pokedexState, currentGenId: tabId - 1 })

  const loading = progressGenerations === "empty"

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
