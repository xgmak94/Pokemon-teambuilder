import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../GlobalStore';
import PokemonImage from '../../components/pokemon/PokemonImage';
import PokemonName from '../../components/pokemon/PokemonName';
import PokemonTypes from '../../components/types/PokemonTypes';
import EditPokemonModal from '../modals/EditPokemonModal';
import Link from 'next/link';

function TeamTile({ idx, teamName, pokemonName }) {
  const { allPokemon } = useGlobalContext();

  const [pokemon, setPokemon] = useState();
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    let idx = allPokemon.findIndex((poke) => {
      return poke.name === pokemonName;
    });
    setPokemon(allPokemon[idx]);
  }, [allPokemon, pokemonName]);

  function handleClick() {
    setShowEditModal(true);
  }

  return (
    <>
      {showEditModal && <EditPokemonModal setShowModal={setShowEditModal} pokemon={pokemon} teamName={teamName} idx={idx}/>}
      {pokemon && (
        <>
          <div className="flex flex-col justify-center">
            <div
              className="flex cursor-pointer justify-center"
              onClick={() => handleClick()}
            >
              <PokemonImage
                images={pokemon.sprites}
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-row justify-center">
              <PokemonName name={pokemon.name} />
            </div>
            <PokemonTypes
              types={pokemon.types.map((type) => type.type.name)}
            />
          </div>
        </>
      )}
    </>
  );
}

export default TeamTile;
