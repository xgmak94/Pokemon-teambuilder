import React, { useState } from 'react';
import Image from 'next/image';
import { useGlobalContext } from '../GlobalStore';
import CreatableSelect from 'react-select/creatable';

function AddTeamModal({ pokemonName, setShowModal }) {
  let options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);

  let { teams, setTeams } = useGlobalContext();

  let [selectedTeam, setSelectedTeam] = useState('');
  function hideModal(e) {
    if (e.target.id === 'background') {
      setShowModal(false);
    }
  }

  function selectingTeam(inputValue, actionMeta) {
    if(actionMeta.action === 'menu-close' || actionMeta.action === 'input-blur') {
      return;
    }

    if (actionMeta.action === 'clear') {
      setSelectedTeam(inputValue);
    } else if (typeof inputValue === 'object') {
      setSelectedTeam(inputValue.value);
    } else {
      setSelectedTeam(inputValue);
    }
  }

  function addTeam(e) {
    if (selectedTeam === null || selectedTeam === '') return;
    setTeams((prev) => {
      let obj = {
        ...prev,
      };
      if(!obj[selectedTeam]) {
        obj[selectedTeam] = [];
      }
      //can do error checking on length of array < 6
      obj[selectedTeam].push(pokemonName);
      return obj;
    });
    setShowModal(false);
  }

  return (
    <div
      className="grid fixed w-screen h-screen z-[1]"
      onClick={(e) => hideModal(e)}
    >
      <div
        id="background"
        className="grid place-items-center bg-slate-800/80"
      >
        <div className="grid place-items-center">
          <div className="flex flex-col justify-center text-center">
            <div>{`Select the team `}</div>
            <div className="capitalize">{`${pokemonName}`}</div>
          </div>
          <CreatableSelect
            className="w-[20vw] text-black m-5 bg-slate-500"
            isClearable
            onChange={selectingTeam}
            onInputChange={selectingTeam}
            options={options}
          />
          <button
            className="rounded-lg w-[10vw] bg-slate-700"
            onClick={(e) => addTeam(e)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTeamModal;
