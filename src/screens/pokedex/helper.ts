import { getEvolutionChain } from "../../utils"

export const POKEDEX_STATE_DEFAULT: PokedexProps = {
  generations: [],
  evolutionChains: [],
  currentGenId: 0,
  progressGenerations: "empty",
  progressEvolutions: "empty",
  loadingSafeToStop: false,
}

export const getTitleAndPokemon = (generation: any) => {
  let title: string | undefined
  let pokemon: Pokemon[] | undefined
  if (generation) {
    title = generation.name
    pokemon = generation.pokemons
  }
  return { title, pokemon }
}

export const getFn_getPokeEvolutionChain = (
  pokemon: any,
  evolutionChains: any
) => {
  let getPokeEvolutionChain:
    | ((pokem: Pokemon) => PokeEvolutionChain | null)
    | undefined
  if (pokemon)
    getPokeEvolutionChain = getEvolutionChain(pokemon, evolutionChains)

  return getPokeEvolutionChain
}

export const getCurrentLoadStates = (
  DEV_MODE_LOADING: any,
  pokedexState: any,
  setPokedexState: any,
  progressGenerations: any,
  loadingSafeToStop: any
) => {
  const initialLoading =
    progressGenerations !== "complete" && progressGenerations !== "error"
  const loading = DEV_MODE_LOADING || (initialLoading && !loadingSafeToStop)
  const endLoading =
    DEV_MODE_LOADING || initialLoading
      ? undefined
      : () => setPokedexState({ ...pokedexState, loadingSafeToStop: true })

  // console.log({ initialLoading, loadingSafeToStop, endLoading })

  return {
    loading,
    endLoading,
  }
}
