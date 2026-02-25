'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function LogoutButton({ children, className }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    router.replace('/user/login');
  };

  return (
    <button
      onClick={handleLogout}
      className={className}
    >
      {children}
    </button>
  );
}