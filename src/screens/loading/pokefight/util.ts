import nidorino_img from "../../../assets/images/nidorino.png"
import nidorino_back_img from "../../../assets/images/nidorino_back.png"
import gengar_img from "../../../assets/images/gengar.png"
import gengar_back_img from "../../../assets/images/gengar_back.png"
export type ArenaSide = "A" | "B"

export interface PokeFightState {
  stage: number
}
export interface StageActor {
  to: object
  from: object
  config?: object
  [key: string]: any
}

export interface Stage {
  animations: {
    [key: number]: StageActor
  }
  imageIndecies?: { [key: number]: number }
  interpolations?: { [key: number]: any }
  coverScreen?: boolean
}

const images = [nidorino_img, nidorino_back_img, gengar_img, gengar_back_img]

export const getActorImage = (index: number) => images[index]

export const config_slow = { duration: 5000 }
export const config = { duration: 1000 }
export const config_fast = { duration: 500 }
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
export interface BasicAnimatedValue {
  [key: string]: any
}
export interface TransformArgs {
  translate?: { x: number; y: number }
  scale?: number
  rotate?: number
}
export const ipSquish: (props: BasicAnimatedValue) => {} = ({
  squish,
  ...restOfProps
}) => ({
  ...restOfProps,
  transform: squish
    .interpolate({
      range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
      output: [1, 0.97, 0.8, 1.1, 0.8, 1.1, 1.03, 1],
    })
    .interpolate((val: any) => `scale(${val})`),
})
export const ipStrafe: (props: BasicAnimatedValue) => {} = ({
  strafe,
  ...restOfProps
}) => ({
  ...restOfProps,
  transform: strafe
    .interpolate({
      range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
      output: [-5, 5, -10, 5, -5, 10, -5, -5],
    })
    .interpolate((val: any) => `translate(${val}%)`),
})
export const ipSwipe: (
  args: TransformArgs
) => (props: BasicAnimatedValue) => {} = ({ translate }) => ({
  attack,
  ...restOfProps
}) => ({
  ...restOfProps,
  transform: attack
    .interpolate({
      range: [0, 0.3, 1],
      output: [-4, 9, -4],
    })
    .interpolate(
      (val: any) =>
        `translate(${
          val * 12 * (translate?.x ?? 1)
        }0%, -${val}0%) rotate(${val}0deg)`
    ),
})
export const ipTilt: (props: BasicAnimatedValue) => {} = ({
  attack,
  ...restOfProps
}) => ({
  ...restOfProps,
  transform: attack
    .interpolate({
      range: [0, 0.2, 0.4, 0.6, 0.8, 1],
      output: [1, 0, -1, -2, -3, -4],
    })
    .interpolate((val: any) => `rotate(${val}0deg)`),
})

export const applyInterpolation = (
  interpolater: Function,
  props: BasicAnimatedValue
) => {
  let style = props
  if (interpolater) style = interpolater(props)

  return style
}

export const actors = {
  nidorino: 0,
  gengar: 1,
}

export const springCount = Object.keys(actors).length // 2
export const STAGE_RESET: Stage = {
  animations: {
    [actors.nidorino]: {
      from: { squish: 0, strafe: 0, attack: 0 },
      to: { squish: 0, strafe: 0, attack: 0 },
      config: config_instant,
    },
    [actors.gengar]: {
      from: { squish: 0, strafe: 0, attack: 0 },
      to: { squish: 0, strafe: 0, attack: 0 },
      config: config_instant,
    },
  },
  imageIndecies: {
    [actors.nidorino]: 0,
    [actors.gengar]: 3,
  },
}

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
  STAGE_RESET,
  {
    animations: {
      [actors.nidorino]: { from: { squish: 0 }, to: { squish: 1 } },
      [actors.gengar]: { from: { squish: 0 }, to: { squish: 1 }, delay: 1000 },
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 3,
    },
    interpolations: {
      [actors.nidorino]: ipSquish,
      [actors.gengar]: ipSquish,
    },
  },
  {
    animations: {
      [actors.nidorino]: {
        from: { strafe: 0 },
        to: { strafe: 1.5 },
        config: config_fast,
      },
      [actors.gengar]: {
        from: { strafe: 0 },
        to: { strafe: 1 },
        config: config,
        delay: 1000,
      },
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 3,
    },
    interpolations: {
      [actors.nidorino]: ipStrafe,
      [actors.gengar]: ipStrafe,
    },
  },

  {
    animations: {
      [actors.nidorino]: {
        from: { attack: 0 },
        to: { attack: 1 },
        config: config,
        delay: 200,
      },
      [actors.gengar]: {
        from: { attack: 0 },
        to: { attack: 1 },
        config,
      },
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 3,
    },
    interpolations: {
      [actors.nidorino]: ipSwipe({}),
      [actors.gengar]: ipSwipe({}),
    },
  },
  STAGE_RESET,

  {
    animations: {
      [actors.nidorino]: {
        from: { strafe: 0 },
        to: { strafe: 1 },
        config: config_fast,
      },
      [actors.gengar]: {
        from: { strafe: 0 },
        to: { strafe: 1 },
        config,
      },
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 3,
    },
    interpolations: {
      [actors.nidorino]: ipStrafe,
      [actors.gengar]: ipStrafe,
    },
  },
  {
    animations: {
      [actors.nidorino]: {
        from: { attack: 0 },
        to: { attack: 1 },
        config: config_slow,
      },
      [actors.gengar]: {
        from: { attack: 0 },
        to: { attack: 1 },
        config,
        delay: 400,
      },
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 3,
    },
    interpolations: {
      [actors.nidorino]: ipSwipe({ translate: { x: -2, y: 1 } }),
      [actors.gengar]: ipTilt,
    },
  },
]
