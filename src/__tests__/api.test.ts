import { PokeResponse } from "./../api/index"
import { createPokemonQuery, requestPokemon } from "../api"

const TEST_DATA: PokeResponse = {
  count: 1118,
  next: "https://pokeapi.co/api/v2/pokemon?offset=151&limit=151",
  previous: null,
  results: [],
}

const TEST_SAMPLE = {
  data: TEST_DATA,
  status: 200,
  statusText: "OK",
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=86400, s-maxage=86400",
  },
}
describe("checking api functions", () => {
  test("check createPokemonQuery return string - default", () => {
    expect(createPokemonQuery({})).toBe("pokemon?limit=151&offset=0")
  })

  test("check createPokemonQuery return string - limit", () => {
    expect(createPokemonQuery({ limit: 22 })).toBe("pokemon?limit=22&offset=0")
  })

  test("check createPokemonQuery return string - offset", () => {
    expect(createPokemonQuery({ offset: 7 })).toBe("pokemon?limit=151&offset=7")
  })

  test.skip("check requestPokemon return object", async () => {
    const response = await requestPokemon({})

    if (!response) {
      expect(response).not.toBe(null)
      return
    }

    const { data } = response

    expect(Object.keys(data)).toEqual(Object.keys(TEST_SAMPLE.data))
  })
})
