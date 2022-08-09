import React from 'react';

function PokemonProfile({ id, name }) {
  return (
    <>
      <div className="pokemon-id">{padId(id)}</div>
      <div className="capitalize">{name}</div>
    </>
  );
}

function padId(id) {
  if(id > '905') return null;

  let paddedId = String(id);
  while (paddedId.length < 3) {
    paddedId = '0' + paddedId;
  }
  paddedId = '#' + paddedId;
  return paddedId;
}

function fixName(name) {
  let split = name.split('-');
  return split[0];
}

export default PokemonProfile;
