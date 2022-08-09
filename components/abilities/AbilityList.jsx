import React from 'react';
import Ability from './Ability';

function AbilityList({ abilities }) {
  return (
    <span className="flex flex-row justify-evenly">
      {abilities.map((ability, idx) => {
        return <Ability ability={ability} key={idx} />;
      })}
    </span>
  );
}

export default AbilityList;
