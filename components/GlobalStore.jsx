import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Pokedex from 'pokedex-promise-v2';

const SERVER_URL = 'http://localhost:3001';
const NUM_POKEMON = 898; //151 || 898

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
        moves: ['Flamethrower', 'Focus Blast', 'Solar Beam', 'Roost'],
      },
      {
        name: 'mewtwo',
        moves: ['Psystrike', 'Ice Beam', 'Fire Blast', 'Calm Mind'],
      },
      {
        name: 'ditto',
        moves: ['Transform'],
      },
      {
        name: 'gyarados',
        moves: ['Dragon Dance', 'Bounce', 'Waterfall', 'Earthquake'],
      },
    ],
  });

  useEffect(() => {
    async function getAllPokemon() {
      let results = await axios.get(`${SERVER_URL}/pokemon`, {
        params: { limit: NUM_POKEMON },
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
