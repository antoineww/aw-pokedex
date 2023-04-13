import React, { useEffect, useState } from "react"

import "../../css/App.css"
import Loading from "../loading"
import PokeList from "./pokeList"
import Tabs from "../../components/layout/tabs"
import { testEvolutionChain, testGeneration } from "../../__tests__/testList"
import { requestEvolutions, requestGenerations } from "../../api/paw"
import _ from "lodash"

const POKEDEX_STATE_DEFAULT: PokedexProps = {
  generations: [],
  evolutionChains: [],
  currentGenId: 0,
  progressGenerations: "empty",
  progressEvolutions: "empty",
  loadingSafeToStop: false,
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

const DEV_MODE = process.env.REACT_APP_DEV_MODE === "true"
const DEV_MODE_LOADING = process.env.REACT_APP_DEV_MODE_LOADING === "true"

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

export const getChainBlobIndex: FT_getChainBlobIndex = (
  evoChain: PokeEvolutionChain,
  pokem: Pokemon
) => {
  const blob = JSON.stringify(evoChain.chain).toLowerCase()
  const indexByUrl = blob.indexOf(`${pokem.url}`.toLowerCase())
  let foundUrl = !!pokem.url && indexByUrl > -1
  if (foundUrl) return indexByUrl

  return blob.indexOf(`${pokem.name}`.toLowerCase())
}

const getEvolutionChain: FT_EvolutionChain =
  (pokemons: Pokemon[], evolutionChains: PokeEvolutionChain[]) =>
  (pokem: Pokemon) => {
    let found: boolean = false
    let foundChain: PokeEvolutionChain | null = null

    // console.log({ pokem, evolutionChains })
    for (
      let evoChainIndex = 0;
      evoChainIndex < evolutionChains.length;
      evoChainIndex++
    ) {
      const evoChain = evolutionChains[evoChainIndex]
      found = getChainBlobIndex(evoChain, pokem) > -1
      // console.log({ found, evoChain })

      if (found) {
        const chainForms = getChainForms(evoChain)
        // console.log({ chainForms })
        chainForms.forEach((form, index) => {
          const foundPokem = _.find(
            pokemons,
            (pokemCurrent) =>
              pokemCurrent.name.toLowerCase() === form.name.toLowerCase()
          )
          // console.log({ foundPokem })
          if (foundPokem)
            chainForms[index] = { ...chainForms[index], ...foundPokem }
        })

        evoChain.chainForms = chainForms as Pokemon[]
        foundChain = evoChain
        // console.log({ foundChain })
        break
      }
    }
    // console.log({ found, foundChain })

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
    loadingSafeToStop,
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
    if (DEV_MODE) setTimeout(() => setInfo(), 5000)
    else setInfo()

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

  const initialLoading =
    progressGenerations !== "complete" && progressGenerations !== "error"
  const loading = DEV_MODE_LOADING || (initialLoading && !loadingSafeToStop)
  const endLoading =
    DEV_MODE_LOADING || initialLoading
      ? undefined
      : () => setPokedexState({ ...pokedexState, loadingSafeToStop: true })

  // console.log({ initialLoading, loadingSafeToStop, endLoading })

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
