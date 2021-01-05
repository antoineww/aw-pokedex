// import lodash from "lodash"
import {
  FT_GenResponse,
  FT_PokeResponse,
  GenData,
  GenRefResponse,
  GenResponse,
  PokeQuery,
  PokeRefResponse,
} from "./util"

// @ts-ignore
const PokeAPI = require("pokeapi-js-wrapper")
let pokeAPI: any = null

const POKE_API_CONFIG = {
  cache: true,
  timeout: 20 * 1000, // 5s
  cacheImages: true,
}

const initPokeAPI = () => {
  if (!pokeAPI) pokeAPI = new PokeAPI.Pokedex(POKE_API_CONFIG)
}

//Get all Pokemon
export const requestPokemon: FT_PokeResponse = async (params: PokeQuery) => {
  try {
    initPokeAPI()
    const pokemonRefs: PokeRefResponse = await pokeAPI.getPokemonsList()
    // console.log(pokemonRefs)
    return pokemonRefs
  } catch (error) {}
  return null
}

export const requestGenerations: FT_GenResponse = async () => {
  try {
    initPokeAPI()
    const generationRefs: GenRefResponse = await pokeAPI.getGenerationsList()

    // Get each same time
    const generations: GenData[] = await Promise.all(
      generationRefs.results.map((genRef) =>
        pokeAPI.getGenerationByName(genRef.name)
      )
    )

    for (let index = 0; index < generations.length; index++) {
      // for (let index = 0; index < 1; index++) {
      const genData = generations[index]

      const pokemons = await Promise.all(
        // eslint-disable-next-line no-loop-func
        genData.pokemon_species.map(async (poke) => {
          try {
            const pokemonData = await pokeAPI.getPokemonByName(poke.name)
            // const pokemonData = await pokeAPI.getPokemonByName("ditto")
            return pokemonData
          } catch (error) {
            console.log(error)
          }
          return { ...poke, NO_DATA: true }
        })
      )
      generations[index].pokemons = pokemons
    }

    // console.log(generationRefs, generations)

    return {
      generations,
    }
  } catch (error) {}
  return null
}
