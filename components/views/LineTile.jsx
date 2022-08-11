import React from 'react';
import PokemonImage from '../pokemon/PokemonImage';
import PokemonTypes from '../types/PokemonTypes';
import Link from 'next/link';

function LineTile({ pokemon }) {
  return (
    <span className="grid grid-cols-4 place-items-center ">
      <div>{padId(pokemon.id)}</div>
      <Link href={`/pokemon/${pokemon.id}`}>
        <div className="text-sm flex flex-col items-center justify-center cursor-pointer">
          <PokemonImage
            images={pokemon.sprites}
            width={50}
            height={50}
          />
        </div>
      </Link>
      <Link href={`/pokemon/${pokemon.id}`}>
        <div className="capitalize cursor-pointer">
          {pokemon.name}
        </div>
      </Link>
      <span>
        <PokemonTypes
          types={pokemon.types.map((type) => type.type.name)}
        />
      </span>
    </span>
  );
}

function padId(id) {
  if (id > '905') return null;

  let paddedId = String(id);
  while (paddedId.length < 3) {
    paddedId = '0' + paddedId;
  }
  paddedId = '#' + paddedId;
  return paddedId;
}

export default LineTile;
