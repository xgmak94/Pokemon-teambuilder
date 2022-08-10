import React from 'react';
import LineTile from './LineTile';

function Line({ filtered }) {
  return (
    <div>
      {filtered.map((pokemon) => {
        return <LineTile key={pokemon.name} pokemon={pokemon} />;
      })}
    </div>
  );
}

export default Line;
