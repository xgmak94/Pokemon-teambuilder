import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../components/GlobalStore';
import PokemonGrid from '../../components/grid/PokemonGrid';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <PokemonGrid />
    </div>
  );
}
