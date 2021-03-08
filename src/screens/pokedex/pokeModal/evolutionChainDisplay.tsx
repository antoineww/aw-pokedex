import { useState } from "react"

const EvolutionChainDisplay: React.FC<PropsEvolutionChainDisplay> = ({
  evolutionChain,
}) => {
  const [displayState, setDisplayState] = useState({ showChain: false })
  if (!evolutionChain?.chainForms) return null
  const { showChain } = displayState
  const setShowChain = (show = true) =>
    setDisplayState({ ...displayState, showChain: show })

  // console.log({ "evolutionChain.chainForms": evolutionChain.chainForms })
  return (
    <div className="is-flex is-flex-direction-row is-align-items-center evolution-chain-display">
      {!showChain ? (
        <button
          className="button is-primary is-light modalButton m-0 px-5 is-size-5"
          onClick={() => setShowChain()}
        >
          Show Evo Chain
        </button>
      ) : (
        <div
          className="is-flex is-flex-direction-row is-align-items-center"
          onClick={() => setShowChain(false)}
        >
          {evolutionChain.chainForms.map(
            (pokem) =>
              !!pokem?.sprites?.front_default && (
                <figure
                  key={`Evolution-Chain-Display-${pokem.name}`}
                  className="image is-128x128 mk-center-x"
                >
                  <img
                    loading="lazy"
                    src={pokem.sprites.front_default}
                    alt={`Evolution-Chain-Display-${pokem.name}`}
                  />
                </figure>
              )
          )}
        </div>
      )}
    </div>
  )
}

export default EvolutionChainDisplay
