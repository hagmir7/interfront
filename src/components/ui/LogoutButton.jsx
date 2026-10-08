'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/services/auth';
import React from 'react';

export default function LogoutButton({ children, className }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); 
      router.replace('/user/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  );
}