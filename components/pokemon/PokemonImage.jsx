import React from 'react';
import Image from 'next/image';

function PokemonImage({ images, width, height }) {
  let sourceImage =
    images.other['official-artwork']['front_default'] ||
    images.other.home.front_default;
  return (
    <>
      <Image
        src={sourceImage}
        alt="Image of pokemon"
        width={width}
        height={height}
      />
    </>
  );
}

export default PokemonImage;
