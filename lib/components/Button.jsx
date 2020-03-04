import React from 'react'

export function Button({ onClick, children, disabled, loading }) {
  return (
    <button
      disabled={disabled || loading}
      className="shadow bg-purple-500 disabled:opacity-50 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
      type="button"
      onClick={onClick}>
      {children}
    </button>
  )
}