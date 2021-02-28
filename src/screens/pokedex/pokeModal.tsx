import _ from "lodash"
import { Pokemon } from "../../api"
import { BaseStatTags } from "./pokeCard"
interface PropsPokeModal {
  modalOpen: boolean
  setModalOpen: Function
  pokemonSelected: Pokemon | null
}

const PokemonModalDisplay: React.FC<{ pokemon: Pokemon }> = ({
  pokemon: pokem,
}) => {
  const formattedName = _.capitalize(pokem.name)
  const { stats, types, abilities, weight, height } = pokem
  return (
    <>
      {!!pokem.id && (
        <h1 className="title has-text-primary-light is-1 is-align-self-center">{`No. ${pokem.id}   ${formattedName}`}</h1>
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
      {/* <div className="is-flex is-flex-direction-row mb-6 is-justify-content-center"> */}
      <div className="columns is-justify-content-center">
        <div className="column is-1 p-1 m-0">
          <div className="tags has-addons are-medium p-0 m-0">
            <span className="tag is-flex-grow-1">Weight</span>
            <span className="tag is-primary">{weight}</span>
          </div>
        </div>
        <div className="column is-1 p-1 m-0">
          <div className="tags has-addons are-medium p-0 m-0">
            <span className="tag is-flex-grow-1">Height</span>
            <span className="tag is-primary">{height}</span>
          </div>
        </div>
      </div>
      <div className="columns is-justify-content-space-evenly">
        <div className="column is-3">
          <p className="title has-text-primary-light">Stats</p>
          {Array.isArray(stats) && <BaseStatTags stats={stats} pokem={pokem} />}
        </div>

        <div className="column is-3">
          <p className="title has-text-primary-light">Types</p>
          <div className="columns is-flex-wrap-wrap">
            {types.map((pokeType) => (
              <div
                key={`${pokem.name}-${pokeType.type.name}`}
                className="column is-6 p-1"
              >
                <div className="tags has-addons are-medium">
                  <span className="tag is-flex-grow-1 p-0">
                    {`${_.capitalize(pokeType.type.name)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="column is-3">
          <p className="title has-text-primary-light">Abilities</p>
          <div className="columns is-flex-wrap-wrap">
            {abilities.map((pokeAbitilty) => (
              <div
                key={`${pokem.name}-${pokeAbitilty.ability.name}`}
                className="column is-6 p-1"
              >
                <div className="tags has-addons are-medium">
                  <span className="tag is-flex-grow-1 p-0">
                    {`${_.capitalize(pokeAbitilty.ability.name)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
    pokemonDisplay = <PokemonModalDisplay pokemon={pokemonSelected} />

  return (
    <div
      className={`modal is-clipped is-align-items-stretch ${
        modalOpen ? `is-active` : ``
      }`}
    >
      <div className="modal-background"></div>
      {/* <div className="container"> */}
      <div className="mk-modal mk-scroll p-6">{pokemonDisplay}</div>
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
