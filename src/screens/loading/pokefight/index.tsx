import React, { useEffect, useState } from "react"
import { animated, AnimatedValue, useSpring, useSprings } from "react-spring"
import {
  actors,
  applyInterpolation,
  getActorImage,
  PokeFightState,
  springCount,
  Stage,
  stages,
  STAGE_STOP,
} from "./util"

const getStage = (stage: number, onRest: Function) => (index: number) => {
  let actorPart = stages[stage].animations[index] || {}
  if (index === springCount - 1) actorPart = { ...actorPart, onRest }
  return actorPart
}

const initialState: PokeFightState = {
  stage: 0,
  stop: false,
}
interface getFighterProps {
  springs: AnimatedValue<Pick<object, never>>[]
  currentStage: Stage
}

const getFighters: (params: getFighterProps) => any = ({
  springs,
  currentStage,
}) => {
  let nidorinoStyle = springs[actors.nidorino]
  let gengarStyle = springs[actors.gengar]
  if (currentStage.interpolations) {
    nidorinoStyle = applyInterpolation(
      currentStage.interpolations[actors.nidorino],
      nidorinoStyle
    )
    gengarStyle = applyInterpolation(
      currentStage.interpolations[actors.gengar],
      gengarStyle
    )
  }

  let nidorino_img
  let gengar_img
  if (currentStage.imageIndecies) {
    nidorino_img = getActorImage(currentStage.imageIndecies[actors.nidorino])
    gengar_img = getActorImage(currentStage.imageIndecies[actors.gengar])
  }

  const nidorino = (
    <animated.img
      src={nidorino_img}
      alt="nidorino_img"
      className={`pokemon-img-lg mk-absolute`}
      style={nidorinoStyle}
    />
  )

  const gengar = (
    <animated.img
      src={gengar_img}
      alt="gengar_img"
      className={`pokemon-img-lg mk-absolute`}
      style={gengarStyle}
    />
  )

  return {
    nidorino,
    gengar,
  }
}

const PokeFight: React.FC = () => {
  const [statePokeFight, setStatePokeFight] = useState<PokeFightState>(
    initialState
  )
  const { stage, stop } = statePokeFight

  const onRestGoToNextStage = (newStage: number, fnName: string) => () => {
    // console.log("onRest ", { stage, newStage, fnName })
    if (stop) return

    if (newStage < stages.length) {
      setStatePokeFight({ ...statePokeFight, stage: newStage })
    }
  }

  const [springs, set] = useSprings(
    springCount,
    getStage(stage, onRestGoToNextStage(stage + 1, "useSprings"))
  )

  useEffect(() => {
    // @ts-ignore typescript-types broken in v8 but fixed in v9
    set(getStage(stage, onRestGoToNextStage(stage + 1, "useEffect")))

    return () => {
      setStatePokeFight({ ...statePokeFight, stop: true })
      set((index: number) => {
        let actorPart = STAGE_STOP.animations[index]
        return actorPart
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  const currentStage = stages[stage]
  const { nidorino, gengar } = getFighters({ springs, currentStage })

  return (
    <div className="container is-flex is-align-items-center">
      <div className="notification is-primary is-centered arena">
        {/* <FlashingBackground /> */}
        {nidorino}
        {gengar}
      </div>
    </div>
  )
}

const FlashingBackground = () => {
  const props = useSpring({
    from: {
      left: "0%",
      top: "0%",
      width: "0%",
      height: "0%",
      background: "lightgreen",
    },
    to: async (
      next: (arg0: {
        left?: string
        top?: string
        width?: string
        height?: string
        background: string
      }) => any
    ) => {
      while (1) {
        await next({
          left: "0%",
          top: "0%",
          width: "100%",
          height: "100%",
          background: "lightblue",
        })
        await next({ height: "50%", background: "lightgreen" })
        await next({
          width: "50%",
          left: "50%",
          background: "lightgoldenrodyellow",
        })
        await next({ top: "0%", height: "100%", background: "lightpink" })
        await next({ top: "50%", height: "50%", background: "lightsalmon" })
        await next({ width: "100%", left: "0%", background: "lightcoral" })
        await next({ width: "50%", background: "lightseagreen" })
        await next({ top: "0%", height: "100%", background: "lightskyblue" })
        await next({ width: "100%", background: "lightslategrey" })
      }
    },
  })

  return (
    <animated.div
      className="pokemon-img-lg script-box mk-absolute"
      style={props}
    />
  )
}

export default PokeFight
