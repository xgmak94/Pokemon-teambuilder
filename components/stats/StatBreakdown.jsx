import React from 'react'
import Stat from './stat';

function StatBreakdown({stats}) {
  return (
    <div className="grid grid-cols-12 text-lg font-bold border  border-purple-300  m-5">
      <div className="col-start-1 col-end-7 border border-black justify-center items-center">
        <div className="flex justify-center items-center">
          Stat
        </div>
      </div>
      <div className="flex flex-col col-start-7 col-end-10 border border-black justify-center items-center">
        At Level 50
      </div>
      <div className="flex flex-col col-start-10 col-end-13 border border-black justify-center items-center">
        At Level 100
      </div>
      {stats.map((stat, idx) => {
        return <Stat stat={stat} key={idx}/>
      })}
      <div className="col-start-1 capitalize">total:</div>
      <div className="col-start-3 col-end-7">{getBST(stats)}</div>
      <div className="col-start-1 text-sm col-span-10">
        <ul className="list-disc list-inside font-normal">
          <li>Minimum stats are calculated with 0 EVs, IVs of 0, and (if applicable) a hindering nature.</li>
          <li>Maximum stats are calculated with 252 EVs, IVs of 31, and (if applicable) a helpful nature.</li>
        </ul>
      </div>
    </div>
  )
}

function getBST(stats) {
  let total = 0;
  stats.forEach((stat) => {
    total += stat.base_stat;
  })
  return total;
}

export default StatBreakdown;