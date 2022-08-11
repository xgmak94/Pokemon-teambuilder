import React from 'react';
import TeamTile from './TeamTile';
import TeamPlaceholder from './TeamPlaceholder';

function TeamComposition({ teamName, teamMembers }) {
  return (
    <div className="grid grid-cols-6">
      {teamMembers.map((member, idx) => {
        return <TeamTile key={`member${idx}`} idx={idx} teamName={teamName} pokemonName={member.name} />;
      })}
      {teamMembers.length < 6 ? (
        <TeamPlaceholder teamName={teamName} />
      ) : null}
    </div>
  );
}

export default TeamComposition;
