import nidorino_img from "../../../assets/images/nidorino.png"
import nidorino_back_img from "../../../assets/images/nidorino_back.png"
import gengar_img from "../../../assets/images/gengar.png"
import gengar_back_img from "../../../assets/images/gengar_back.png"

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

export const slideRight = (a = "0%", b = max.right) => ({
  config,
  to: { left: b },
  from: {
    left: a,
    top: placing.over,
  },
})

export const slideLeft = (a = max.right, b = "0%") => ({
  config,
  to: { left: b },
  from: {
    left: a,
    top: placing.under,
  },
})

export const flipX = (b = "-1") => ({
  config,
  to: {
    transform: `scaleX(${b})`,
  },
  from: {},
})

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

const PARABOLA_CONVEX = (x: number) => 6 * x - Math.pow(x, 2)
const PARABOLA_CONCAVE = (x: number) => 6 * x + Math.pow(x, 2)
export const ipHop: (
  args: TransformArgs
) => (props: BasicAnimatedValue) => {} = ({ translate = {} }) => ({
  strafe,
  ...restOfProps
}) => ({
  ...restOfProps,
  transform: strafe
    .interpolate({
      range: [0, 0.3, 0.5, 1],
      output: [0, -8, 0, -8],
    })
    .interpolate(
      (val: any) =>
        `translate(${val * (translate?.x ?? 1)}%,${
          PARABOLA_CONCAVE(val) * (translate?.y ?? 1)
        }%)`
    ),
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
      output: [0, 8, 0],
    })
    .interpolate(
      (val: any) =>
        `translate(${val * (translate?.x ?? 1)}0%, ${
          PARABOLA_CONVEX(val) * (translate?.y ?? 1)
        }0%) rotate(${val}0deg)`
    ),
})
export const ipTilt: (
  args: TransformArgs
) => (props: BasicAnimatedValue) => {} = ({ rotate }) => ({
  attack,
  ...restOfProps
}) => ({
  ...restOfProps,
  transform: attack
    .interpolate({
      range: [0, 0.2, 0.4, 0.6, 0.8, 1],
      output: [1, 0, -1, -2, -3, -4],
    })
    .interpolate((val: any) => `rotate(${val * (rotate ?? 1)}0deg)`),
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
export const STAGE_STOP: Stage = {
  animations: {
    [actors.nidorino]: {
      from: {},
      to: {},
      immediate: true,
    },
    [actors.gengar]: {
      from: {},
      to: {},
      immediate: true,
    },
  },
  imageIndecies: {
    [actors.nidorino]: 0,
    [actors.gengar]: 3,
  },
}
export const STAGE_ENTRY: Stage = {
  animations: {
    [actors.nidorino]: {
      from: {},
      to: {
        ...flipX("-1").to,
        ...slideLeft().to,
        ...slideUp.to,
      },
      config: config_instant,
    },
    [actors.gengar]: {
      from: {},
      to: {
        ...flipX("-1").to,
        ...slideRight().to,
        ...slideDown.to,
      },
      config: config_instant,
    },
  },
  imageIndecies: {
    [actors.nidorino]: 0,
    [actors.gengar]: 3,
  },
  coverScreen: false,
}
export const STAGE_POSED_1: Stage = {
  animations: {
    [actors.nidorino]: {
      from: {
        ...STAGE_RESET.animations[actors.nidorino].from,
      },
      to: {
        ...STAGE_RESET.animations[actors.nidorino].to,
        ...flipX("-1").to,
        ...slideRight().to,
        ...slideUp.to,
      },
      config: config_instant,
    },
    [actors.gengar]: {
      from: {
        ...STAGE_RESET.animations[actors.gengar].from,
      },
      to: {
        ...STAGE_RESET.animations[actors.gengar].to,
        ...flipX("-1").to,
        ...slideLeft().to,
        ...slideDown.to,
      },
      config: config_instant,
    },
  },
  imageIndecies: {
    [actors.nidorino]: 0,
    [actors.gengar]: 3,
  },
  coverScreen: false,
}

export const stages: Stage[] = [
  //Slide X1
  {
    animations: {
      [actors.nidorino]: slideRight(),
      [actors.gengar]: slideLeft(),
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 3,
    },
    coverScreen: false,
  },

  // Slide Y1
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

  // Slide X2
  {
    animations: {
      [actors.nidorino]: slideLeft(),
      [actors.gengar]: slideRight(),
    },
    imageIndecies: {
      [actors.nidorino]: 1,
      [actors.gengar]: 2,
    },
  },

  // Slide Y2
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

  // Slide X3(X1)
  {
    animations: {
      [actors.nidorino]: slideRight(),
      [actors.gengar]: slideLeft(),
    },
    imageIndecies: {
      [actors.nidorino]: 0,
      [actors.gengar]: 3,
    },
  },

  // PREP FIGHT
  STAGE_RESET,

  // SQUISH
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
  // STRAFE 1
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

  // ATTACK 1

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

  // STRAFE 2
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

  // ATTACK 2
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
