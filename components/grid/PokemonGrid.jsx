import react, { useState, useEffect } from 'react';
import { useGlobalContext } from '../GlobalStore';
import PokemonTile from './PokemonTile';

import React from 'react';

function PokemonGrid() {
  const { allPokemon } = useGlobalContext();

  return (
    <div className="grid grid-cols-5 w-11/12">
      {allPokemon.map((pokemon, idx) => {
        return <PokemonTile key={idx} pokemon={pokemon} />;
      })}
    </div>
  );
}

export default PokemonGrid;
