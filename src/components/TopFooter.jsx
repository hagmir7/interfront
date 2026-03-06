import Image from 'next/image'
import React from 'react'

export default function TopFooter() {
    return (
        <section className='w-full px-4 py-10 sm:px-6 lg:px-8'>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
                    
                    {/* Logo + Description */}
                    <div className="space-y-4 xl:max-w-md">
                        <Image
                            className="w-[160px] sm:w-[200px]"
                            width={200}
                            height={200}
                            loading="lazy"
                            src="https://app.intercocina.com/assets/imgs/intercocina-logo.png"
                            alt="Intercocina Logo"
                            title="Intercocina Logo"
                        />
                        <p className="text-slate-700 font-semibold text-sm sm:text-base leading-relaxed">
                            Nous sommes profondément honorés de vous présenter notre société, qui se distingue en tant que
                            leader incontesté dans le domaine de la fabrication sur mesure d'éléments de cuisine
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="flex flex-col sm:flex-row gap-4 xl:gap-6">
                        
                        {/* Email Card */}
                        <div className="flex items-center gap-3 px-4 py-3 duration-500 shadow-md bg-red-500 rounded-3xl hover:scale-105 cursor-pointer flex-1 sm:flex-none sm:min-w-[220px]">
                            <Image
                                className="w-[30px] sm:w-[35px] shrink-0"
                                loading="lazy"
                                width={100}
                                height={100}
                                src="https://app.intercocina.com/assets/icons/mail.png"
                                alt="Envoyez-nous un email"
                                title="Envoyez-nous un email"
                            />
                            <div className="min-w-0">
                                <p className="text-sm sm:text-base font-bold text-white leading-tight">Envoyez-nous un email</p>
                                <p className="text-white text-sm truncate">contact@intercocina.com</p>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="flex items-center gap-3 px-4 py-3 duration-500 bg-white border shadow-md rounded-3xl hover:scale-105 cursor-pointer flex-1 sm:flex-none sm:min-w-[200px]">
                            <Image
                                className="w-[30px] sm:w-[35px] shrink-0"
                                width={80}
                                height={80}
                                loading="lazy"
                                src="https://app.intercocina.com/assets/icons/phone.png"
                                title="Appelez-nous"
                                alt="Appelez-nous"
                            />
                            <div>
                                <p className="text-sm sm:text-base font-bold leading-tight">Appelez-nous</p>
                                <p className="text-sm">+212 661 54 79 00</p>
                                <p className="text-sm">+212 536 35 88 88</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}