import React from 'react'

export function Button({ onClick, children }) {
  return (
    <button
      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={onClick}>
      {children}
    </button>
  )
}