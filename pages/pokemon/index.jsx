import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../components/GlobalStore';
import Grid from '../../components/views/Grid';
import Line from '../../components/views/Line';
import Select from 'react-select/';

function PokemonHome() {
  const { allPokemon, allTypes, view } = useGlobalContext();
  const [filtered, setFiltered] = useState(allPokemon);
  const [filters, setFilters] = useState([]);

  let options = allTypes.slice(0, 18).map((type) => {
    return {
      value: type.name,
      label: type.name[0].toUpperCase() + type.name.slice(1),
    };
  });

  useEffect(() => {
    if (filters.length === 0) {
      setFiltered(allPokemon);
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

      setFiltered(currentlyFiltered);
    }
  }, [allPokemon, allTypes, filters]);

  function handleFilter(inputValue, actionMeta) {
    let typeNames = inputValue.map((type) => {
      return type.value;
    });
    setFilters(typeNames);
  }

  function filteredList() {
    if (view) {
      return <Grid filtered={filtered} />;
    } else {
      return <Line filtered={filtered} />;
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex self-center justify-center mt-5 w-3/5 text-black text-center text-4xl">
        <Select
          className="h-1/6 w-3/5 rounded-full text-black text-center text-4xl"
          isMulti
          isOptionDisabled={() => filters.length >= 2}
          onChange={handleFilter}
          options={options}
        />
      </div>
      <div>{filteredList()}</div>
    </div>
  );
}

export default PokemonHome;
