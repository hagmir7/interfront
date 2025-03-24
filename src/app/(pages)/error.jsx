'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        className='py-3 px-5 border-2 bg-red-600 rounded-2xl text-white font-semibold'
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
