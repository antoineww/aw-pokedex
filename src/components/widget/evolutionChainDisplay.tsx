import React, { useState } from "react"
import EvoChainLinkImage from "./evoChainLinkImage"

export const EvolutionChainDisplay: React.FC<I_P_EvolutionChainDisplay> = ({
  evolutionChain,
  volvePokemon,
}) => {
  const [displayState, setDisplayState] = useState({ showChain: false })

  if (!evolutionChain?.chainForms) return null
  const { showChain } = displayState
  const setShowChain = (show = true) =>
    setDisplayState({ ...displayState, showChain: show })

  // console.log({ "evolutionChain.chainForms": evolutionChain.chainForms })
  return (
    <div className="is-flex is-flex-direction-column is-align-items-center evolution-chain-display">
      <div className="is-flex is-flex-direction-row is-align-items-center">
        {evolutionChain.chainForms.map(
          (pokem) =>
            !!pokem?.sprites?.front_default && (
              <EvoChainLinkImage
                pokem={pokem}
                showChain={showChain}
                volvePokemon={volvePokemon}
              />
            )
        )}
      </div>

      {/* <button
        className="button is-primary is-light modalButton m-0 px-5 is-size-5"
        onClick={() => setShowChain(!showChain)}
      >
        {`${showChain ? "Hide" : "Reveal"} Evolution Chain`}
      </button> */}
    </div>
  )
}

export default EvolutionChainDisplay
