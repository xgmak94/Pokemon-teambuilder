import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/GlobalStore';
import PokemonImage from '../../components/pokemon/PokemonImage';
import PokemonName from '../../components/pokemon/PokemonName';
import PokemonTypes from '../../components/types/PokemonTypes';
import Link from 'next/link';

function AbilityPage() {
  const { pokedex, allPokemon, allAbilities } = useGlobalContext();
  const router = useRouter();
  const { id } = router.query;
  const [ability, setAbility] = useState(
    allAbilities[
      allAbilities.findIndex((ability) => ability.name === id)
    ]
  );

  useEffect(() => {
    setAbility(
      allAbilities[
        allAbilities.findIndex((ability) => ability.name === id)
      ]
    );
  }, [allAbilities, id]);

  function getPokemonWithAbility() {
    let grid = ability.pokemon.map((pokemonWithAbility) => {
      let index = allPokemon.findIndex(
        (pokemon) => pokemon.name === pokemonWithAbility.pokemon.name
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
      {ability && (
        <div className="flex flex-col items-center">
          <div className="capitalize text-lg font-bold">
            {ability.name.split('-').join(' ')}
          </div>
          <div>
            {ability.effect_entries.map((entry) => {
              if (entry.language.name === 'en') {
                return <div key={entry.effect}>{entry.effect}</div>;
              }
            })}
          </div>
          <div>{getPokemonWithAbility()}</div>
        </div>
      )}
    </>
  );
}

export default AbilityPage;
