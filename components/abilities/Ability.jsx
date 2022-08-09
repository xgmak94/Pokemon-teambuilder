import React from 'react';
import Link from 'next/link';

function Ability({ ability }) {
  return (
    <Link href={`/abilities/${ability.ability.name}`}>
      <div className="flex flex-col items-center cursor-pointer m-1">
        <div className="capitalize">{abilityNumber(ability)}</div>
        <div className="capitalize">
          {removeHyphenAbility(ability.ability.name)}
        </div>
      </div>
    </Link>
  );
}

function removeHyphenAbility(ability) {
  return ability.split('-').join(' ');
}

function abilityNumber(ability) {
  if (ability.is_hidden) {
    return 'hidden ability';
  } else {
    return `ability`;
  }
}

export default Ability;
