import Highcharts from "highcharts"
import HighchartsMore from "highcharts/highcharts-more"
import HighchartsReact from "highcharts-react-official"
import "highcharts/css/themes/dark-unica.css"
// import "highcharts/css/themes/grid-light.css"
// import "highcharts/css/themes/sand-signika.css"
import _ from "lodash"
import { BaseStatTags } from "../pokeCard"
import { useEffect, useState } from "react"
import { getOptions } from "./util"
import EvolutionChainDisplay from "./evolutionChainDisplay"

HighchartsMore(Highcharts)

const PokemonModalDisplay: React.FC<PropsPokemonModalDisplay> = ({
  pokemon: pokem,
  evolutionChain,
  setModalOpen,
}) => {
  const [statePokemonModalDisplay, setStatePokemonModalDisplay] = useState({
    options: {},
  })
  const { options } = statePokemonModalDisplay
  const formattedName = _.capitalize(pokem.name)
  const { stats, types, abilities, weight, height } = pokem

  useEffect(() => {
    setStatePokemonModalDisplay(getOptions(pokem))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokem])

  const volvePokemon = (volve: volveType = "evolve") => {
    if (!evolutionChain?.chainForms) return
    const { chainForms } = evolutionChain
    const chainIndex = _.findIndex(chainForms, (pok) => pok.id === pokem.id)

    if (volve === "evolve") {
      if (chainIndex < chainForms.length - 1) {
        const nextPokemon = chainForms[chainIndex + 1]
        if (nextPokemon) setModalOpen(true, nextPokemon)
      }
    } else {
      if (chainIndex > 0) {
        const nextPokemon = chainForms[chainIndex - 1]
        if (nextPokemon) setModalOpen(true, nextPokemon)
      }
    }
  }

  return (
    <>
      {!!pokem.id && (
        <h1 className="title has-text-primary-light is-1 is-align-self-center p-5">{`No. ${pokem.id}   ${formattedName}`}</h1>
      )}

      <div className="columns is-justify-content-center mb-6">
        <div className="column is-3 p-1 m-0 is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
          {!!pokem?.sprites?.front_default && (
            <figure className="image is-384x384 mk-center-x">
              <img
                loading="lazy"
                src={pokem.sprites.front_default}
                alt={pokem.name}
              />
            </figure>
          )}
          <div className="is-flex is-flex-direction-row">
            <button
              className="button is-primary devolveModalButton m-0 mx-4 p-3"
              onClick={() => {
                volvePokemon("devolve")
              }}
            >
              Devolve
            </button>
            <button
              className="button is-primary evolveModalButton m-0 mx-4 p-3"
              onClick={() => {
                volvePokemon("evolve")
              }}
            >
              Evolve
            </button>
          </div>
          {!!evolutionChain && (
            <EvolutionChainDisplay evolutionChain={evolutionChain} />
          )}
        </div>
        <div className="column is-6 p-1 m-0">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>

      <div className="columns is-justify-content-center">
        <div className="column is-1 p-1 m-0">
          <div className="tags has-addons are-medium p-0 m-0">
            <span className="tag is-flex-grow-1">Weight</span>
            <span className="tag is-primary">{weight}</span>
          </div>
        </div>
        <div className="column is-1 p-1 m-0">
          <div className="tags has-addons are-medium p-0 m-0">
            <span className="tag is-flex-grow-1">Height</span>
            <span className="tag is-primary">{height}</span>
          </div>
        </div>
      </div>
      <div className="columns is-justify-content-space-evenly">
        <div className="column is-3">
          <p className="title has-text-primary-light">Stats</p>
          {Array.isArray(stats) && <BaseStatTags stats={stats} pokem={pokem} />}
        </div>

        <div className="column is-3">
          <p className="title has-text-primary-light">Types</p>
          <div className="columns is-flex-wrap-wrap">
            {types.map((pokeType) => (
              <div
                key={`${pokem.name}-${pokeType.type.name}`}
                className="column is-6 p-1"
              >
                <div className="tags has-addons are-medium">
                  <span className="tag is-flex-grow-1 p-0">
                    {`${_.capitalize(pokeType.type.name)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="column is-3">
          <p className="title has-text-primary-light">Abilities</p>
          <div className="columns is-flex-wrap-wrap">
            {abilities.map((pokeAbitilty) => (
              <div
                key={`${pokem.name}-${pokeAbitilty.ability.name}`}
                className="column is-6 p-1"
              >
                <div className="tags has-addons are-medium">
                  <span className="tag is-flex-grow-1 p-0">
                    {`${_.capitalize(pokeAbitilty.ability.name)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PokemonModalDisplay
