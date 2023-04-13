import _ from "lodash"

export const getChainForms = (evoChain: PokeEvolutionChain) => {
  const chainForms: PokemonRef[] = []
  const addForm = (chain: PokeChainLink) => {
    chainForms.push(chain.species)
    if (Array.isArray(chain.evolves_to)) {
      chain.evolves_to.forEach((form) => addForm(form))
    }
  }
  addForm(evoChain.chain)
  return chainForms
}

export const getChainBlobIndex: FT_getChainBlobIndex = (
  evoChain: PokeEvolutionChain,
  pokem: Pokemon
) => {
  const blob = JSON.stringify(evoChain.chain).toLowerCase()
  const indexByUrl = blob.indexOf(`${pokem.url}`.toLowerCase())
  let foundUrl = !!pokem.url && indexByUrl > -1
  if (foundUrl) return indexByUrl

  return blob.indexOf(`${pokem.name}`.toLowerCase())
}

export const getEvolutionChain: FT_EvolutionChain =
  (pokemons: Pokemon[], evolutionChains: PokeEvolutionChain[]) =>
  (pokem: Pokemon) => {
    let found: boolean = false
    let foundChain: PokeEvolutionChain | null = null

    // console.log({ pokem, evolutionChains })
    for (
      let evoChainIndex = 0;
      evoChainIndex < evolutionChains.length;
      evoChainIndex++
    ) {
      const evoChain = evolutionChains[evoChainIndex]
      found = getChainBlobIndex(evoChain, pokem) > -1
      // console.log({ found, evoChain })

      if (found) {
        const chainForms = getChainForms(evoChain)
        // console.log({ chainForms })
        chainForms.forEach((form, index) => {
          const foundPokem = _.find(
            pokemons,
            (pokemCurrent) =>
              pokemCurrent.name.toLowerCase() === form.name.toLowerCase()
          )
          // console.log({ foundPokem })
          if (foundPokem)
            chainForms[index] = { ...chainForms[index], ...foundPokem }
        })

        evoChain.chainForms = chainForms as Pokemon[]
        foundChain = evoChain
        // console.log({ foundChain })
        break
      }
    }
    // console.log({ found, foundChain })

    if (found) {
      return foundChain
    }
    return null
  }
