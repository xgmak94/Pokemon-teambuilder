import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/GlobalStore';
import PokemonImage from '../../components/pokemon/PokemonImage';
import PokemonName from '../../components/pokemon/PokemonName';
import PokemonTypes from '../../components/types/PokemonTypes';
import TypeLabel from '../../components/types/TypeLabel';
import Grid from '../../components/views/Grid';
import Line from '../../components/views/Line';
import Link from 'next/link';

function TypePage() {
  const { view, pokedex, allPokemon, allTypes } = useGlobalContext();
  const router = useRouter();
  let { id } = router.query;
  const [filtered, setFiltered] = useState([]);

  const [type, setType] = useState(
    allTypes[allTypes.findIndex((type) => type.name === id)]
  );

  useEffect(() => {
    setType(allTypes[allTypes.findIndex((type) => type.name === id)]);

    let map = type.pokemon.map((pokemonWithType) => {
      let index = allPokemon.findIndex(
        (pokemon) => pokemon.name === pokemonWithType.pokemon.name
      );

      if (index === -1) {
        return null;
      }
      let pokemon = allPokemon[index];
      return pokemon;
    });

    let removeNull = map.filter((pokemon) => {
      return pokemon !== null;
    });

    setFiltered(removeNull);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTypes, id]);

  function filteredList() {
    if (view) {
      return <Grid filtered={filtered} />;
    } else {
      return <Line filtered={filtered} />;
    }
  }

  function doubleDamageFrom() {
    return type.damage_relations.double_damage_from.map((type) => {
      return <TypeLabel key={type.name} type={type.name} />;
    });
  }

  function doubleDamageTo() {
    return type.damage_relations.double_damage_to.map((type) => {
      return <TypeLabel key={type.name} type={type.name} />;
    });
  }

  function halfDamageFrom() {
    return type.damage_relations.half_damage_from.map((type) => {
      return <TypeLabel key={type.name} type={type.name} />;
    });
  }

  function halfDamageTo() {
    return type.damage_relations.half_damage_to.map((type) => {
      return <TypeLabel key={type.name} type={type.name} />;
    });
  }

  function immuneTo() {
    return type.damage_relations.no_damage_to.map((type) => {
      return <TypeLabel key={type.name} type={type.name} />;
    });
  }

  function immuneFrom() {
    return type.damage_relations.no_damage_from.map((type) => {
      return <TypeLabel key={type.name} type={type.name} />;
    });
  }

  return (
    <>
      {type && (
        <div className="flex flex-col">
          <div className="self-center">
            <TypeLabel type={id} />
          </div>
          <div className="flex flex-row justify-evenly w-full">
          <div className="grid grid-cols-3 grid-rows-[15%_15%_60%] h-[25vh]">
              <div className="col-start-1 col-end-4 text-center">Offensive</div>
              <div className="text-center">2x</div>
              <div className="text-center">1/2x</div>
              <div className="text-center">0x</div>
              <div className="text-center">{doubleDamageTo()}</div>
              <div className="text-center">{halfDamageTo()}</div>
              <div className="text-center">{immuneTo()}</div>
            </div>
            <div className="grid grid-cols-3 grid-rows-[15%_15%_70%] h-[25vh]">
              <div className="col-start-1 col-end-4 text-center">Defensive</div>
              <div className="text-center">2x</div>
              <div className="text-center">1/2x</div>
              <div className="text-center">0x</div>
              <div className="text-center">{doubleDamageFrom()}</div>
              <div className="text-center">{halfDamageTo()}</div>
              <div className="text-center">{immuneFrom()}</div>
            </div>
          </div>
          {filteredList()}
        </div>
      )}
    </>
  );
}

export default TypePage;
