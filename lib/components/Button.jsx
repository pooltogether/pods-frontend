import React from 'react'

export function Button({ color, onClick, children, disabled, loading }) {
  color = color || 'purple'
  return (
    <button
      disabled={disabled || loading}
      className={`shadow bg-${color}-500 disabled:opacity-50 hover:bg-${color}-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
      type="button"
      onClick={onClick}>
      {children}
    </button>
  )
}