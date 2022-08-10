import React from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../GlobalStore';

function NavBar() {
  const router = useRouter();
  const { view, setView } = useGlobalContext();

  function changeView() {
    setView(prev => !prev);
  }

  return (
    <header className="grid grid-cols-4 sticky top-0 h-auto justify-evenly bg-slate-700 z-10">
      <div
        className="flex cursor-pointer border justify-center"
        onClick={() => router.push('/')}
      >
        Home
      </div>
      <div
        className="flex cursor-pointer border justify-center"
        onClick={() => router.push('/pokemon')}
      >
        Pokemon
      </div>
      <div
        className="flex cursor-pointer border justify-center"
        onClick={() => router.push('/teams')}
      >
        Team
      </div>
      <div className="flex cursor-pointer border justify-center" onClick={changeView}>
        Change View
      </div>
    </header>
  );
}

export default NavBar;
