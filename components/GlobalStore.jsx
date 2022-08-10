import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Pokedex from 'pokedex-promise-v2';

export const GlobalContext = React.createContext();

export function useGlobalContext() {
  return React.useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [allAbilities, setAllAbilities] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [teams, setTeams] = useState({
    start: [
      'charizard',
      'venusaur',
      'bulbasaur',
      'charmander',
      'charmeleon',
      'ivysaur',
    ],
    yes: ['venusaur'],
    no: [
      'charizard',
      'charmander',
      'charmander',
      'charmander',
      'charmander',
    ],
    maybe: [
      'charizard',
      'charmander',
      'charmander',
      'charmander',
      'charmander',
    ],
    iono: [
      'charizard',
      'charmander',
      'charmander',
      'charmander',
      'charmander',
    ],
  });

  useEffect(() => {
    async function getAllPokemon() {
      //151 898
      let results = await axios.get('http://localhost:3000/pokemon', {
        params: { limit: 898 },
      });
      setAllPokemon(results.data);
    }

    async function getAllAbilities() {
      let results = await axios.get(
        'http://localhost:3000/abilities'
      );
      setAllAbilities(results.data);
    }

    async function getAllTypes() {
      let results = await axios.get('http://localhost:3000/types');
      setAllTypes(results.data);
    }

    getAllPokemon();
    getAllAbilities();
    getAllTypes();
  }, []);

  const value = useMemo(() => {
    const pokedex = new Pokedex();
    return {
      allPokemon,
      setAllPokemon,
      allAbilities,
      setAllAbilities,
      allTypes,
      setAllTypes,
      teams,
      setTeams,
      pokedex,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
  }, [allPokemon, allAbilities, allTypes, teams]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
