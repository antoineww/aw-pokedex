import React, { useEffect, useState } from "react"
import nidorino_img from "../../../assets/images/nidorino.png"
import nidorino_back_img from "../../../assets/images/nidorino_back.png"
import gengar_img from "../../../assets/images/gengar.png"
import gengar_back_img from "../../../assets/images/gengar_back.png"

import { animated, useSpring, useSprings } from "react-spring"
import { PokeFightState, springCount, stages } from "./util"

const getStage = (stage: number, onRest: Function) => (index: number) => {
  let actorPart = stages[stage][index] || {}
  if (index === springCount - 1) actorPart = { ...actorPart, onRest }
  return actorPart
}

const initialState: PokeFightState = {
  side: "A",
  stage: 0,
}

const PokeFight: React.FC = () => {
  const [statePokeFight, setStatePokeFight] = useState<PokeFightState>(
    initialState
  )
  const { side, stage } = statePokeFight

  const onRestGoToNextStage = (newStage: number, fnName: string) => () => {
    console.log("onRest ", { stage, newStage, fnName })

    if (newStage < stages.length) {
      const newSide = stages[newStage].side || side

      setStatePokeFight({ ...statePokeFight, stage: newStage, side: newSide })
    }
  }

  const [springs, set] = useSprings(
    springCount,
    getStage(stage, onRestGoToNextStage(stage + 1, "useSprings"))
  )

  useEffect(() => {
    // @ts-ignore typescript-types broken in v8 but fixed in v9
    set(getStage(stage, onRestGoToNextStage(stage + 1, "useEffect")))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  const [nidorinoProps, gengarProps] = springs

  const nidorino = (
    <animated.img
      src={side === "A" ? nidorino_img : nidorino_back_img}
      alt="nidorino_img"
      className={`pokemon-img-lg mk-absolute`}
      style={nidorinoProps}
    />
  )

  const gengar = (
    <animated.img
      src={side === "B" ? gengar_img : gengar_back_img}
      alt="gengar_img"
      className={`pokemon-img-lg mk-absolute`}
      style={gengarProps}
    />
  )

  console.log({ stage, side })

  return (
    <div className="container is-flex is-align-items-center">
      <div className="notification is-primary is-centered arena">
        {/* <FlashingBackground /> */}
        {nidorino}
        {gengar}
      </div>
      {/* <div className="columns ">
      <div className="column notification is-primary arena ">
        
      </div>
    </div> */}
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
