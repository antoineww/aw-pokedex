import gengar_back_img from "../../../assets/images/gengar_back.png"

export type ArenaSide = "A" | "B"

export interface PokeFightState {
  side: ArenaSide
  stage: number
}
export interface Stage {
  side?: ArenaSide
  coverScreen?: boolean
  [key: number]: any
}

export const config = { duration: 3000 }
export const config_fast = { duration: 100 }

const max = {
  right: "70%",
  left: "0%",
  top: "0%",
  bottom: "60%",
}

const center = {
  left: "35%",
  top: "30%",
}

const placing = {
  over: "10%",
  under: "20%",
}

export const slideRight = {
  config,
  to: { left: max.right },
  from: {
    left: "0%",
    top: placing.over,
  },
}

export const slideLeft = {
  config,
  to: { left: "0%" },
  from: {
    left: max.right,
    top: placing.under,
  },
}

export const slideUp = {
  config,
  to: { top: placing.over },
  from: {},
}

export const slideDown = {
  config,
  to: { top: placing.under },
  from: {},
}

export const goUnder = {
  config,
  to: { zIndex: 0 },
  from: { zIndex: 1 },
}

export const goOver = {
  config,
  to: { zIndex: 1 },
  from: { zIndex: 0 },
}

export const actors = {
  nidorino: 0,
  gengar: 1,
}

export const springCount = Object.keys(actors).length // 2

export const stages: Stage[] = [
  {
    [actors.nidorino]: slideRight,
    [actors.gengar]: slideLeft,
    side: "A",
    coverScreen: false,
  },
  {
    [actors.nidorino]: {
      ...slideDown,
      config: config_fast,
      to: { ...slideDown.to, ...goOver.to },
    },
    [actors.gengar]: {
      ...slideUp,
      config: config_fast,
      to: { ...slideUp.to, ...goUnder.to },
    },
  },
  {
    [actors.nidorino]: slideLeft,
    [actors.gengar]: slideRight,
    side: "B",
  },
  {
    [actors.nidorino]: {
      ...slideUp,
      config: config_fast,
      to: { ...slideUp.to, ...goUnder.to },
    },
    [actors.gengar]: {
      ...slideDown,
      config: config_fast,
      to: { ...slideDown.to, ...goOver.to },
    },
  },
  {
    [actors.nidorino]: slideRight,
    [actors.gengar]: slideLeft,
    side: "A",
  },
]
