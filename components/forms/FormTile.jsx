import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../GlobalStore';
import PokemonImage from '../pokemon/PokemonImage';
import PokemonTypes from '../types/PokemonTypes';
import Link from 'next/link';

function FormTile({ formInfo }) {
  const { pokedex } = useGlobalContext();
  let id = getId(formInfo);

  let [pokemon, setPokemon] = useState();

  useEffect(() => {
    pokedex
      .getPokemonByName(id)
      .then((results) => {
        setPokemon(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, pokedex]);

  return (
    <div className="flex flex-col items-center m-5">
      <div className="capitalize">{formInfo.name}</div>
      {pokemon &&
      (
        <>
          <Link href={`/pokemon/${pokemon.id}`}>
            <div className="cursor-pointer">
              <PokemonImage images={pokemon.sprites} width={200} height={200} />
            </div>
          </Link>
          <PokemonTypes types={pokemon.types.map((type) => type.type.name)} />
        </>
      )}
    </div>
  );
}

function getId(formInfo) {
  let split = formInfo.url.split('/');
  return split[split.length - 2];
}

export default FormTile;
