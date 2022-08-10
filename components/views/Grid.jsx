import React from 'react';
import GridTile from './GridTile';

function Grid({ filtered }) {
  return (
    <div className="grid grid-cols-5">
      {filtered.map((pokemon) => {
        return <GridTile key={pokemon.name} pokemon={pokemon} />;
      })}
    </div>
  );
}

export default Grid;
