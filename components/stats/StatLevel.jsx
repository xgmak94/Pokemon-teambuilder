import React from 'react';

function StatLevel({ stat }) {
  return (
    <>
      <div className="flex col-start-7 col-end-10 font-normal justify-center">
        {calcLevel(stat, 50)}
      </div>
      <div className="flex col-start-10 col-end-13 font-normal justify-center">
        {calcLevel(stat, 100)}
      </div>
    </>
  );
}

function calcLevel(stat, level) {
  let min = 1;
  let max = 1;
  if (stat.stat.name === 'hp') {
    if (stat.base_stat !== 1) {
      max =
        Math.floor(
          0.01 *
            (2 * stat.base_stat + 31 + Math.floor(0.25 * 252)) *
            level
        ) +
        level +
        10;
      min =
        Math.floor(
          0.01 *
            (2 * stat.base_stat + 0 + Math.floor(0.25 * 0)) *
            level
        ) +
        level +
        10;
    }
  } else {
    max = Math.floor(
      (Math.floor(
        0.01 *
          (2 * stat.base_stat + 31 + Math.floor(0.25 * 252)) *
          level
      ) +
        5) *
        1.1
    );
    min = Math.floor(
      (Math.floor(
        0.01 * (2 * stat.base_stat + 0 + Math.floor(0.25 * 0)) * level
      ) +
        5) *
        0.9
    );
  }
  return `${min}-${max}`;
}

export default StatLevel;
