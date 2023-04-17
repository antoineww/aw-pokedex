import axios from "axios"
import { OPTIONS_CONFIG } from "./util"

export const createPokemonQuery = ({
  limit = 10000,
  offset = 0,
}: I_RP_Pokemon) => `pokemon?limit=${limit}&offset=${offset}`

//Get all Pokemon
export const requestPokemon: T_F_RR_Pokemon = async (params: I_RP_Pokemon) => {
  try {
    const response = await axios.get<I_RR_C_Pokemon>(
      createPokemonQuery(params),
      OPTIONS_CONFIG
    )

    return response.data
  } catch (error) {}
  return null
}
