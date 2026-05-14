'use client';
import React from 'react';
import CLink from './CLink';
import { useAuth } from '@/context/AuthContext';
import { LogIn } from 'lucide-react';

function AuthActions() {
  const { user } = useAuth();

  return (
    <>
    {/* {
      user ?<CLink
        href='/contact'
        className='rounded-pill flex gap-2 text-white bg-[#f72e2f] py-2 px-4 text-[17px] rounded-full text-sm hover:text-white'
      >
        <span aria-hidden='true'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
          >
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M3.464 16.828C2 15.657 2 14.771 2 11s0-5.657 1.464-6.828C4.93 3 7.286 3 12 3s7.071 0 8.535 1.172S22 7.229 22 11s0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96'
            ></path>
          </svg>
        </span>
        <span>Espac client</span>
      </CLink> : 
    } */}
      


      <CLink
        href={user ? '/profile' : '/user/login'}
        className="rounded-pill flex gap-2 text-white bg-[#f72e2f] py-2 px-4 text-[17px] rounded-full text-sm hover:text-white"
        title={user ? `Profil de ${user.name}` : 'Connexion'}
        aria-label={user ? `Profil de ${user.name}` : 'Connexion'}
      >
        {
          user ? <div className='flex items-center gap-2 justify-center' >
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 7.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m4.5 13c-.475-9.333-14.525-9.333-15 0"
              />
            </svg>


            Espace client
          </div> : <div className='flex gap-2 items-center'><span>Connexion</span> <LogIn size={23} /> </div>
        }
      </CLink>

    </>

  );
}

export default AuthActions;