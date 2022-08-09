import React from 'react';
import { useGlobalContext } from '../../components/GlobalStore';
import TeamName from '../../components/teams/TeamName';
import TeamComposition from '../../components/teams/TeamComposition';

function TeamPage() {
  const { teams } = useGlobalContext();

  return (
    <>
      {Object.keys(teams).map((team, idx) => {
        return (
          <div key={team}>
            <TeamName name={team} />
            <TeamComposition team={teams[team]} />
          </div>
        );
      })}
    </>
  );
}

export default TeamPage;
