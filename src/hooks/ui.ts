import React, { useEffect, useState } from "react"
import { testEvolutionChain, testGeneration } from "../__tests__/testList"
import { requestGenerations, requestEvolutions } from "../api/paw"
import { POKEDEX_STATE_DEFAULT } from "../screens/Pokedex/helper"

export const getPokemonGenerations: (
  arg?: boolean
) => Promise<I_RR_PokeGeneration | null> = async (isTest = false) => {
  if (isTest) return await testGeneration
  return await requestGenerations()
}

export const getPokemonEvolutions: (
  arg?: boolean
) => Promise<I_RR_PokeEvolutions | null> = async (isTest = false) => {
  if (isTest) return await testEvolutionChain
  return await requestEvolutions()
}

export const usePokedexState = (DEV_MODE: boolean) => {
  const [pokedexState, setPokedexState] = useState(POKEDEX_STATE_DEFAULT)
  const { progressEvolutions } = pokedexState

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

  return { pokedexState, setPokedexState }
}
