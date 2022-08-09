import React from 'react';
import StatValue from './StatValue';
import StatName from './StatName';
import StatLevel from './StatLevel';

function Stat({ stat }) {
  return (
    <>
      <StatName name={stat.stat.name} />
      <StatValue stat={stat} />
      <StatLevel stat={stat}/>
    </>
  );
}

const backgroundColor = {
  hp: 'bg-red-400',
  attack: 'bg-orange-400',
  defense: 'bg-yellow-400',
  'special-attack': 'bg-blue-400',
  'special-defense': 'bg-green-400',
  speed: 'bg-pink-400',
};

function shortenStatName(name) {
  let arr = name.split('-');
  if (arr[0] === 'special') {
    arr[0] = 'sp.';
    if (arr[1] === 'attack') {
      arr[1] = 'atk';
    } else if (arr[1] === 'defense') {
      arr[1] = 'def';
    }
  }
  return arr.join(' ');
}

export default Stat;
