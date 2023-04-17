// import PokeAPIDirect from "./direct"
import * as PokeAPIWrapperLib from "./paw"

const GEN_1: I_RP_Pokemon = { limit: 151, offset: 151 }

export const requestPokemon: T_F_OP_RR_Pokemon = async (params = GEN_1) => {
  // return PokeAPIDirect.requestPokemon(params)
  return await PokeAPIWrapperLib.requestPokemon(params)
}

export const requestGenerations: T_F_RR_PokeGeneration = async () => {
  return await PokeAPIWrapperLib.requestGenerations()
}
