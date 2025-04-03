import RegisterForm from '@/components/RegisterForm'
import React from 'react'

function page() {
  return (
    <div className="p-10 max-w-5xl mx-auto">
        <RegisterForm isRegister={true} />
    </div>
  )
}

export default page