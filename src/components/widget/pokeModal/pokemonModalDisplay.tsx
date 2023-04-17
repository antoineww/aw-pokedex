import _ from "lodash"
import { useEffect, useState } from "react"
import PokeModalDisplay from "../pokeModalDisplay"
import { getOptions } from "../../../utils"

const PokemonModalDisplay: React.FC<I_P_PokemonModalDisplay> = ({
  pokemon: pokem,
  evolutionChain,
  setModalOpen,
}) => {
  const [statePokemonModalDisplay, setStatePokemonModalDisplay] = useState({
    options: {},
  })
  const { options } = statePokemonModalDisplay
  const formattedName = _.capitalize(pokem.name)

  useEffect(() => {
    setStatePokemonModalDisplay(getOptions(pokem))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokem])

  // const volvePokemon = (volve: T_Volve = "evolve") => {
  //   if (!evolutionChain?.chainForms) return
  //   const { chainForms } = evolutionChain
  //   const chainIndex = _.findIndex(chainForms, (pok) => pok.id === pokem.id)

  //   if (volve === "evolve") {
  //     if (chainIndex < chainForms.length - 1) {
  //       const nextPokemon = chainForms[chainIndex + 1]
  //       if (nextPokemon) setModalOpen(true, nextPokemon)
  //     }
  //   } else {
  //     if (chainIndex > 0) {
  //       const nextPokemon = chainForms[chainIndex - 1]
  //       if (nextPokemon) setModalOpen(true, nextPokemon)
  //     }
  //   }
  // }
  const volvePokemon = (nextPokem: I_Pokemon) => {
    if (!evolutionChain?.chainForms) return
    const { chainForms } = evolutionChain
    const chainIndex = _.findIndex(chainForms, (pok) => pok.id === pokem.id)
    const chainIndexNext = _.findIndex(
      chainForms,
      (pok) => pok.id === nextPokem.id
    )

    if (chainIndex + 1 === chainIndexNext) {
      setModalOpen(true, nextPokem)
    }
  }

  return (
    <PokeModalDisplay
      {...{
        pokemon: pokem,
        evolutionChain,
        formattedName,
        volvePokemon,
        options,
      }}
    ></PokeModalDisplay>
  )
}

export default PokemonModalDisplay
