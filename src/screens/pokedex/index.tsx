import React, { useEffect, useState } from "react"

import "../../css/App.css"
import Loading from "../loading"
import PokeList from "./pokeList"
import Tabs from "./tabs"
import { testEvolutionChain, testGeneration } from "../../__tests__/testList"
import { requestEvolutions, requestGenerations } from "../../api/paw"
import _ from "lodash"

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

const getChainForms = (evoChain: PokeEvolutionChain) => {
  const chainForms: PokemonRef[] = []
  const addForm = (chain: PokeChainLink) => {
    chainForms.push(chain.species)
    if (Array.isArray(chain.evolves_to)) {
      chain.evolves_to.forEach((form) => addForm(form))
    }
  }
  addForm(evoChain.chain)
  return chainForms
}

const getEvolutionChain: FT_EvolutionChain = (
  pokemons: Pokemon[],
  evolutionChains: PokeEvolutionChain[]
) => (pokem: Pokemon) => {
  let found: boolean = false
  let foundChain: PokeEvolutionChain | null = null

  evolutionChains.forEach((evoChain) => {
    const blob = JSON.stringify(evoChain.chain).toLowerCase()
    let foundUrl =
      !!pokem.url && blob.indexOf(`${pokem.url}`.toLowerCase()) > -1

    if (foundUrl) {
      found = foundUrl
    } else {
      found = blob.indexOf(`${pokem.name}`.toLowerCase()) > -1
    }
    if (found) {
      const chainForms = getChainForms(evoChain)
      chainForms.forEach((form, index) => {
        const foundPokem = _.find(
          pokemons,
          (pokemCurrent) =>
            pokemCurrent.name.toLowerCase() === form.name.toLowerCase()
        )
        if (foundPokem)
          chainForms[index] = { ...chainForms[index], ...foundPokem }
      })

      evoChain.chainForms = chainForms
      foundChain = evoChain
      return
    }
  })

  if (found) {
    return foundChain
  }
  return null
}

const Pokedex: React.FC = (props) => {
  const [pokedexState, setPokedexState] = useState(POKEDEX_STATE_DEFAULT)
  const {
    generations,
    evolutionChains,
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

  let title: string | undefined
  let pokemon: Pokemon[] | undefined
  if (generation) {
    title = generation.name
    pokemon = generation.pokemons
  }

  const setCurrentTab = (tabId: number) =>
    setPokedexState({ ...pokedexState, currentGenId: tabId - 1 })

  let getPokeEvolutionChain:
    | ((pokem: Pokemon) => PokeEvolutionChain | null)
    | undefined
  if (pokemon)
    getPokeEvolutionChain = getEvolutionChain(pokemon, evolutionChains)

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
      <PokeList
        pokemon={pokemon}
        title={title}
        getPokeEvolutionChain={getPokeEvolutionChain}
      />
    </>
  )
}

export default Pokedex
