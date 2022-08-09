import React from 'react';
import TeamTile from './TeamTile';

function TeamComposition({ team }) {
  return (
    <div className="flex flex-row">
      {team.map((member) => {
        return <TeamTile key={member} pokemonName={member} />;
      })}
    </div>
  );
}

export default TeamComposition;
