import React, { useEffect, useState } from "react"
import nidorino_img from "../../assets/images/nidorino.png"
import nidorino_back_img from "../../assets/images/nidorino_back.png"
import gengar_img from "../../assets/images/gengar.png"
import gengar_back_img from "../../assets/images/gengar_back.png"

import "../../css/App2.css"
import { animated, useSpring, useSprings } from "react-spring"

type ArenaSide = "A" | "B"

interface Stage {
  side: ArenaSide
  [key: number]: any
}

interface PokeFightState {
  side: ArenaSide
  stage: number
}

const slideRight = (zIndex = 0) => ({
  config: { duration: 1000 },
  to: { left: "50%" },
  from: {
    left: "0%",
    top: "0%",
    // zIndex,
  },
})

const slideLeft = (zIndex = 0) => ({
  config: { duration: 1000 },
  to: { left: "0%" },
  from: {
    left: "50%",
    top: "10%",
    // zIndex,
  },
})

const actors = {
  nidorino: 0,
  gengar: 1,
}
const springCount = Object.keys(actors).length // 2

const stages: Stage[] = [
  {
    [actors.nidorino]: slideRight(0),
    [actors.gengar]: slideLeft(1),
    side: "A",
  },
  {
    [actors.nidorino]: slideLeft(5),
    [actors.gengar]: slideRight(0),
    side: "B",
  },
  {
    [actors.nidorino]: slideRight(0),
    [actors.gengar]: slideLeft(1),
    side: "A",
  },
]

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
  const newSide = stages[stage].side || side

  const onRest = (newStage: number) => () => {
    const goToNextStage = () => {
      console.log("onRest ", { stage, newStage })

      if (newStage < stages.length)
        setStatePokeFight({ ...statePokeFight, stage: newStage })
    }

    goToNextStage()
  }
  const [springs, set] = useSprings(
    springCount,
    getStage(stage, onRest(stage + 1))
  )
  const [nidorinoProps, gengarProps] = springs

  useEffect(() => {
    if (newSide !== side)
      setStatePokeFight({ ...statePokeFight, side: newSide })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSide])

  useEffect(() => {
    // @ts-ignore typescript broken in v8 but fixed in v9
    set(getStage(stage, onRest(stage + 1)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  const nidorino = (
    <animated.img
      src={side === "A" ? nidorino_img : nidorino_back_img}
      alt="nidorino_img"
      className={`pokemon-img-lg mk-absolute ${
        side === "A" ? "mk-under" : "mk-over"
      }`}
      style={nidorinoProps}
    />
  )

  const gengar = (
    <animated.img
      src={side === "B" ? gengar_img : gengar_back_img}
      alt="gengar_img"
      className={`pokemon-img-lg mk-absolute ${
        side === "B" ? "mk-under" : "mk-over"
      }`}
      style={gengarProps}
    />
  )

  console.log({ stage, side })

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column notification is-primary arena">
            {/* <FlashingBackground /> */}
            {nidorino}
            {gengar}
          </div>
        </div>
      </div>
    </section>
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
