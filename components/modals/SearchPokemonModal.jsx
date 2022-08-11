import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGlobalContext } from '../GlobalStore';
import PokemonImage from '../pokemon/PokemonImage';
import PokemonProfile from '../pokemon/PokemonProfile';
import PokemonTypes from '../types/PokemonTypes';
import Line from '../../components/views/Line';
import Link from 'next/link';
import Select from 'react-select/';

function SearchPokemonModal({ teamName, setShowModal }) {
  const { allPokemon, allTypes, teams, setTeams, view } =
    useGlobalContext();

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

  function hideModal(e) {
    if (e.target.id === 'background') {
      setShowModal(false);
    }
  }

  function handleFilter(inputValue, actionMeta) {
    let typeNames = inputValue.map((type) => {
      return type.value;
    });
    setFilters(typeNames);
  }

  function handleClick(e, pokemonName) {
    setTeams((prev) => {
      let obj = {
        ...prev,
      };
      obj[teamName].push({
        name: pokemonName,
        moves: [],
      });
      return obj;
    });
    setShowModal(false);
  }

  function filteredList() {
    if (view) {
      return (
        <div className="grid grid-cols-5">
          {filtered.map((pokemon) => {
            return (
              <div
                key={pokemon.name}
                className="text-sm flex flex-col p-2.5 items-center justify-center"
              >
                <div
                  className="text-sm flex flex-col p-2.5 items-center justify-center cursor-pointer"
                  onClick={(e) => handleClick(e, pokemon.name)}
                >
                  <PokemonImage
                    images={pokemon.sprites}
                    width={100}
                    height={100}
                  />
                </div>
                <PokemonProfile name={pokemon.name} id={pokemon.id} />
                <PokemonTypes
                  types={pokemon.types.map((type) => type.type.name)}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          {filtered.map((pokemon) => {
            return (
              <span key={pokemon.name} className="grid grid-cols-4">
                <div>{padId(pokemon.id)}</div>
                <div
                  className="text-sm flex flex-col items-center justify-center cursor-pointer"
                  onClick={(e) => handleClick(e, pokemon.name)}
                >
                  <PokemonImage
                    images={pokemon.sprites}
                    width={50}
                    height={50}
                  />
                </div>
                <div
                  className="capitalize cursor-pointer"
                  onClick={(e) => handleClick(e, pokemon.name)}
                >
                  {pokemon.name}
                </div>
                <span>
                  <PokemonTypes
                    types={pokemon.types.map(
                      (type) => type.type.name
                    )}
                  />
                </span>
              </span>
            );
          })}
        </div>
      );
    }
  }

  return (
    <div
      className="grid fixed top-0 left-0 w-screen h-screen z-[2]"
      onClick={(e) => hideModal(e)}
    >
      <div
        id="background"
        className="grid place-items-center bg-slate-800/75 z-[1] overflow-auto p-5 backdrop-blur-sm"
      >
        <div className="flex justify-center my-5 w-3/5 text-center text-4xl">
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
        <div>{filteredList()}</div>
      </div>
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

function padId(id) {
  if (id > '905') return null;

  let paddedId = String(id);
  while (paddedId.length < 3) {
    paddedId = '0' + paddedId;
  }
  paddedId = '#' + paddedId;
  return paddedId;
}

export default SearchPokemonModal;
