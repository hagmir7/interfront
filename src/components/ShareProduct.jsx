// 'use client'

import { QRCode } from 'antd'
import { Mail } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaSms, FaTelegram, FaWhatsapp } from 'react-icons/fa'

export default function ShareProduct({ product }) {
    if (!product) return null

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://intercocina.com'
    const productUrl = `${baseUrl}/product/${product.slug}`
    const shareText = `${product.name} 👉 ${productUrl}`

    const encodedText = encodeURIComponent(product.name)
    const encodedUrl = encodeURIComponent(productUrl)
    const encodedFullText = encodeURIComponent(shareText)

    const shareButtons = [
        {
            href: `https://api.whatsapp.com/send?text=${encodedFullText}`,
            icon: <FaWhatsapp size={20} />,
            label: 'WhatsApp',
            className: 'bg-green-500 hover:bg-green-600',
            external: true,
        },
        {
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            icon: <FaFacebook size={20} />,
            label: 'Facebook',
            className: 'bg-blue-600 hover:bg-blue-700',
            external: true,
        },
        {
            href: `https://telegram.me/share/url?url=${encodedUrl}&text=${encodedText}`,
            icon: <FaTelegram size={20} />,
            label: 'Telegram',
            className: 'bg-sky-400 hover:bg-sky-500',
            external: true,
        },
        {
            href: `sms:?body=${encodedFullText}`,
            icon: <FaSms size={20} />,
            label: 'SMS',
            className: 'bg-gray-600 hover:bg-gray-700',
            external: false,
        },
        {
            href: `mailto:?subject=${encodedText}&body=${encodedFullText}`,
            icon: <Mail size={20} />,
            label: 'Email',
            className: 'bg-red-500 hover:bg-red-600',
            external: false,
        },
    ]

    return (
        <div className="w-full mt-5">
            <div className="bg-white rounded-xl border shadow-sm text-center py-6 px-4 sm:px-6 md:py-10">

                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-5 text-gray-800">
                    Partager Via
                </h2>

                {/* QR Code */}
                <div className="flex justify-center items-center mb-6">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 inline-block">
                        <QRCode
                            errorLevel="H"
                            size={130}
                            value={productUrl}
                            icon="https://intercocina.com/assets/imgs/intercocina-logo.png"
                        />
                    </div>
                </div>

                {/* Share Buttons — icon-only on xs, full on sm+ */}
                <div className="grid grid-cols-5 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
                    {shareButtons.map(({ href, icon, label, className, external }) => (
                        <a
                            key={label}
                            href={href}
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className={`
                flex flex-col sm:flex-row items-center justify-center
                gap-1 sm:gap-2
                p-2 sm:px-4 sm:py-2
                text-white rounded-lg
                transition-colors duration-200
                text-[10px] sm:text-sm font-medium
                min-w-0 w-full sm:w-auto
                ${className}
            `}
                        >
                            {icon}
                            <span className="truncate">{label}</span>
                        </a>
                    ))}
                </div>

            </div>
        </div>
    )
}