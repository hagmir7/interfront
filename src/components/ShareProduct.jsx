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

    return (
        <div>
            {/* QR CODE */}
            <div className="bg-white rounded-lg border shadow-2xs text-center py-10 mt-5">
                <h2 className="text-xl font-bold mb-4">Partager Via</h2>

                <div className='flex justify-center items-center'>
                     <QRCode
                        errorLevel="H"
                        value={productUrl}
                        icon="https://intercocina.com/assets/imgs/intercocina-logo.png"
                    />
                </div>

                <div className="flex flex-wrap gap-4 justify-center items-center mt-6">

                    {/* WhatsApp */}
                    <a
                        href={`https://api.whatsapp.com/send?text=${encodedFullText}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                        <FaWhatsapp size={25} />
                        WhatsApp
                    </a>

                    {/* Facebook */}
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        <FaFacebook size={25} />
                        Facebook
                    </a>

                    {/* Telegram */}
                    <a
                        href={`https://telegram.me/share/url?url=${encodedUrl}&text=${encodedText}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200"
                    >
                        <FaTelegram size={25} />
                        Telegram
                    </a>

                    {/* SMS */}
                    <a
                        href={`sms:?body=${encodedFullText}`}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                        <FaSms size={25} />
                        SMS
                    </a>

                    {/* Email */}
                    <a
                        href={`mailto:?subject=${encodedText}&body=${encodedFullText}`}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                        <Mail size={25} />
                        Email
                    </a>

                </div>
            </div>


        </div>
    )
}
