import _ from "lodash"

// @ts-ignore
const PokeAPI = require("pokeapi-js-wrapper")
let pokeAPI: any = null

const POKE_API_CONFIG = {
  cache: true,
  timeout: 30000,
  cacheImages: true,
}

const initPokeAPI = () => {
  if (!pokeAPI) pokeAPI = new PokeAPI.Pokedex(POKE_API_CONFIG)
}

export const requestEvolutions: T_F_RR_PokeEvolution = async () => {
  try {
    initPokeAPI()
    const pokeEvolutions: I_RR_PokeEvolutions =
      await pokeAPI.getEvolutionChainsList()
    // console.log({ pokeEvolutions })
    // fetch chains
    const { results } = pokeEvolutions
    // const evolutionChains: I_PokeEvolutionChain[] = []
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

    const evolutionChains: I_PokeEvolutionChain[] = await Promise.all(
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
export const requestPokemon: T_F_RR_Pokemon = async (params: I_RP_Pokemon) => {
  try {
    initPokeAPI()
    const pokemonRefs: I_RR_C_Pokemon = await pokeAPI.getPokemonsList()
    return pokemonRefs
  } catch (error) {}
  return null
}

export const requestGenerations: T_F_RR_PokeGeneration = async () => {
  try {
    initPokeAPI()
    const generationRefs: I_RR_C_PokeGeneration =
      await pokeAPI.getGenerationsList()

    // Get each same time
    const generations: I_PokeGeneration[] = await Promise.all(
      generationRefs.results.map((genRef) =>
        pokeAPI.getGenerationByName(genRef.name)
      )
    )

    for (let index = 0; index < generations.length; index++) {
      // for (let index = 0; index < 1; index++) {
      const genData = generations[index]

      const pokemons: I_Pokemon[] = await Promise.all(
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
