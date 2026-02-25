import RegisterForm from '@/components/RegisterForm'
import React, { Suspense } from 'react'

function page() {
  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto">
      <Suspense fallback={<div>Chargement...</div>}>
        <RegisterForm isRegister={true} />
      </Suspense>
    </div>
  )
}

export default page