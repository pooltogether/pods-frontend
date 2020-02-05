import React from 'react'

export function Item({ label, value }) { 
  return <div
    className={'mb-2 sm:mr-6 w-full sm:w-1/2'}
  >
    <span
      className='text-lightPurple-500 font-headline'
    >
      {label}:
    </span>
    <br /> <span
      className='text-green-300 font-headline'
    >
      {value}
    </span>
  </div>
}
