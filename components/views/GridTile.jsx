import React from 'react';
import PokemonImage from '../pokemon/PokemonImage';
import PokemonProfile from '../pokemon/PokemonProfile';
import PokemonTypes from '../types/PokemonTypes';
import Link from 'next/link';

function GridTile({ pokemon }) {
  return (
    <div className="text-sm flex flex-col p-2.5 items-center justify-center">
      <Link href={`/pokemon/${pokemon.id}`}>
        <div className="text-sm flex flex-col p-2.5 items-center justify-center cursor-pointer">
          <PokemonImage
            images={pokemon.sprites}
            width={100}
            height={100}
          />
        </div>
      </Link>
      <PokemonProfile name={pokemon.name} id={pokemon.id} />
      <PokemonTypes
        types={pokemon.types.map((type) => type.type.name)}
      />
    </div>
  );
}

export default GridTile;
