export const POKEMON_URL = "https://pokeapi.co/api/v2/"
export const POKEMON_QUERY_EXAMPLE = "pokemon?limit=151&offset=0"
export const TIMEOUT = 30000
export const POKEMON_QUERY_PARAMS = { limit: 151, offset: 0 }
export const OPTIONS_CONFIG = {
  baseURL: POKEMON_URL,
  timeout: TIMEOUT,
}

// Types & Interfaces
type typeProgress = "empty" | "load" | "complete" | "error"
export interface PokedexData {
  generations: GenData[]
  evolutionChains: PokeEvolutionChain[]
  currentGenId: number
  progressGenerations: typeProgress
  progressEvolutions: typeProgress
}

export interface RefData {
  name: string
  url: string
}

export interface BaseStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}
export interface PokeType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokeAbility {
  slot: number
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
}

export interface Pokemon {
  url?: string
  name: string
  id: number
  order: number
  height: number
  weight: number
  base_experience: number

  is_default: boolean
  abilities: PokeAbility[]
  forms: object[]
  game_indices: object[]
  held_items: object[]
  moves: object[]
  species: object
  sprites: { front_default: string }
  stats: BaseStat[]
  types: PokeType[]
  location_area_encounters: string
}

export interface PokeEvolutionChain {
  id: number
  baby_trigger_item: any
  chain: {
    is_baby: boolean
    species: {
      name: string
      url: string
    }
    evolution_details: null
    evolves_to: [
      {
        is_baby: boolean
        species: {
          name: string
          url: string
        }
        evolution_details: object[]
        evolves_to: object[]
      }
    ]
  }
}

export interface PokeEvolutionChainRef {
  url: string
}

export interface PokeEvolutionsResponse {
  count: number
  next: string
  previous: string
  evolutionChains: PokeEvolutionChain[]
  results: PokeEvolutionChainRef[]
}

export interface PokemonRef {
  name: string
  url: string
  [key: string]: any
}
export interface PokeRefResponse {
  count: number
  next: string
  previous: string
  results: PokemonRef[]
  [key: string]: any
}

export interface GenRefResponse {
  results: RefData[]
}

export interface GenData {
  pokemons: Pokemon[]
  name: string
  id: number
  pokemon_species: PokemonRef[]
}

export interface GenResponse {
  generations: GenData[]
}

export type PokeQuery = {
  limit?: number
  offset?: number
}

export type FT_PokeResponse = (
  params: PokeQuery
) => Promise<PokeRefResponse | null>

export type FTO_PokeResponse = (
  params?: PokeQuery
) => Promise<PokeRefResponse | null>

export type FT_GenResponse = () => Promise<GenResponse | null>

export type FT_PokeEvolutionsResponse = () => Promise<PokeEvolutionsResponse | null>
