import React, { useState } from "react"

export const EvolutionChainLinkImage: React.FC<I_P_IM_EvolutionChainLink> = ({
  pokem,
  showChain,
  volvePokemon,
}) => {
  const [reveal, setRevealState] = useState(false)
  return (
    <figure
      key={`Evolution-Chain-Display-${pokem.name}`}
      className={`image is-128x128 mk-center-x evolution-chain-display-pokemon`}
      onClick={() => volvePokemon()}
      onDoubleClick={() => setRevealState(!reveal)}
    >
      <img
        loading="lazy"
        src={pokem.sprites.front_default}
        alt={`Evolution-Chain-Display-${pokem.name}`}
        className={`${showChain || reveal ? "" : "masked"}`}
      />
    </figure>
  )
}

export default EvolutionChainLinkImage
