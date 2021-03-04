// import lodash from "lodash"
import {
  FT_GenResponse,
  FT_PokeEvolutionsResponse,
  FT_PokeResponse,
  GenData,
  GenRefResponse,
  PokeEvolutionChain,
  PokeEvolutionsResponse,
  Pokemon,
  PokeQuery,
  PokeRefResponse,
} from "./util"

import _ from "lodash"

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

export const requestEvolutions: FT_PokeEvolutionsResponse = async () => {
  try {
    initPokeAPI()
    const pokeEvolutions: PokeEvolutionsResponse = await pokeAPI.getEvolutionChainsList()
    // console.log({ pokeEvolutions })
    // fetch chains
    const { results } = pokeEvolutions
    // const evolutionChains: PokeEvolutionChain[] = []
    // for (let index = 0; index < 1; index++) {
    //   // for (let index = 0; index < results.length; index++) {
    //   const { url } = results[index]
    //   const [idPart] = url.split("evolution-chain").reverse()
    //   const id = parseInt(idPart.replace("/", ""))
    //   if (!!id) {
    //     console.log({ id })

    //     const evolutionChain = await pokeAPI.getEvolutionChainById(id)
    //     evolutionChains.push(evolutionChain)
    //   }
    // }

    const evolutionChains: PokeEvolutionChain[] = await Promise.all(
      results.map(async (result) => {
        try {
          const { url } = result
          const [idPart] = url.split("evolution-chain").reverse()
          const id = parseInt(idPart.replace("/", ""))
          if (!!id) {
            // console.log({ id })

            const evolutionChain = await pokeAPI.getEvolutionChainById(id)
            return evolutionChain
          }
        } catch (error) {
          // console.log(error)
        }
        return { ...result, NO_DATA: true }
      })
    )

    pokeEvolutions.evolutionChains = evolutionChains

    // console.log({ pokeEvolutions })

    return pokeEvolutions
  } catch (error) {}
  return null
}

//Get all Pokemon
export const requestPokemon: FT_PokeResponse = async (params: PokeQuery) => {
  try {
    initPokeAPI()
    const pokemonRefs: PokeRefResponse = await pokeAPI.getPokemonsList()
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

      const pokemons: Pokemon[] = await Promise.all(
        // eslint-disable-next-line no-loop-func
        genData.pokemon_species.map(async (poke) => {
          try {
            const pokemonData = await pokeAPI.getPokemonByName(poke.name)
            // const pokemonData = await pokeAPI.getPokemonByName("ditto")
            return pokemonData
          } catch (error) {
            // console.log(error)
          }
          return { ...poke, NO_DATA: true }
        })
      )
      generations[index].pokemons = _.sortBy(pokemons, (poke) => poke.id)
    }

    return {
      generations,
    }
  } catch (error) {}
  return null
}
