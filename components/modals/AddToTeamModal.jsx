import React, { useState } from 'react';
import Image from 'next/image';
import { useGlobalContext } from '../GlobalStore';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

function AddTeamModal({ pokemonName, setShowModal }) {
  let { teams, setTeams } = useGlobalContext();

  let options = [
    { value: 'chocolate', label: 'chocolate' },
    { value: 'strawberry', label: 'strawberry' },
    { value: 'vanilla', label: 'vanilla' },
  ];

  for (const key in teams) {
    options.push({
      value: key,
      label: key,
    });
  }

  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);

  let [selectedTeam, setSelectedTeam] = useState('');
  function hideModal(e) {
    if (e.target.id === 'background') {
      setShowModal(false);
    }
  }

  function selectingTeam(inputValue, actionMeta) {
    if (
      actionMeta.action === 'menu-close' ||
      actionMeta.action === 'input-blur'
    ) {
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

  function addTeam() {
    if (selectedTeam === null || selectedTeam === '') return;
    setTeams((prev) => {
      let obj = {
        ...prev,
      };
      if (!obj[selectedTeam]) {
        obj[selectedTeam] = [];
      }
      //can do error checking on length of array < 6
      obj[selectedTeam].push({
        name: pokemonName,
      });
      return obj;
    });
    setShowModal(false);
  }

  function handleEnter(e) {
    if (e.code === 'Enter') {
      addTeam();
    }
  }

  return (
    <div
      id="background"
      className="grid place-items-center bg-slate-800/75 mt-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen z-[1]"
      onClick={(e) => hideModal(e)}
    >
      <div className="grid place-items-center p-5 bg-slate-800/5 mt-5 backdrop-blur-sm">
        <div className="grid place-items-center">
          <div className="flex flex-col text-xl justify-center text-center">
            <div>{`Select the team `}</div>
            <div className="capitalize">{`${pokemonName}`}</div>
          </div>
          <CreatableSelect
            className="w-[20vw] text-black m-5 bg-slate-500"
            isClearable
            onChange={selectingTeam}
            onInputChange={selectingTeam}
            options={options}
            onKeyDown={(e) => handleEnter(e)}
          />
          <button
            className="rounded-full h-[10vh] w-[25vw] text-xl bg-slate-700"
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
