import React from 'react'

export default function InterSpin({size=24, className}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path className="animate-rotate" d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"></path>
            <path className="animate-rotate-reverse" d="M17 12a5 5 0 1 0 -5 5"></path>
        </svg>
    )
}
