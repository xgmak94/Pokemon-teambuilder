import React, { useState } from 'react';
import { useGlobalContext } from '../GlobalStore';

function NewTeamModal({ setShowModal }) {
  const { teams, setTeams } = useGlobalContext();

  const [teamName, setTeamName] = useState('');

  const [submit, setSubmit] = useState(false);

  function hideModal(e) {
    if (e.target.id === 'background') {
      setShowModal(false);
    }
  }

  function handleChange(e) {
    setTeamName(e.target.value);
  }

  function handleSubmit() {
    if (teamName === '') return;
    setTeams((prev) => {
      let obj = {
        ...prev,
      };
      obj[teamName] = [];
      return obj;
    });
    setShowModal(false);
  }

  function handleEnter(e) {
    if (e.code === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div
    id="background"
    className="grid place-items-center bg-slate-800/75 mt-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen z-[1]"
      onClick={(e) => hideModal(e)}
    >
      <div
        className="grid place-items-center p-5 bg-slate-800/5 mt-5 backdrop-blur-sm"
        >
        <div className="grid place-items-center">
          <div className="flex flex-col justify-center mt-5">
            <input
              className="h-1/6 rounded-full text-center text-4xl m-5"
              type="text"
              placeholder="Enter new team name"
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleEnter(e)}
            />
          </div>
          <button
            className="rounded-full h-[10vh] w-[25vw] text-xl bg-slate-700"
            onClick={(e) => handleSubmit(e)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTeamModal;
