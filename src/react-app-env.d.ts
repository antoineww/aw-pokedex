/// <reference types="react-scripts" />

// DECLARATION
declare module "*.png" {
  const value: any
  export default value
}

// API

/*
T_ - type
I_ - interface
P_ - Props
F_ - Function
C_ - Citation
CO_ - Collection Object
IM_ - Image
OP_ - Optional Parameters
RP_ - Request's Parameters
RR_ - Request's Response

*/

// Types & Interfaces
type T_LoadingProgress = "empty" | "load" | "complete" | "error"

interface I_P_Pokedex {
  generations: I_PokeGeneration[]
  evolutionChains: I_PokeEvolutionChain[]
  currentGenId: number
  progressGenerations: T_LoadingProgress
  progressEvolutions: T_LoadingProgress
  loadingSafeToStop: boolean
}

interface I_C_Basic {
  name: string
  url: string
}

interface I_BaseStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}
interface I_PokeType {
  slot: number
  type: {
    name: string
    url: string
  }
}

interface I_PokeAbility {
  slot: number
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
}

interface I_Pokemon {
  url?: string
  name: string
  id: number
  order: number
  height: number
  weight: number
  base_experience: number

  is_default: boolean
  abilities: I_PokeAbility[]
  forms: object[]
  game_indices: object[]
  held_items: object[]
  moves: object[]
  species: object
  sprites: { front_default: string }
  stats: I_BaseStat[]
  types: I_PokeType[]
  location_area_encounters: string
}

interface I_PokeChainLink {
  is_baby: boolean
  species: I_C_Pokemon
  evolution_details: object[]
  evolves_to: I_PokeChainLink[]
}
interface I_PokeEvolutionChain {
  id: number
  baby_trigger_item: any
  chain: I_PokeChainLink
  chainForms?: I_Pokemon[]
}

interface I_PokeEvolutionChainRef {
  url: string
}

interface I_RR_PokeEvolutions {
  count: number
  next: string
  previous: string
  evolutionChains: I_PokeEvolutionChain[]
  results: I_PokeEvolutionChainRef[]
}

interface I_C_Pokemon {
  name: string
  url: string
  [key: string]: any
}
interface I_RR_C_Pokemon {
  count: number
  next: string
  previous: string
  results: I_C_Pokemon[]
  [key: string]: any
}

interface I_RR_C_PokeGeneration {
  results: I_C_Basic[]
}

interface I_PokeGeneration {
  pokemons: I_Pokemon[]
  name: string
  id: number
  pokemon_species: I_C_Pokemon[]
}

interface I_RR_PokeGeneration {
  generations: I_PokeGeneration[]
}

type I_RP_Pokemon = {
  limit?: number
  offset?: number
}

type T_F_RR_Pokemon = (params: I_RP_Pokemon) => Promise<I_RR_C_Pokemon | null>

type T_F_OP_RR_Pokemon = (
  params?: I_RP_Pokemon
) => Promise<I_RR_C_Pokemon | null>

type T_F_RR_PokeGeneration = () => Promise<I_RR_PokeGeneration | null>

type T_F_RR_PokeEvolution = () => Promise<I_RR_PokeEvolutions | null>

//
//
// SCREENS

// PokeFight

interface I_IM_Stage {
  front: any
  back: any
}
interface I_CO_IM_Stage {
  [key: string]: I_IM_Stage
}

interface I_StageState {
  stop: boolean
  stage: number
}
interface I_StageActor {
  to: object
  from: object
  config?: object
  [key: string]: any
}

interface I_Stage {
  animations: {
    [key: number]: I_StageActor
  }
  imageIndecies?: { [key: number]: [number, number?] }
  interpolations?: { [key: number]: any }
  coverScreen?: boolean
}

interface I_StageBasicAnimatedValue {
  [key: string]: any
}
interface I_StageTransformArgs {
  translate?: { x: number; y: number }
  scale?: number
  rotate?: number
}

type T_F_StageFighters = (params: {
  springs: AnimatedValue<Pick<object, never>>[]
  currentStage: I_Stage
}) => {
  actorA: JSX.Element
  actorB: JSX.Element
}

//

interface I_Tab {
  name: string
  id: number
}

interface I_P_Tabs {
  tabs: I_Tab[]
  setCurrentTab: (tabId: number) => void
  currentId: number
}

interface I_P_PokeList {
  pokemon?: I_Pokemon[]
  title?: string
  getPokeEvolutionChain?: (pokem: I_Pokemon) => I_PokeEvolutionChain | null
}

interface I_StatePokeList {
  modalOpen: boolean
  pokemonSelected: I_Pokemon | null
  evolutionChain: I_PokeEvolutionChain | null
}

type T_Volve = "evolve" | "devolve"

type T_F_getChainBlobIndex = (
  evoChain: I_PokeEvolutionChain,
  pokem: I_Pokemon
) => number

type T_F_EvolutionChain = (
  pokemons: I_Pokemon[],
  evolutionChains: I_PokeEvolutionChain[]
) => (pokem: I_Pokemon) => I_PokeEvolutionChain | null

type T_F_setModalOpen = (open?: boolean, pokem?: I_Pokemon | null) => void

interface I_PokemonCard {
  pokemon: I_Pokemon
  setModalOpen: T_F_setModalOpen
}

type T_ButtonClick = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => void

interface I_P_PokeModal {
  modalOpen: boolean
  setModalOpen: T_F_setModalOpen
  pokemonSelected: I_Pokemon | null
  evolutionChain?: I_PokeEvolutionChain | null
}

interface I_P_PokemonModalDisplay {
  pokemon: I_Pokemon
  evolutionChain?: I_PokeEvolutionChain | null
  setModalOpen: T_F_setModalOpen
}

interface I_P_EvolutionChainDisplay {
  evolutionChain?: I_PokeEvolutionChain
  volvePokemon: Function
}

interface I_P_IM_EvolutionChainLink {
  pokem: I_Pokemon
  showChain: boolean
  volvePokemon: Function
}

//

interface I_P_FC_Basic {
  children: ReactNode
}

interface I_P_LayoutPane extends I_P_FC_Basic {
  ratio?: number
}

type T_ListedWidget = React.FC<any>
// type T_ListedWidget = React.FC<I_PokemonCard>

interface I_P_WidgetList {
  title?: string
  items: object[]
  itemKey: string
  itemWidget: T_ListedWidget
  moreProps: object
}

interface I_P_pokeModalDisplay {
  pokemon: I_Pokemon
  evolutionChain: I_PokeEvolutionChain | null | undefined
  formattedName: string
  volvePokemon
  options
}

interface I_P_WidgetLoading {
  isTest?: boolean
  canLoop?: boolean
  endLoading?: Function
}
