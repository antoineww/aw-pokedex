import React, { useState } from "react"
import nidorino_img from "../../assets/images/nidorino.png"
import nidorino_back_img from "../../assets/images/nidorino_back.png"
import gengar_img from "../../assets/images/gengar.png"
import gengar_back_img from "../../assets/images/gengar_back.png"

import "../../css/App2.css"
import { animated, useSpring } from "react-spring"

type ArenaSide = "A" | "B"
const PokeFight: React.FC = () => {
  const [stateArena, setStateArena] = useState<ArenaSide>("A")

  const animateSlideRight = useSpring({
    config: { duration: 600 },
    to: { left: "50%" },
    from: {
      left: "0%",
      top: "0%",
    },
    // onRest: () => setStateArena(stateArena === "A" ? "B" : "A"),
  })

  const animateSlideLeft = useSpring({
    config: { duration: 600 },
    to: { left: "0%" },
    from: {
      left: "50%",
      top: "0%",
      zIndex: 1,
    },
  })

  const nidorino = (
    <animated.img
      src={stateArena === "A" ? nidorino_img : nidorino_back_img}
      alt="nidorino_img"
      className="pokemon-img-lg mk-absolute"
      style={stateArena === "A" ? animateSlideRight : animateSlideLeft}
    />
  )

  const gengar = (
    <animated.img
      src={stateArena === "B" ? gengar_img : gengar_back_img}
      alt="gengar_img"
      className="pokemon-img-lg mk-absolute"
      style={stateArena === "B" ? animateSlideRight : animateSlideLeft}
    />
  )

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
