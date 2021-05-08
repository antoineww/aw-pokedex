import { useState } from "react"

const EvoChainLinkImage: React.FC<PropsEvoChainLinkImage> = ({
  pokem,
  showChain,
  volvePokemon,
}) => {
  const [reveal, setRevealState] = useState(false)
  return (
    <figure
      key={`Evolution-Chain-Display-${pokem.name}`}
      className={`image is-128x128 mk-center-x`}
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

const EvolutionChainDisplay: React.FC<PropsEvolutionChainDisplay> = ({
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
