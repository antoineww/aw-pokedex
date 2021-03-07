import axios from "axios"
import { OPTIONS_CONFIG } from "./util"

export const createPokemonQuery = ({ limit = 10000, offset = 0 }: PokeQuery) =>
  `pokemon?limit=${limit}&offset=${offset}`

//Get all Pokemon
export const requestPokemon: FT_PokeResponse = async (params: PokeQuery) => {
  try {
    const response = await axios.get<PokeRefResponse>(
      createPokemonQuery(params),
      OPTIONS_CONFIG
    )

    return response.data
  } catch (error) {}
  return null
}
