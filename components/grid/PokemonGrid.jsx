import react, { useState, useEffect } from 'react';
import { useGlobalContext } from '../GlobalStore';
import PokemonTile from './PokemonTile';
import Select from 'react-select/';

import React from 'react';

function PokemonGrid() {
  const { allPokemon, allTypes } = useGlobalContext();
  const [filteredPokemon, setFilteredPokemon] = useState(allPokemon);
  const [filters, setFilters] = useState([]);

  let options = allTypes.slice(0, 18).map((type) => {
    if (type.name === 'shadow' || type.name === 'unknown') return;
    return {
      value: type.name,
      label: type.name[0].toUpperCase() + type.name.slice(1),
    };
  });

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredPokemon(allPokemon);
    } else {
      let currentlyFiltered = [...allPokemon];

      filters.forEach((filter) => {
        let typePokemon = allTypes[
          allTypes.findIndex((type) => {
            return type.name === filter;
          })
        ].pokemon.map((pokemon) => {
          return pokemon.pokemon.name;
        });

        currentlyFiltered = currentlyFiltered.filter((pokemon) => {
          return typePokemon.includes(pokemon.name);
        });
      });

      setFilteredPokemon(currentlyFiltered);
    }
  }, [allPokemon, filters]);

  function handleSearch(inputValue, actionMeta) {
    let typeNames = inputValue.map((type) => {
      return type.value;
    })
    setFilters(typeNames);
  }

  return (
    <>
      <Select
        className="react-select w-[50vw] text-black m-5"
        isMulti
        closeMenuOnSelect={false}
        onChange={handleSearch}
        options={options}
      />
      <div className="grid grid-cols-5 w-11/12">
        {filteredPokemon.map((pokemon, idx) => {
          return <PokemonTile key={idx} pokemon={pokemon} />;
        })}
      </div>
    </>
  );
}

export default PokemonGrid;
