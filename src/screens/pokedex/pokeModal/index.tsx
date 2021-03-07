import PokemonModalDisplay from "./pokemonModalDisplay"

const PokeModal: React.FC<PropsPokeModal> = ({
  modalOpen,
  setModalOpen,
  pokemonSelected,
  evolutionChain,
}) => {
  let pokemonDisplay = null

  if (pokemonSelected !== null)
    pokemonDisplay = (
      <PokemonModalDisplay
        pokemon={pokemonSelected}
        evolutionChain={evolutionChain}
      />
    )

  return (
    <div
      className={`modal is-clipped is-align-items-stretch ${
        modalOpen ? `is-active` : ``
      }`}
    >
      <div className="modal-background"></div>
      {/* <div className="container"> */}
      <div className="mk-modal mk-scroll p-3">{pokemonDisplay}</div>
      {/* </div> */}
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setModalOpen(false)}
      ></button>
    </div>
  )
}

export default PokeModal
