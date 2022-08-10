import React, { useState } from 'react';
import PokemonImage from '../../components/pokemon/PokemonImage';
import PokemonName from '../../components/pokemon/PokemonName';
import PokemonTypes from '../../components/types/PokemonTypes';
import Image from 'next/image';
import SearchPokemonModal from '../modals/SearchPokemonModal';
import Placeholder from '../../assets/placeholder.png';

function TeamPlaceholder({teamName}) {
  const [showSearchModal, setShowSearchModal] = useState(false);

  function handleAdd() {
    setShowSearchModal((prev) => !prev);
  }

  return (
    <>
      {showSearchModal && <SearchPokemonModal teamName={teamName} setShowModal={setShowSearchModal}/>}
      {pokemon && (
        <>
          <div className="flex flex-col justify-center">
            <div
              className="flex cursor-pointer justify-center"
              onClick={(e) => handleAdd()}
            >
              <Image
                src={Placeholder}
                alt="Add a pokemon"
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

let pokemon = {
  name: 'Add a pokemon',
  types: [
    {
      type: {
        name: '???',
      },
    },
  ],
};

export default TeamPlaceholder;
