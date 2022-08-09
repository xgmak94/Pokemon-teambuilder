import React, { useState, useEffect } from 'react';

export default function Home() {
  return (
    <div>
      <div className="flex justify-center">
        <input
          className="h-1/6 w-3/5 rounded-full text-center text-4xl"
          type="text"
          placeholder="Search for a pokemon..."
        />
      </div>
    </div>
  );
}
