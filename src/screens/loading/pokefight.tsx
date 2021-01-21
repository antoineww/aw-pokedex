import React from "react"
import nidorino_img from "../../assets/images/nidorino.png"
import nidorino_back_img from "../../assets/images/nidorino_back.png"
import gengar_img from "../../assets/images/gengar.png"
import gengar_back_img from "../../assets/images/gengar_back.png"

import "../../css/App2.css"

const PokeFight: React.FC = () => {
  const nidorino = (
    <img src={nidorino_img} alt="nidorino_img" className="pokemon-img-lg" />
  )
  const nidorino_back = (
    <img
      src={nidorino_back_img}
      alt="nidorino_back_img"
      className="pokemon-img-lg"
    />
  )
  const gengar = (
    <img src={gengar_img} alt="gengar_img" className="pokemon-img-lg" />
  )
  const gengar_back = (
    <img
      src={gengar_back_img}
      alt="gengar_back_img"
      className="pokemon-img-lg"
    />
  )

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column notification is-primary">
            {gengar_back}
            {nidorino}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PokeFight
