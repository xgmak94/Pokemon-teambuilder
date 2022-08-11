import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/GlobalStore';
import PokemonImage from '../../components/pokemon/PokemonImage';
import PokemonName from '../../components/pokemon/PokemonName';
import PokemonTypes from '../../components/types/PokemonTypes';
import Grid from '../../components/views/Grid';
import Line from '../../components/views/Line';
import Link from 'next/link';

function AbilityPage() {
  const { view, allPokemon, allAbilities } = useGlobalContext();
  const router = useRouter();
  const { id } = router.query;
  const [ability, setAbility] = useState(
    allAbilities[
      allAbilities.findIndex((ability) => ability.name === id)
    ]
  );
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setAbility(
      allAbilities[
        allAbilities.findIndex((ability) => ability.name === id)
      ]
    );
    let allWithAbility = ability.pokemon
      .map((pokemonWithAbility) => {
        let index = allPokemon.findIndex(
          (pokemon) =>
            pokemon.name === pokemonWithAbility.pokemon.name
        );

        if (index === -1) {
          return null;
        }
        let pokemon = allPokemon[index];
        return pokemon;
      })
      .filter((pokemon) => {
        return pokemon !== null;
      });

    setFiltered(allWithAbility);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAbilities, id]);

  function filteredList() {
    if (view) {
      return <Grid filtered={filtered} />;
    } else {
      return <Line filtered={filtered} />;
    }
  }

  return (
    <>
      {ability && (
        <div className="flex flex-col">
          <div className="capitalize self-center text-lg font-bold">
            {ability.name.split('-').join(' ')}
          </div>
          <div className="p-5">
            {ability.effect_entries.map((entry) => {
              if (entry.language.name === 'en') {
                return <div key={entry.effect}>{entry.effect}</div>;
              }
            })}
          </div>
          <div>{filteredList()}</div>
        </div>
      )}
    </>
  );
}

export default AbilityPage;
