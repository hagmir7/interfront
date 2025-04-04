import React from "react";


const SectionConver = () => {
    return (
        <main className="pt-16">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-900 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1538944570562-2c9cb7857097?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    }}
                ></div>

                <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        {/* Left Side: Company Info */}
                        <div className="w-full md:w-1/2 mb-12 md:mb-0">
                            <div className="flex flex-col order-2 gap-3 pt-6 space-y-4 col-span-full md:px-4 xl:order-1 xl:col-span-1 md:py-16">
                                <h1 className="text-4xl font-bold leading-tight text-center md:text-left md:text-5xl md:leading-tight animate__animated animate__fadeInUp">
                                    <span className="text-[#b6b6b7] font-black tracking-widest" style={{ fontFamily: "DOCK11-Heavy" }}>
                                        INTER
                                    </span>
                                    <span className="text-[#ec2228] font-black tracking-widest" style={{ fontFamily: "DOCK11-Heavy, sans-serif" }}>
                                        COCINA
                                    </span>{" "}<br />
                                    Leader des cuisines modernes au Maroc
                                </h1>
                                <p className="text-center text-white md:text-left text-lg font-semibold animate__delay-200ms animate__animated animate__fadeInUp">
                                    Notre collection de meubles de cuisine est conçue pour transformer votre
                                    espace en un lieu d'inspiration gastronomique, où chaque détail compte.
                                </p>
                                <div className="flex justify-center md:justify-start gap-4">
                                    <a href="https://intercocina.com/contact" className="btn btn-accent-gray animate__animated animate__fadeInUp flex items-center justify-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="26"
                                            height="26"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="m2.357 7.714l6.98 4.654c.963.641 1.444.962 1.964 1.087a3 3 0 0 0 1.398 0c.52-.125 1.001-.446 1.963-1.087l6.98-4.654M7.158 19.5h9.686c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.31-1.311c.328-.642.328-1.482.328-3.162V9.3c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311c-.642-.327-1.482-.327-3.162-.327H7.157c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.31 1.311c-.328.642-.328 1.482-.328 3.162v5.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311c.642.327 1.482.327 3.162.327"
                                            ></path>
                                        </svg>
                                        <span>Contact</span>
                                    </a>

                                    <a
                                        href="https://intercocina.com/shop"
                                        className="btn btn-primary animate__animated animate__fadeInUp flex items-center justify-center gap-2"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="26"
                                            height="26"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3"
                                            ></path>
                                        </svg>
                                        Produits
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Features */}
                        <div className="w-full md:w-1/2 md:pl-12">
                            <div className="bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-2xl">
                                <h2 className="text-2xl font-semibold mb-6">Why MyCompany?</h2>
                                <ul className="space-y-4">
                                    {[
                                        {
                                            text: "Lightning-fast Performance",
                                            color: "text-yellow-400",
                                            path: "M13 10V3L4 14h7v7l9-11h-7z",
                                        },
                                        {
                                            text: "Bank-grade Security",
                                            color: "text-green-400",
                                            path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                        },
                                        {
                                            text: "AI-powered Insights",
                                            color: "text-purple-400",
                                            path: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                                        },
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <svg
                                                className={`w-6 h-6 mr-3 ${feature.color}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d={feature.path}
                                                ></path>
                                            </svg>
                                            <span>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </section>
        </main>
    );
};

export default SectionConver;
