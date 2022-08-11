import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Pokedex from 'pokedex-promise-v2';

const SERVER_URL = 'http://localhost:3000';

export const GlobalContext = React.createContext();

export function useGlobalContext() {
  return React.useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [view, setView] = useState(false);
  const [allPokemon, setAllPokemon] = useState([]);
  const [allAbilities, setAllAbilities] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [teams, setTeams] = useState({
    test: [
      {
        name: 'charizard',
        moves: ['Cut', 'Cut', 'Cut', 'Cut'],
      },
      {
        name: 'venusaur',
        moves: ['Cut', 'Cut', 'Cut', 'Cut'],
      },
      {
        name: 'mewtwo',
      },
      {
        name: 'mew',
      },
    ],
  });

  useEffect(() => {
    async function getAllPokemon() {
      //151 898
      let results = await axios.get(`${SERVER_URL}/pokemon`, {
        params: { limit: 898 },
      });
      setAllPokemon(results.data);
    }

    async function getAllAbilities() {
      let results = await axios.get(`${SERVER_URL}/abilities`);
      setAllAbilities(results.data);
    }

    async function getAllTypes() {
      let results = await axios.get(`${SERVER_URL}/types`);
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
      view,
      setView,
      pokedex,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
  }, [allPokemon, allAbilities, allTypes, teams, view]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
