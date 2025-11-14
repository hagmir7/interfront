'use client'
import React, { useEffect, useState } from 'react'
import CLink from './CLink'
import { User } from '@/services/auth'

function AuthActions() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await User()
      setUser(data)
    }
    fetchUser()
  }, [])

  const isLoggedIn = !!user?.id

  return (
    <CLink
      href={isLoggedIn ? '/profile' : '/user/login'}
      className='hover:text-gray-600 p-2 rounded-full bg-[#efeeeb] flex items-center justify-center'
      title={isLoggedIn ? `Profil de ${user?.full_name}` : 'Connexion'}
    >
      <svg
        className='w-6 h-6'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
      >
        <path
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='M15 7.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m4.5 13c-.475-9.333-14.525-9.333-15 0'
        ></path>
      </svg>
    </CLink>
  )
}

export default AuthActions
