'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className='flex w-screen h-screen justify-center items-center'>
        <div className="">
          <h2>Blobal Error</h2>
          <button className="py-3 px-5 border-2 bg-red-600 rounded-2xl" onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  )
}
