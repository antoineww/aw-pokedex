import Highcharts from "highcharts"
import HighchartsMore from "highcharts/highcharts-more"
import HighchartsReact from "highcharts-react-official"
import "highcharts/css/themes/dark-unica.css"
// import "highcharts/css/themes/grid-light.css"
// import "highcharts/css/themes/sand-signika.css"
import _ from "lodash"
import { Pokemon } from "../../api"
import { BaseStatTags, sortAscending } from "./pokeCard"
import { useEffect, useState } from "react"

HighchartsMore(Highcharts)

// const options: Highcharts.Options = {

interface PropsPokeModal {
  modalOpen: boolean
  setModalOpen: Function
  pokemonSelected: Pokemon | null
}

const getTitle = (...pokemon: Pokemon[]) => {
  let titleNames = ""
  pokemon.forEach((pokem, index) => {
    titleNames += `${index > 0 ? "vs " : ""}${_.capitalize(pokem.name)}`
  })
  return titleNames
}

const getOptions = (...pokemon: Pokemon[]) => {
  let categoriesKeys: string[] = []
  let categories: string[] = []
  // const series: { [key: string]: any }[] = []
  const series: Highcharts.SeriesOptionsType[] = []
  const title = getTitle(...pokemon)

  pokemon.forEach((pokem) => {
    const { stats, weight, height } = pokem

    let baseStats: { [key: string]: number } = {}
    stats.forEach((stat) => {
      baseStats[stat.stat.name] = stat.base_stat
    })

    if (categoriesKeys.length < 1) {
      categoriesKeys = [
        ...Object.keys(baseStats).sort(sortAscending),
        "weight",
        "height",
      ]
      categories = categoriesKeys.map((cat) => _.capitalize(cat))
    }
    baseStats = { ...baseStats, weight, height }

    const data = categoriesKeys.map((cat) => baseStats[cat])

    series.push({
      name: _.capitalize(pokem.name),
      //@ts-ignore
      data,
      pointPlacement: "on",
    })
  })

  const options: Highcharts.Options = {
    chart: {
      polar: true,
      type: "line",
    },

    accessibility: {
      description: title,
    },

    title: {
      text: title,
      x: -80,
    },

    pane: {
      size: "80%",
    },

    xAxis: {
      categories,
      tickmarkPlacement: "on",
      lineWidth: 0,
    },

    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
    },

    tooltip: {
      shared: true,
      pointFormat:
        // eslint-disable-next-line no-template-curly-in-string
        '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
    },

    legend: {
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
    },

    series,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: "center",
              verticalAlign: "bottom",
              layout: "horizontal",
            },
            pane: {
              size: "100%",
            },
          },
        },
      ],
    },
  }
  return { options }
}

const PokemonModalDisplay: React.FC<{ pokemon: Pokemon }> = ({
  pokemon: pokem,
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
  }, [])

  return (
    <>
      {!!pokem.id && (
        <h1 className="title has-text-primary-light is-1 is-align-self-center p-6">{`No. ${pokem.id}   ${formattedName}`}</h1>
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
          <button className="button is-primary evolveModalButton">
            Evolve
          </button>
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

export const PokeModal: React.FC<PropsPokeModal> = ({
  modalOpen,
  setModalOpen,
  pokemonSelected,
}) => {
  let pokemonDisplay = null

  if (pokemonSelected !== null)
    pokemonDisplay = <PokemonModalDisplay pokemon={pokemonSelected} />

  return (
    <div
      className={`modal is-clipped is-align-items-stretch ${
        modalOpen ? `is-active` : ``
      }`}
    >
      <div className="modal-background"></div>
      {/* <div className="container"> */}
      <div className="mk-modal mk-scroll p-6">{pokemonDisplay}</div>
      {/* </div> */}
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setModalOpen(false)}
      ></button>
    </div>
  )
}

export default PokeModal
