import Highcharts from "highcharts"
import HighchartsMore from "highcharts/highcharts-more"
import "highcharts/css/themes/dark-unica.css"
// import "highcharts/css/themes/grid-light.css"
// import "highcharts/css/themes/sand-signika.css"
import _ from "lodash"
import { Pokemon } from "../../../api"
import { sortAscending } from "../pokeCard"

HighchartsMore(Highcharts)

// const options: Highcharts.Options = {

export const getTitle = (...pokemon: Pokemon[]) => {
  let titleNames = ""
  pokemon.forEach((pokem, index) => {
    titleNames += `${index > 0 ? "vs " : ""}${_.capitalize(pokem.name)}`
  })
  return titleNames
}

export const getOptions = (...pokemon: Pokemon[]) => {
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
