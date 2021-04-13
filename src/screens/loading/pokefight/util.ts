import poke_images from "../../../assets/images"

// @ts-ignore
const images = Object.entries(poke_images)
// console.log({ poke_images, images })

export const getActorImage = (index: number, indexFront: any = 0) =>
  indexFront === 0 ? images[index][1].front : images[index][1].back

export const config_slow = { duration: 2000 }
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
    ?.interpolate({
      range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
      output: [1, 0.97, 0.8, 1.1, 0.8, 1.1, 1.03, 1],
    })
    ?.interpolate((val: any) => `scale(${val})`),
})
export const ipStrafe: (props: BasicAnimatedValue) => {} = ({
  strafe,
  ...restOfProps
}) => ({
  ...restOfProps,
  transform: strafe
    ?.interpolate({
      range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
      output: [-5, 5, -10, 5, -5, 10, -5, -5],
    })
    ?.interpolate((val: any) => `translate(${val}%)`),
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
    ?.interpolate({
      range: [0, 0.3, 0.5, 1],
      output: [0, -8, 0, -8],
    })
    ?.interpolate(
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
    ?.interpolate({
      range: [0, 0.3, 1],
      output: [0, 8, 0],
    })
    ?.interpolate(
      (val: any) =>
        `translate(${val * (translate?.x ?? 1)}0%, ${
          PARABOLA_CONVEX(val) * (translate?.y ?? 1)
        }0%) rotate(${val}0deg)`
    ),
})
export const ipTilt: (
  args: TransformArgs
) => (props: BasicAnimatedValue) => {} = ({ rotate, translate }) => ({
  attack,
  ...restOfProps
}) => ({
  ...restOfProps,
  transform: attack
    ?.interpolate({
      range: [0, 0.3, 1],
      output: [1, 0, -20],
    })
    ?.interpolate(
      (val: any) =>
        `translate(${val * (translate?.x ?? 1)}%, ${
          PARABOLA_CONVEX(val) * (translate?.y ?? 1)
        }%) rotate(${val * (rotate ?? 1)}0deg)`
    ),
})

export const applyInterpolation = (
  interpolater: Function,
  props: BasicAnimatedValue
) => {
  let style = props
  if (interpolater) style = interpolater(props)

  return style
}

export class StageShow {
  constructor(actorA?: number, actorB?: number) {
    this.actors_images = {
      actorA: actorA ?? this.actors_images.actorA,
      actorB: actorB ?? this.actors_images.actorB,
    }
  }

  actors = {
    actorA: 0,
    actorB: 1,
  }

  stayActor = this.actors.actorA
  flipActor = this.actors.actorB

  actors_images = {
    actorA: 3,
    actorB: 0,
  }

  actors_pose = {
    front: 0,
    back: 1,
  }

  isFlipActor = (actor: number) => this.flipActor === actor
  isStayActor = (actor: number) => this.stayActor === actor

  rotateActorImages = () => {
    if (this.isFlipActor(this.actors.actorA)) {
      this.stayActor = this.actors.actorA
      this.flipActor = this.actors.actorB
      this.actors_images.actorA =
        (this.actors_images.actorA + 2) % images.length
    } else {
      this.stayActor = this.actors.actorB
      this.flipActor = this.actors.actorA
      this.actors_images.actorB =
        (this.actors_images.actorB + 2) % images.length
    }
  }

  STAGE_RESET: Stage = {
    animations: {
      [this.actors.actorA]: {
        from: { squish: 0, strafe: 0, attack: 0 },
        to: { squish: 0, strafe: 0, attack: 0 },
        config: config_instant,
      },
      [this.actors.actorB]: {
        from: { squish: 0, strafe: 0, attack: 0 },
        to: { squish: 0, strafe: 0, attack: 0 },
        config: config_instant,
      },
    },
    imageIndecies: {
      [this.actors.actorA]: [this.actors_images.actorA, this.actors_pose.front],
      [this.actors.actorB]: [this.actors_images.actorB, this.actors_pose.back],
    },
  }
  STAGE_STOP: Stage = {
    animations: {
      [this.actors.actorA]: {
        from: {},
        to: {},
        immediate: true,
      },
      [this.actors.actorB]: {
        from: {},
        to: {},
        immediate: true,
      },
    },
    imageIndecies: {
      [this.actors.actorA]: [this.actors_images.actorA, this.actors_pose.front],
      [this.actors.actorB]: [this.actors_images.actorB, this.actors_pose.back],
    },
  }
  STAGE_ENTRY: Stage = {
    animations: {
      [this.actors.actorA]: {
        from: {},
        to: {
          ...flipX("-1").to,
          ...slideLeft().to,
          ...slideUp.to,
        },
        config: config_instant,
      },
      [this.actors.actorB]: {
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
      [this.actors.actorA]: [this.actors_images.actorA, this.actors_pose.front],
      [this.actors.actorB]: [this.actors_images.actorB, this.actors_pose.back],
    },
    coverScreen: false,
  }
  STAGE_POSED_1: Stage = {
    animations: {
      [this.actors.actorA]: {
        from: {
          ...this.STAGE_RESET.animations[this.actors.actorA].from,
        },
        to: {
          ...this.STAGE_RESET.animations[this.actors.actorA].to,
          ...flipX("-1").to,
          ...slideRight().to,
          ...slideUp.to,
        },
        config: config_instant,
      },
      [this.actors.actorB]: {
        from: {
          ...this.STAGE_RESET.animations[this.actors.actorB].from,
        },
        to: {
          ...this.STAGE_RESET.animations[this.actors.actorB].to,
          ...flipX("-1").to,
          ...slideLeft().to,
          ...slideDown.to,
        },
        config: config_instant,
      },
    },
    imageIndecies: {
      [this.actors.actorA]: [this.actors_images.actorA, this.actors_pose.front],
      [this.actors.actorB]: [this.actors_images.actorB, this.actors_pose.back],
    },
    coverScreen: false,
  }

  test_stages: Stage[] = [
    this.STAGE_ENTRY,
    {
      animations: {
        [this.actors.actorA]: slideRight(center.left, undefined),

        [this.actors.actorB]: slideLeft(center.left, undefined),
      },
      imageIndecies: {
        [this.actors.actorA]: [
          this.actors_images.actorA,
          this.actors_pose.front,
        ],
        [this.actors.actorB]: [
          this.actors_images.actorB,
          this.actors_pose.back,
        ],
      },
      coverScreen: false,
    },
  ]

  getStages = () => {
    const stages: Stage[] = [
      this.STAGE_ENTRY,

      //Slide X1
      {
        animations: {
          [this.actors.actorA]: slideRight(undefined, center.left),
          [this.actors.actorB]: slideLeft(undefined, center.left),
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        coverScreen: false,
      },
      // Flip X1
      {
        animations: {
          [this.actors.actorA]: {
            ...flipX("1"),
            config: config_instant,
          },
          [this.actors.actorB]: {
            ...flipX("1"),
            config: config_instant,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        coverScreen: false,
      },
      //Slide X1-2
      {
        animations: {
          [this.actors.actorA]: slideRight(center.left, undefined),

          [this.actors.actorB]: slideLeft(center.left, undefined),
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        coverScreen: false,
      },
      // Flip X1-2
      {
        animations: {
          [this.actors.actorB]: {
            ...flipX(),
            config: config_instant,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        coverScreen: false,
      },
      // Slide Y1
      {
        animations: {
          [this.actors.actorA]: {
            ...slideDown,
            config: config_fast,
            from: { ...slideDown.from, ...goOver.from },
            to: { ...slideDown.to, ...goOver.to },
          },
          [this.actors.actorB]: {
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
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.front,
          ],
        },
      },

      // Flip X2
      {
        animations: {
          [this.actors.actorB]: {
            ...flipX("-1"),
            config: config_instant,
          },
          [this.actors.actorA]: {
            ...flipX("-1"),
            config: config_instant,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.front,
          ],
        },
        coverScreen: false,
      },
      // Slide X2
      {
        animations: {
          [this.actors.actorB]: slideRight(undefined, center.left),
          [this.actors.actorA]: {
            ...slideLeft(),
            to: {
              ...slideLeft(undefined, center.left).to,
            },
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.back,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.front,
          ],
        },
        coverScreen: false,
      },
      // Flip X2-2
      {
        animations: {
          [this.actors.actorB]: {
            ...flipX("1"),
            config: config_instant,
          },
          [this.actors.actorA]: {
            ...flipX("1"),
            config: config_instant,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.back,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.front,
          ],
        },
        coverScreen: false,
      },
      // Slide X2-2
      {
        animations: {
          [this.actors.actorB]: slideRight(center.left, undefined),

          [this.actors.actorA]: slideLeft(center.left, undefined),
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.back,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.front,
          ],
        },
        coverScreen: false,
      },
      // Flip X2-3
      {
        animations: {
          [this.actors.actorB]: {
            ...flipX("-1"),
            config: config_instant,
          },
          [this.actors.actorA]: {
            ...flipX("-1"),
            config: config_instant,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.back,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        coverScreen: false,
      },

      // Slide Y2
      {
        animations: {
          [this.actors.actorA]: {
            ...slideUp,
            config: config_fast,
            to: { ...slideUp.to, ...goUnder.to },
          },
          [this.actors.actorB]: {
            ...slideDown,
            config: config_fast,
            to: { ...slideDown.to, ...goOver.to },
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
      },

      // Slide X3(X1)
      this.STAGE_ENTRY,
      {
        animations: {
          [this.actors.actorA]: slideRight(undefined, center.left),
          [this.actors.actorB]: slideLeft(undefined, center.left),
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        coverScreen: false,
      },
      // Flip X1
      {
        animations: {
          [this.actors.actorA]: {
            ...flipX("1"),
            config: config_instant,
          },
          [this.actors.actorB]: {
            ...flipX("1"),
            config: config_instant,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        coverScreen: false,
      },
      //Slide X1-2
      {
        animations: {
          [this.actors.actorA]: slideRight(center.left, undefined),

          [this.actors.actorB]: slideLeft(center.left, undefined),
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        coverScreen: false,
      },
      // Flip X1-2
      {
        animations: {
          [this.actors.actorB]: {
            ...flipX(),
            config: config_instant,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        coverScreen: false,
      },

      // PREP FIGHT
      this.STAGE_RESET,
      // SQUISH
      {
        animations: {
          [this.actors.actorA]: {
            from: { squish: 0 },
            to: { squish: 1 },
            config,
          },
          [this.actors.actorB]: {
            from: { squish: 0 },
            to: { squish: 1 },
            config,
            delay: 1000,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        interpolations: {
          [this.actors.actorA]: ipSquish,
          [this.actors.actorB]: ipSquish,
        },
      },
      // STRAFE 1
      {
        animations: {
          [this.actors.actorA]: {
            from: { strafe: 0 },
            to: { strafe: 1.5 },
            config: config_fast,
          },
          [this.actors.actorB]: {
            from: { strafe: 0 },
            to: { strafe: 1 },
            config: config,
            delay: 1000,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        interpolations: {
          [this.actors.actorA]: ipStrafe,
          [this.actors.actorB]: ipStrafe,
        },
      },
      // this.STAGE_POSED_1,
      this.STAGE_RESET,
      // ATTACK 1
      {
        animations: {
          [this.actors.actorA]: {
            from: { strafe: 0 },
            to: { strafe: 0.8 },
            config,
          },
          [this.actors.actorB]: {
            from: { attack: 0 },
            to: { attack: 0.6 },
            config,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        interpolations: {
          [this.actors.actorA]: ipHop({ translate: { x: 4, y: 1 } }),
          [this.actors.actorB]: ipSwipe({ translate: { x: 18, y: 1 } }),
        },
      },
      this.STAGE_RESET,

      // STRAFE 2
      {
        animations: {
          [this.actors.actorA]: {
            from: { strafe: 0 },
            to: { strafe: 1 },
            config: config_fast,
          },
          [this.actors.actorB]: {
            from: { strafe: 0 },
            to: { strafe: 1 },
            config,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        interpolations: {
          [this.actors.actorA]: ipStrafe,
          [this.actors.actorB]: ipStrafe,
        },
      },

      // ATTACK 2
      {
        animations: {
          [this.stayActor]: {
            from: { attack: 0 },
            to: { attack: 0.9 },
            config: config_slow,
          },
          [this.flipActor]: {
            from: { attack: 0 },
            to: { attack: 1 },
            config: config_slow,
          },
        },
        imageIndecies: {
          [this.actors.actorA]: [
            this.actors_images.actorA,
            this.actors_pose.front,
          ],
          [this.actors.actorB]: [
            this.actors_images.actorB,
            this.actors_pose.back,
          ],
        },
        interpolations: {
          [this.stayActor]: ipSwipe({
            translate: {
              x: -30 * (this.isStayActor(this.actors.actorA) ? 1 : -1),
              y: -2 * (this.isStayActor(this.actors.actorA) ? 1 : -1),
            },
          }),
          [this.flipActor]: ipTilt({
            rotate: 10 * (this.isFlipActor(this.actors.actorB) ? 1 : -1),
            translate: {
              x: 10 * (this.isFlipActor(this.actors.actorB) ? 1 : -1),
              y: 1 * (this.isFlipActor(this.actors.actorB) ? -1 : 1),
            },
          }),
        },
      },
      // this.STAGE_STOP,
    ]

    return stages
  }
}
