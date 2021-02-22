import _ from "lodash"
import { Pokemon } from "../../api"
import { BaseStatTags } from "./pokeCard"
interface PropsPokeModal {
  modalOpen: boolean
  setModalOpen: Function
  pokemonSelected: Pokemon | null
}

const PokemonDisplay: React.FC<{ pokemon: Pokemon }> = ({ pokemon: pokem }) => {
  const formattedName = _.capitalize(pokem.name)
  const { stats } = pokem
  return (
    <>
      {!!pokem.id && (
        <p className="title">{`No. ${pokem.id}   ${formattedName}`}</p>
      )}
      {!!pokem?.sprites?.front_default && (
        <figure className="image is-384x384 mk-center-x">
          <img
            loading="lazy"
            src={pokem.sprites.front_default}
            alt={pokem.name}
          />
        </figure>
      )}

      {Array.isArray(stats) && <BaseStatTags stats={stats} pokem={pokem} />}
    </>
  )
}

export const PokeModal: React.FC<PropsPokeModal> = ({
  modalOpen,
  setModalOpen,
  pokemonSelected,
}) => {
  let pokemonDisplay = null

  if (pokemonSelected !== null)
    pokemonDisplay = <PokemonDisplay pokemon={pokemonSelected} />

  return (
    <div className={`modal ${modalOpen ? `is-active` : ``}`}>
      <div className="modal-background"></div>
      <div className="mk-modal">{pokemonDisplay}</div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setModalOpen(false)}
      ></button>
    </div>
  )
}

export default PokeModal
