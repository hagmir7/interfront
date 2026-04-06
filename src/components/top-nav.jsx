import Link from 'next/link'
import React from 'react'

export default function TopNav() {
    return (
        <div className="hidden lg:block bg-[#b91c1c] text-white border-b-2">
            <div className="mx-auto px-4">
                <div className="flex items-center justify-between py-2 text-sm w-full">
                    <div className="flex space-x-4">
                        <Link href="/contact" className="hover:text-gray-200">Contactez-nous</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="tel:+212536358888" className="hover:text-gray-200">+212 5 36 35 88 88</a>
                        <a href="mailto:contact@intercocina.com" className="hover:text-gray-200">contact@intercocina.com</a>
                    </div>
                </div>
            </div>
        </div>
    )
}