import axios, { AxiosResponse } from "axios"

export const POKEMON_API = "https://pokeapi.co/api/v2/"
export const POKEMON_QUERY_EXAMPLE = "pokemon?limit=151&offset=0"
export const TIMEOUT = 30000
export const POKEMON_QUERY_PARAMS = { limit: 151, offset: 0 }
export const OPTIONS_CONFIG = {
  baseURL: POKEMON_API,
  timeout: TIMEOUT,
}
// export const request = axios.create(OPTIONS_CONFIG)

// Types & Interfaces
export interface PokeResponse {
  count: number
  next: string
  previous: string
  results: object[]
  [key: string]: any
}

export type PokeQuery = {
  limit: number
  offset: number
}

export type typeRequestPokemon = (
  params: PokeQuery
) => Promise<AxiosResponse<PokeResponse> | null>

// Functions
export const createPokemonQuery = ({ limit = 151, offset = 0 }: PokeQuery) =>
  `pokemon?limit=${limit}&offset=${offset}`

export const requestPokemon: typeRequestPokemon = async (params: PokeQuery) => {
  try {
    const response = await axios.get<PokeResponse>(
      createPokemonQuery(params),
      OPTIONS_CONFIG
    )
    return response
  } catch (error) {}
  return null
}
