import React, { useState } from 'react';
import { useGlobalContext } from '../GlobalStore';
import PokemonProfile from '../pokemon/PokemonProfile';
import PokemonImage from '../pokemon/PokemonImage';
import PokemonTypes from '../types/PokemonTypes';
import Select from 'react-select';

function EditPokemonModal({ setShowModal, teamName, idx, pokemon }) {
  const { teams, setTeams } = useGlobalContext();
  let options = pokemon.moves
    .map((move) => {
      let moveName = move.move.name;
      moveName = moveName.split('-');
      for (let i = 0; i < moveName.length; i++) {
        moveName[i] =
          moveName[i][0].toUpperCase() + moveName[i].slice(1);
      }

      moveName = moveName.join(' ');
      return {
        value: moveName,
        label: moveName,
      };
    })
    .sort((a, b) => a.value.localeCompare(b.value));

  const [moves, setMoves] = useState(teams[teamName][idx].moves);

  function hideModal(e) {
    if (e.target.id === 'background') {
      setShowModal(false);
    }
  }

  function changeMoves(inputValue, actionMeta, slot) {
    setMoves((prev) => {
      let arr = prev || [];
      arr[slot] = inputValue.value;
      return arr;
    });
  }

  function submit() {
    setTeams((prev) => {
      let obj = {
        ...prev,
      };
      obj[teamName][idx] = {
        ...obj[teamName][idx],
        moves: moves,
      };
      return obj;
    });
    setShowModal(false);
  }

  return (
    <div
      id="background"
      className="grid place-items-center bg-slate-800/75 mt-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen z-[1]"
      onClick={(e) => hideModal(e)}
    >
      <div className="grid place-items-center p-5 bg-slate-800/5 mt-5 backdrop-blur-sm">
        <PokemonImage
          images={pokemon.sprites}
          width={200}
          height={200}
        />
        <PokemonTypes
          types={pokemon.types.map((type) => type.type.name)}
        />
        <div>Ability</div>
        <div>
          <Select
            defaultValue={
              moves === undefined || moves[0] === undefined
                ? null
                : { value: moves[0], label: moves[0] }
            }
            className={selectStyle}
            options={options}
            menuPlacement="top"
            onChange={(inputValue, actionMeta) =>
              changeMoves(inputValue, actionMeta, 0)
            }
          />
          <Select
            defaultValue={
              moves === undefined || moves[1] === undefined
                ? null
                : { value: moves[1], label: moves[1] }
            }
            className={selectStyle}
            options={options}
            menuPlacement="top"
            onChange={(inputValue, actionMeta) =>
              changeMoves(inputValue, actionMeta, 1)
            }
          />{' '}
          <Select
            defaultValue={
              moves === undefined || moves[2] === undefined
                ? null
                : { value: moves[2], label: moves[2] }
            }
            className={selectStyle}
            options={options}
            menuPlacement="top"
            onChange={(inputValue, actionMeta) =>
              changeMoves(inputValue, actionMeta, 2)
            }
          />{' '}
          <Select
            defaultValue={
              moves === undefined || moves[3] === undefined
                ? null
                : { value: moves[3], label: moves[3] }
            }
            className={selectStyle}
            options={options}
            menuPlacement="top"
            onChange={(inputValue, actionMeta) =>
              changeMoves(inputValue, actionMeta, 3)
            }
          />
        </div>
        <button
          className="rounded-full h-[10vh] w-[25vw] text-xl bg-slate-700"
          onClick={submit}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

const selectStyle = 'w-[20vw] text-black m-5 bg-slate-500';

export default EditPokemonModal;
