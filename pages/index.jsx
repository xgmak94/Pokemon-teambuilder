import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalStore.jsx';
import Grid from '../components/views/Grid';
import Line from '../components/views/Line';

function Home() {
  const { allPokemon, view } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (search.length >= 2) {
      setFiltered(
        allPokemon.filter((pokemon) => {
          return pokemon.name.includes(search);
        })
      );
    } else {
      setFiltered([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPokemon, search, view]);

  function handleChange(e) {
    setSearch(e.target.value);
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
      <div className="flex justify-center mt-5">
        <input
          className="h-1/6 w-3/5 rounded-full text-center text-4xl"
          type="text"
          placeholder="Search for a pokemon..."
          onChange={(e) => handleChange(e)}
        />
      </div>
      {filteredList()}
    </div>
  );
}

export default Home;
