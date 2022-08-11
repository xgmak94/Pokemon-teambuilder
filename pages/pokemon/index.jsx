import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../components/GlobalStore';
import Grid from '../../components/views/Grid';
import Line from '../../components/views/Line';
import Select from 'react-select/';

function PokemonHome() {
  const { allPokemon, allTypes, view } = useGlobalContext();
  const [filtered, setFiltered] = useState(allPokemon);
  const [filters, setFilters] = useState([]);

  let options = allTypes
    .slice(0, 18)
    .map((type) => {
      return {
        value: type.name,
        label: type.name[0].toUpperCase() + type.name.slice(1),
      };
    })
    .sort((a, b) => a.value.localeCompare(b.value));

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
      <div className="flex self-center justify-center my-5 w-3/5 text-center text-4xl">
        <Select
          className="h-1/6 w-3/5 rounded-full text-center text-4xl"
          isMulti
          isOptionDisabled={() => filters.length >= 2}
          onChange={handleFilter}
          options={options}
          styles={colorStyles}
          placeholder={'Filter by type'}
        />
      </div>
      {filteredList()}
    </div>
  );
}

const colorStyles = {
  option: (styles, { data }) => {
    const color = typeColors[data.value];
    return {
      ...styles,
      backgroundColor: color,
    };
  },
  multiValue: (styles, { data }) => {
    const color = typeColors[data.value];
    return {
      ...styles,
      backgroundColor: color,
    };
  },
  multiValueLabel: (styles, { data }) => {
    const color = typeColors[data.value];
    return {
      ...styles,
      color: data.color,
    };
  },
};

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

export default PokemonHome;
