import nidorino_img from "../../../assets/images/nidorino.png"
import nidorino_back_img from "../../../assets/images/nidorino_back.png"
import gengar_img from "../../../assets/images/gengar.png"
import gengar_back_img from "../../../assets/images/gengar_back.png"
export type ArenaSide = "A" | "B"

export interface PokeFightState {
  stage: number
}
export interface Stage {
  animations: { [key: number]: any }
  imageIndecies?: { [key: number]: number }
  coverScreen?: boolean
}

const images = [nidorino_img, nidorino_back_img, gengar_img, gengar_back_img]

export const getActorImage = (index: number) => images[index]

export const config = { duration: 3000 }
export const config_fast = { duration: 0 }
export const config_instant = { duration: 0 }

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
    animations: {
      [actors.nidorino]: slideRight,
      [actors.gengar]: slideLeft,
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 3,
    },
    coverScreen: false,
  },
  // {
  //   animations: {
  //     [actors.gengar]: {
  //       ...slideLeft,
  //       config: config_instant,
  //       to: { ...slideLeft.to, transform: "scaleX(-1)" },
  //     },
  //   },
  //   imageIndecies: {
  //     [actors.nidorino]: 0,
  //     [actors.gengar]: 3,
  //   },
  // },

  {
    animations: {
      [actors.nidorino]: {
        ...slideDown,
        config: config_fast,
        from: { ...slideDown.from, ...goOver.from },
        to: { ...slideDown.to, ...goOver.to },
      },
      [actors.gengar]: {
        ...slideUp,
        config: config_fast,
        from: { ...slideUp.from, ...goUnder.from },
        to: {
          ...slideUp.to,
          ...goUnder.to,
        },
      },
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 2,
    },
  },
  {
    animations: {
      [actors.nidorino]: slideLeft,
      [actors.gengar]: slideRight,
    },
    imageIndecies: {
      [actors.nidorino]: 1,
      [actors.gengar]: 2,
    },
  },
  {
    animations: {
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
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 2,
    },
  },
  {
    animations: {
      [actors.nidorino]: slideRight,
      [actors.gengar]: slideLeft,
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 3,
    },
  },
]
