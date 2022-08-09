import React from 'react'

function StatValue({stat}) {
  return (
    <>
      <div className={`col-start-3 col-end-7 text-black ${backgroundColor[stat.stat.name]}`}>
        <div className={`stat-value-bar ${barColor[stat.stat.name]}`}
        style={{
          width: `calc(100% * ${stat.base_stat} / 255`,
        }}
        >
          {" "}
          {stat.base_stat}
        </div>
      </div>
    </>
  )
}

const barColor = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-blue-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-pink-500',
}

const backgroundColor = {
  hp: 'bg-red-300',
  attack: 'bg-orange-300',
  defense: 'bg-yellow-300',
  'special-attack': 'bg-blue-300',
  'special-defense': 'bg-green-300',
  speed: 'bg-pink-300',
}

export default StatValue;