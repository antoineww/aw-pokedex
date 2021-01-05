import { FTO_PokeResponse, FT_GenResponse, PokeQuery } from "./util"
// import PokeAPIDirect from "./direct"
import * as PokeAPIWrapperLib from "./paw"
export * from "./util"

const GEN_1: PokeQuery = { limit: 151, offset: 151 }

export const requestPokemon: FTO_PokeResponse = async (params = GEN_1) => {
  // return PokeAPIDirect.requestPokemon(params)
  return await PokeAPIWrapperLib.requestPokemon(params)
}

export const requestGenerations: FT_GenResponse = async () => {
  return await PokeAPIWrapperLib.requestGenerations()
}
