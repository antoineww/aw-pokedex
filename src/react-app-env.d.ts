/// <reference types="react-scripts" />

// DECLARATION
declare module "*.png" {
  const value: any
  export = value
}

// API

// Types & Interfaces
type typeProgress = "empty" | "load" | "complete" | "error"

interface PokedexData {
  generations: GenData[]
  evolutionChains: PokeEvolutionChain[]
  currentGenId: number
  progressGenerations: typeProgress
  progressEvolutions: typeProgress
}

interface RefData {
  name: string
  url: string
}

interface BaseStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}
interface PokeType {
  slot: number
  type: {
    name: string
    url: string
  }
}

interface PokeAbility {
  slot: number
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
}

interface Pokemon {
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

interface PokeChainLink {
  is_baby: boolean
  species: PokemonRef
  evolution_details: object[]
  evolves_to: PokeChainLink[]
}
interface PokeEvolutionChain {
  id: number
  baby_trigger_item: any
  chain: PokeChainLink
  chainForms?: PokemonRef[]
}

interface PokeEvolutionChainRef {
  url: string
}

interface PokeEvolutionsResponse {
  count: number
  next: string
  previous: string
  evolutionChains: PokeEvolutionChain[]
  results: PokeEvolutionChainRef[]
}

interface PokemonRef {
  name: string
  url: string
  [key: string]: any
}
interface PokeRefResponse {
  count: number
  next: string
  previous: string
  results: PokemonRef[]
  [key: string]: any
}

interface GenRefResponse {
  results: RefData[]
}

interface GenData {
  pokemons: Pokemon[]
  name: string
  id: number
  pokemon_species: PokemonRef[]
}

interface GenResponse {
  generations: GenData[]
}

type PokeQuery = {
  limit?: number
  offset?: number
}

type FT_PokeResponse = (params: PokeQuery) => Promise<PokeRefResponse | null>

type FTO_PokeResponse = (params?: PokeQuery) => Promise<PokeRefResponse | null>

type FT_GenResponse = () => Promise<GenResponse | null>

type FT_PokeEvolutionsResponse = () => Promise<PokeEvolutionsResponse | null>

//
//
// SCREENS

// PokeFight

type ArenaSide = "A" | "B"

interface PokeFightState {
  stop: boolean
  stage: number
}
interface StageActor {
  to: object
  from: object
  config?: object
  [key: string]: any
}

interface Stage {
  animations: {
    [key: number]: StageActor
  }
  imageIndecies?: { [key: number]: number }
  interpolations?: { [key: number]: any }
  coverScreen?: boolean
}

interface BasicAnimatedValue {
  [key: string]: any
}
interface TransformArgs {
  translate?: { x: number; y: number }
  scale?: number
  rotate?: number
}

interface getFighterProps {
  springs: AnimatedValue<Pick<object, never>>[]
  currentStage: Stage
}

//

interface Tab {
  name: string
  id: number
}

interface PropsTabs {
  tabs: Tab[]
  setCurrentTab: (tabId: number) => void
  currentId: number
}

interface PropsPokeList {
  pokemon?: Pokemon[]
  title?: string
  getPokeEvolutionChain?: (pokem: Pokemon) => PokeEvolutionChain | null
}

interface StatePokeList {
  modalOpen: boolean
  pokemonSelected: Pokemon | null
  evolutionChain: PokeEvolutionChain | null
}

type FT_EvolutionChain = (
  pokemons: Pokemon[],
  evolutionChains: PokeEvolutionChain[]
) => (pokem: Pokemon) => PokeEvolutionChain | null

interface I_PokemonCard {
  pokemon: Pokemon
  setModalOpen: Function
}

type T_ButtonClick = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => void

interface PropsPokeModal {
  modalOpen: boolean
  setModalOpen: Function
  pokemonSelected: Pokemon | null
  evolutionChain?: PokeEvolutionChain | null
}
