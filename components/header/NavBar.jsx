import React from 'react';
import { useGlobalContext } from '../GlobalStore';
import Link from 'next/link';

function NavBar() {
  const { view, setView } = useGlobalContext();

  function changeView() {
    setView((prev) => !prev);
  }

  return (
    <header className="grid grid-cols-4 sticky top-0 h-auto justify-evenly bg-slate-700 z-10">
      <Link href="/">
        <div className="flex cursor-pointer border justify-center">
          Home
        </div>
      </Link>
      <Link href="/pokemon">
        <div className="flex cursor-pointer border justify-center">
          Pokemon
        </div>
      </Link>
      <Link href="/teams">
        <div className="flex cursor-pointer border justify-center">
          Team
        </div>
      </Link>
      <div
        className="flex cursor-pointer border justify-center"
        onClick={changeView}
      >
        {view ? 'Grid View' : 'List View'}
      </div>
    </header>
  );
}

export default NavBar;
