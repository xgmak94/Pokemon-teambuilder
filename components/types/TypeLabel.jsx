import React from 'react';
import Link from 'next/link';

function TypeLabel({ type }) {
  return (
    <>
      {type === '???' ? null : (
        <Link href={`/types/${type}`}>
          <div
            className="flex text-[18px] hover:text-[24px] justify-center rounded-full w-20 h-6 capitalize font-bold m-[2px] cursor-pointer"
            style={{
              backgroundColor: typeColors[type],
            }}
          >
            {type}
          </div>
        </Link>
      )}
    </>
  );
}

let typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  fighting: '#C03028',
  water: '#6890F0',
  flying: '#A890F0',
  grass: '#78C850',
  poison: '#A040A0',
  electric: '#F8D030',
  ground: '#E0C068',
  psychic: '#F85888',
  rock: '#B8A038',
  ice: '#98D8D8',
  bug: '#A8B820',
  dragon: '#7038F8',
  ghost: '#705898',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  '???': '#68A090',
};

export default TypeLabel;