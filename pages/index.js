import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../components/GlobalStore.jsx';
import PokemonTile from '../components/grid/PokemonTile.jsx';
import SearchTile from '../components/search/SearchTile.jsx';

function Home() {
  const { allPokemon } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [view, setView] = useState(false);

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
  }, [search, view]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleView() {
    setView((prev) => !prev);
  }

  function filteredList() {
    let info = filtered.map((pokemon) => {
      if (view) {
        return <PokemonTile key={pokemon.name} pokemon={pokemon} />;
      } else {
        return <SearchTile key={pokemon.name} pokemon={pokemon} />;
      }
    });

    if (view) {
      return <div className="grid grid-cols-3">{info}</div>;
    } else {
      return <div>{info}</div>;
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <button
        className="rounded-full bg-slate-500"
        onClick={handleView}
      >
        Change view
      </button>
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
