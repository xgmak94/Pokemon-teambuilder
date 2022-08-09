import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/GlobalStore';
import PokemonImage from '../../components/pokemon/PokemonImage';
import PokemonName from '../../components/pokemon/PokemonName';
import PokemonTypes from '../../components/types/PokemonTypes';
import TypeLabel from '../../components/types/TypeLabel';
import Link from 'next/link';

function TypePage() {
  const { pokedex, allPokemon, allTypes } = useGlobalContext();
  const router = useRouter();
  let { id } = router.query;

  const [type, setType] = useState(
    allTypes[allTypes.findIndex((type) => type.name === id)]
  );

  useEffect(() => {
    setType(allTypes[allTypes.findIndex((type) => type.name === id)]);
  }, [allTypes, id]);

  function getPokemonWithType() {
    let grid = type.pokemon.map((pokemonWithType) => {
      let index = allPokemon.findIndex(
        (pokemon) => pokemon.name === pokemonWithType.pokemon.name
      );

      if (index === -1) {
        return null;
      }
      let pokemon = allPokemon[index];
      return (
        <div key={pokemon.name} className="flex flex-col p-2">
          <div className="flex flex-col justify-center">
            <Link href={`../pokemon/${pokemon.id}`}>
              <div className="flex cursor-pointer justify-center">
                <PokemonImage
                  images={pokemon.sprites}
                  width={200}
                  height={200}
                />
              </div>
            </Link>
          </div>
          <div className="flex flex-row justify-center">
            <PokemonName name={pokemon.name} />
          </div>
          <PokemonTypes
            types={pokemon.types.map((type) => type.type.name)}
          />
        </div>
      );
    });
    return <div className="grid grid-cols-5 w-11/12">{grid}</div>;
  }

  return (
    <>
      {type && (
        <div className="flex flex-col items-center">
          <TypeLabel type={id} />
          <div className="flex flex-row justify-evenly w-full">
            <div>Effective</div>
            <div>Weakness</div>
          </div>
          <div>{getPokemonWithType()}</div>
        </div>
      )}
    </>
  );
}

export default TypePage;
