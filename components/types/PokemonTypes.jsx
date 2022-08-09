import react from 'react';
import TypeLabel from './TypeLabel';

function PokemonTypes({ types }) {
  return (
    <>
      <div className="flex justify-center">
        {types.map((type, idx) => {
          return <TypeLabel key={idx} type={type} />;
        })}
      </div>
    </>
  );
}

export default PokemonTypes;
