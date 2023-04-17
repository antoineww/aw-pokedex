import _ from "lodash"

export const getChainForms = (evoChain: I_PokeEvolutionChain) => {
  const chainForms: I_C_Pokemon[] = []
  const addForm = (chain: I_PokeChainLink) => {
    chainForms.push(chain.species)
    if (Array.isArray(chain.evolves_to)) {
      chain.evolves_to.forEach((form) => addForm(form))
    }
  }
  addForm(evoChain.chain)
  return chainForms
}

export const getChainBlobIndex: T_F_getChainBlobIndex = (
  evoChain: I_PokeEvolutionChain,
  pokem: I_Pokemon
) => {
  const blob = JSON.stringify(evoChain.chain).toLowerCase()
  const indexByUrl = blob.indexOf(`${pokem.url}`.toLowerCase())
  let foundUrl = !!pokem.url && indexByUrl > -1
  if (foundUrl) return indexByUrl

  return blob.indexOf(`${pokem.name}`.toLowerCase())
}

export const getEvolutionChain: T_F_EvolutionChain =
  (pokemons: I_Pokemon[], evolutionChains: I_PokeEvolutionChain[]) =>
  (pokem: I_Pokemon) => {
    let found: boolean = false
    let foundChain: I_PokeEvolutionChain | null = null

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

        evoChain.chainForms = chainForms as I_Pokemon[]
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
