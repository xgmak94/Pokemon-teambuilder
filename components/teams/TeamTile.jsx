import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../GlobalStore';
import PokemonImage from '../../components/pokemon/PokemonImage';
import PokemonName from '../../components/pokemon/PokemonName';
import PokemonTypes from '../../components/types/PokemonTypes';
import Link from 'next/link';

function TeamTile({ pokemonName }) {
  const { allPokemon } = useGlobalContext();

  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    let idx = allPokemon.findIndex((poke) => {
      return poke.name === pokemonName;
    });
    console.log(idx);
    setPokemon(allPokemon[idx]);
  }, []);

  console.log(pokemon);
  return (
    <>
      {pokemon && (
        <>
          <div className="flex flex-col justify-center">
            <Link href={`../pokemon/${pokemon.id}`}>
              <div className="flex cursor-pointer justify-center">
                <PokemonImage
                  images={pokemon.sprites}
                  width={200}
                  height={200}
                />
              </div>
            </Link>
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
