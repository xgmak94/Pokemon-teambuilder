import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../components/GlobalStore';
import TeamName from '../../components/teams/TeamName';
import TeamComposition from '../../components/teams/TeamComposition';
import NewTeamModal from '../../components/modals/NewTeamModal';

function TeamPage() {
  const { teams } = useGlobalContext();
  const [showNewTeamModal, setShowNewTeamModal] = useState(false);
  useEffect(() => {}, [teams]);

  function addTeam(e) {
    setShowNewTeamModal(true);
  }

  return (
    <>
      <div className="mt-5">
        {showNewTeamModal ? (
          <NewTeamModal setShowModal={setShowNewTeamModal}/>
        ) : (
          <button
            className="fixed grid bottom-[5%] right-[5%] w-[100px] h-[100px] text-7xl rounded-full bg-zinc-600 z-[1]"
            onClick={(e) => addTeam(e)}
          >
            &#43;
          </button>
        )}
        {teams && Object.keys(teams).map((team, idx) => {
          return (
            <div key={team} className="m-5">
              <TeamName name={team} />
              <TeamComposition
                teamName={team}
                teamMembers={teams[team]}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TeamPage;
