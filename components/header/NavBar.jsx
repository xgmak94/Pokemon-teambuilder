import React from 'react'
import { useRouter } from 'next/router';

function NavBar() {
  const router = useRouter();

  return (
    <header className="grid grid-cols-3 sticky top-0 h-auto justify-evenly bg-slate-700 z-10">
      <div className="flex cursor-pointer border justify-center" onClick={() => router.push('/')}>
        Home
      </div>
      <div className="flex cursor-pointer border justify-center" onClick={() => router.push('/pokemon')}>
        Pokemon
      </div>
      <div className="flex cursor-pointer border justify-center" onClick={() => router.push('/teams')}>
        Team
      </div>
    </header>
  )
}

export default NavBar;