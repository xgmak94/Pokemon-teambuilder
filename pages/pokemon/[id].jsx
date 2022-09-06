import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/GlobalStore';
import PokemonImage from '../../components/pokemon/PokemonImage';
import PokemonName from '../../components/pokemon/PokemonName';
import PokemonTypes from '../../components/types/PokemonTypes';
import AbilityList from '../../components/abilities/AbilityList';
import StatBreakdown from '../../components/stats/StatBreakdown';
// import Evolution from '../../components/page/evolution/Evolution';
import Forms from '../../components/forms/Forms';
import NavBar from '../../components/header/NavBar';
import ImageModal from '../../components/modals/ImageModal';
import AddToTeamModal from '../../components/modals/AddToTeamModal';
import Link from 'next/link';

function PokemonPage() {
  const { pokedex, allPokemon } = useGlobalContext();
  const router = useRouter();
  const { id } = router.query;

  const [pokemon, setPokemon] = useState(
    allPokemon[
      allPokemon.findIndex((pokemon) => pokemon.id === Number(id))
    ]
  );

  // const [evolution_chain, setEvolution_chain] = useState();
  const [imageModal, setImageModal] = useState(false);
  const [addToTeamModal, setAddToTeamModal] = useState(false);

  useEffect(() => {
    let index = allPokemon.findIndex(
      (pokemon) => pokemon.id === Number(id)
    );
    if (index !== -1) {
      setPokemon(allPokemon[index]);
    } else {
      let speciesName = pokemon.name.split('-')[0];
      pokedex
        .getPokemonByName(Number(id))
        .then((pokemonInfo) => {
          pokedex
            .getPokemonSpeciesByName(speciesName)
            .then((speciesInfo) => {
              let obj = {
                ...speciesInfo,
                ...pokemonInfo,
              };
              setPokemon(obj);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPokemon, id]);

  function handleImage() {
    setImageModal((prev) => !prev);
  }

  function handleTeam() {
    setAddToTeamModal((prev) => !prev);
  }

  function displayImageModal() {
    return (
      pokemon &&
      imageModal && (
        <ImageModal
          images={pokemon.sprites}
          width={500}
          height={500}
          setShowModal={setImageModal}
        />
      )
    );
  }

  function displayAddToTeamModal() {
    return (
      pokemon &&
      addToTeamModal && (
        <AddToTeamModal
          pokemon={pokemon}
          width={500}
          height={500}
          setShowModal={setAddToTeamModal}
        />
      )
    );
  }

  return (
    <>
      {displayImageModal()}
      {displayAddToTeamModal()}
      {pokemon && (
        <>
          <div className="flex flex-col p-2">
            {pokemon.is_default ? (
              <button
                className="flex border self-center justify-center rounded-full bg-slate-400 h-1/4 w-1/4"
                onClick={() => handleTeam()}
              >
                Add to team
              </button>
            ) : (
              <button className="flex border self-center justify-center rounded-full bg-slate-900 h-1/4 w-1/4" disabled>Cannot add to team</button>
            )}
            <div className="flex flex-col justify-center">
              <div
                className="flex cursor-zoom-in justify-center"
                onClick={() => handleImage()}
              >
                <PokemonImage
                  images={pokemon.sprites}
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <PokemonName name={pokemon.name} />
            </div>
            <PokemonTypes
              types={pokemon.types.map((type) => type.type.name)}
            />
          </div>
          <AbilityList abilities={pokemon.abilities} />
          <Forms forms={pokemon.varieties} />
          <StatBreakdown stats={pokemon.stats} />
        </>
      )}
    </>
  );
}

export default PokemonPage;
