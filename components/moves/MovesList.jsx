import React, { useState } from 'react';

function MovesList({ teamName, idx, pokemon }) {
  const [moves, setMoves] = useState(teams[teamName][idx].moves);
  let options = pokemon.moves
    .map((move) => {
      let moveName = move.move.name;
      moveName = moveName.split('-');
      for (let i = 0; i < moveName.length; i++) {
        moveName[i] =
          moveName[i][0].toUpperCase() + moveName[i].slice(1);
      }

      moveName = moveName.join(' ');
      return {
        value: moveName,
        label: moveName,
      };
    })
    .sort((a, b) => a.value.localeCompare(b.value));
  return <div>MovesList</div>;
}

export default MovesList;
