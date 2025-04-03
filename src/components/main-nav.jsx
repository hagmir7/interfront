import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  

// import CLink from 'next/CLink';
import React from 'react';
import { ProductsMenu } from "./products-menu";
import TopNav from "./top-nav";
import CartCounter from "./CartCounter";
import CLink from "./CLink";
// import { getCurrentUser } from "@/services/auth";

const MainNav = () => {
    return (
        <nav className="bg-[#fef6f6] border-b-2 border-red-500">
            {/* <TopNav /> */}
            <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">

                {/* Mobile menu */}
                <div className="z-30">
                    <CLink href='/menu' className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"></path>
                        </svg>
                    </CLink>

                    <div className="fixed inset-0 bg-black bg-opacity-50" style={{ display: 'none' }}>
                    </div>

                    <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-lg" style={{ display: 'none' }}>
                        <div className="flex items-center justify-between p-4 border-b">
                            <div className='text-2xl inter'><span className='text-[#b6b6b7]'>INTER</span><span className='text-[#ec2228]'>COCINA</span></div>

                            <button className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="bg-white">
                            <div className="p-4 border-b">
                                <div className="relative">
                                    <input type="text" placeholder="Rechercher des produits" className="w-full p-2 pl-10 border rounded-lg" />
                                    <svg className="absolute left-3 top-3 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                            </div>
                            <nav className="divide-y">
                                <CLink className="block px-4 py-3 hover:bg-gray-50 text-red-500" href="/">
                                    Accueil
                                </CLink>
                                <CLink className="block px-4 py-3 hover:bg-gray-50 text-gray-700" href="/shop">
                                    Produits
                                </CLink>
                            </nav>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                            <CLink href="/auth/login" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                                Connexion / Inscription
                            </CLink>
                        </div>
                    </div>
                </div>
                {/* End Mobile Menu */}

                <CLink href="/" className="flex items-center">
                    <h1 className='text-xl inter md:text-2xl'>
                        <span className='text-[#b6b6b7]'>INTER</span><span className='text-[#ec2228]'>COCINA</span>
                    </h1>
                    {/* <img src="https://intercocina.com/assets/imgs/intercocina-logo.png" alt="Intercocina" className="w-32 md:h-12 md:w-auto" /> */}
                </CLink>


                {/* Search */}
                <div className="flex-1 max-w-xl mx-4 hidden lg:block">
                    <div className="relative">
                        <button className="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <div role="status" className='hidden'>
                                <svg aria-hidden="true" className="w-6 h-6 mt-2 text-gray-500 [animation:spin_0.5s_linear_infinite] fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </button>
                        <input type="text" placeholder="Rechercher des produits" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white" />
                    </div>
                </div>

                <div className="items-center space-x-4 hidden lg:flex">
                    <CLink href="#" className="hover:text-gray-600 p-2 rounded-full bg-[#efeeeb] me-3">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79"></path>
                        </svg>
                    </CLink>

                    <CLink href="/profile" className="hover:text-gray-600 p-2 rounded-full bg-[#efeeeb]">
                        {/* {getCurrentUser() } */}
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 7.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m4.5 13c-.475-9.333-14.525-9.333-15 0"></path>
                        </svg>
                    </CLink>

                    {/* Cart side */}
                    <div className="z-30">
                        <CLink href="/cart" aria-label="Shopping Cart" className="inline-block hover:bg-gray-400 bg-gray-500 p-2 rounded-full relative text-white duration-200 cursor-pointer" aria-expanded="false">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"></path>
                            </svg>
                            <CartCounter />
                        </CLink>

                        <div className="fixed inset-0 bg-black bg-opacity-50" style={{ display: 'none' }}>
                        </div>

                        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg" style={{ display: 'none' }}>
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 id="cart-title" className="text-lg">Panier</h2>
                                <button className="text-gray-500 hover:text-gray-700" aria-label="Close cart">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="space-y-4">
                                    <div className="text-center py-8 text-gray-500">
                                        Votre panier est vide
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                                <div className="flex justify-between mb-4">
                                    <span className="font-medium">Total</span>
                                    <span className="font-bold">0 MAD</span>
                                </div>
                                <div className="w-full">
                                    <button disabled className="opacity-50 cursor-not-allowed text-center w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors">
                                        Vérifier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End side */}
                </div>

                {/* Moblie Cart button */}
                <div>
                    <div className="items-center space-x-4 flex lg:hidden">
                        <CLink href="/cart" className="hover:bg-gray-400 bg-gray-500 p-2 rounded-full relative text-white duration-200">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"></path>
                            </svg>
                            <CartCounter />
                        </CLink>
                    </div>
                </div>

            </div>

            <div className="hidden w-full lg:block" id="navbar-default">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <ul className="flex flex-col lg:flex-row gap-5 py-2 text-sm font-medium">
                        <li>
                            <CLink href="/" className="inline-flex cursor-pointer py-2 hover:text-gray-500 gap-2 items-center text-[18px] text-neutral-600">
                                Accueil
                            </CLink>
                        </li>
                        <li>
                            <CLink href="/aprops" className="inline-flex cursor-pointer py-2 hover:text-gray-500 gap-2 items-center text-[18px] text-neutral-600">
                                À propos
                            </CLink>
                        </li>
                        <li>
                            <CLink href="/event/list" className="inline-flex cursor-pointer py-2 hover:text-gray-500 gap-2 items-center text-[18px] text-neutral-600">
                                Événements
                            </CLink>
                        </li>
                        <ProductsMenu />
                    </ul>
                    <div className='flex gap-3'>
                        <CLink href="/contact" className="rounded-pill flex gap-2 text-white bg-[#da3036] py-2 px-4 text-[17px] rounded-full text-sm hover:text-white">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.464 16.828C2 15.657 2 14.771 2 11s0-5.657 1.464-6.828C4.93 3 7.286 3 12 3s7.071 0 8.535 1.172S22 7.229 22 11s0 4.657-1.465 5.828C19.072 18 16.714 18 12 18c-2.51 0-3.8 1.738-6 3v-3.212c-1.094-.163-1.899-.45-2.536-.96"></path>
                                </svg>
                            </span>
                            <span>Contactez-nous</span>
                        </CLink>
                        {/* <Modal /> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MainNav;