import React, { useEffect } from 'react';
import { useGlobalContext } from '../../components/GlobalStore';
import TeamName from '../../components/teams/TeamName';
import TeamComposition from '../../components/teams/TeamComposition';

function TeamPage() {
  const { teams } = useGlobalContext();

  useEffect(() => {}, [teams]);

  return (
    <div className="mt-5">
      <div>
        <button className="bg-cyan-600">Add new team</button>
      </div>
      {Object.keys(teams).map((team, idx) => {
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
  );
}

export default TeamPage;
