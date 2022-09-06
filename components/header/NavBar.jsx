import React from 'react';
import { useGlobalContext } from '../GlobalStore';
import Link from 'next/link';

function NavBar() {
  const { view, setView } = useGlobalContext();

  function changeView() {
    setView((prev) => !prev);
  }

  return (
    <>
      <header className="grid grid-cols-4 sticky top-0 h-auto justify-evenly bg-slate-700 z-10">
        <Link href="/">
          <div className="flex cursor-pointer border justify-center items-center">
            Home
          </div>
        </Link>
        <Link href="/pokemon">
          <div className="flex cursor-pointer border justify-center items-center">
            Pokemon
          </div>
        </Link>
        <Link href="/teams">
          <div className="flex cursor-pointer border justify-center items-center">
            Team
          </div>
        </Link>
        <div
          className="flex cursor-pointer border justify-center items-center"
          onClick={changeView}
        >
          {view ? 'Grid View' : 'List View'}
        </div>
      </header>
      <div>
        <audio
          src="http://soundfxcenter.com/music/television-theme-songs/8d82b5_Pokemon_Theme_Song.mp3"
          controls
          loop
          muted
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
}

export default NavBar;
