import React from 'react';
import Image from 'next/image';
import PokemonGrid from '../grid/PokemonGrid';
import { useGlobalContext } from '../GlobalStore';
import Link from 'next/link';
import PokemonTypes from '../types/PokemonTypes';
import PokemonProfile from '../pokemon/PokemonProfile';
import PokemonImage from '../pokemon/PokemonImage';

function SearchPokemonModal({ teamName, setShowModal }) {
  const { allPokemon, teams, setTeams } = useGlobalContext();

  function hideModal(e) {
    if (e.target.id === 'background') {
      setShowModal(false);
    }
  }

  function handleClick(e, pokemonName) {
    console.log('clicked', pokemonName, ` for team ${teamName}`);
    setTeams((prev) => {
      let obj = {
        ...prev,
      }
      obj[teamName].push(pokemonName);
      return obj;
    });
    setShowModal(false);
  }

  return (
    <div
      className="grid fixed top-0 left-0 w-screen h-screen z-[2]"
      onClick={(e) => hideModal(e)}
    >
      <div
        id="background"
        className="grid place-items-center bg-slate-800/90 z-[1] overflow-auto p-5"
      >
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-5 w-11/12">
            {allPokemon.map((pokemon) => {
              return (
                <div key={pokemon}>
                  {' '}
                  <div className="text-sm flex flex-col p-2.5 items-center justify-center">
                    <div
                      className="text-sm flex flex-col p-2.5 items-center justify-center cursor-pointer"
                      onClick={(e) => handleClick(e, pokemon.name)}
                    >
                      <PokemonImage
                        images={pokemon.sprites}
                        width={100}
                        height={100}
                      />
                    </div>
                    <PokemonProfile
                      name={pokemon.name}
                      id={pokemon.id}
                    />
                    <PokemonTypes
                      types={pokemon.types.map(
                        (type) => type.type.name
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPokemonModal;
