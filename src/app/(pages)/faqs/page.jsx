"use client";

import CLink from "@/components/CLink";
import { api } from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);


    const [faqs, setFaqs] = useState([]);

    const getData = async () => {
        try {
            const response = await api.get("faqs");

            setFaqs(
                response.data.map(item => ({
                    q: item.question,
                    a: item.answer,
                }))
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="px-4 text-center lg:px-12">
                <div className="w-full flex justify-center py-6">
                    <CLink href="#">
                        <Image
                            className="w-48"
                            src="https://interapi.facepy.com/assets/imgs/intercocina-logo.png"
                            width={192}
                            height={80}
                            alt="Intercocina faq"
                            title="Intercocina FAQs"
                        />
                    </CLink>
                </div>

                <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl">
                    Frequently asked questions (FAQ)
                </h1>

                <p className="mb-8 text-md font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
                    Vous avez des questions? Vous trouverez ici les réponses les plus appréciées par nos partenaires,
                    ainsi que l'accès à des instructions détaillées et à un support.
                </p>
            </div>

            <div className="divide-y divide-gray-300">
                {faqs.map((faq, index) => (
                    <div key={index} className="accordion">
                        <button
                            onClick={() => toggle(index)}
                            className="toggle-button cursor-pointer w-full text-base outline-none text-left font-medium py-6 flex items-center"
                        >
                            <span className="mr-4">{faq.q}</span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className={`w-[14px] h-[14px] fill-current ml-auto transition-transform duration-300 ${openIndex === index ? "rotate-180 text-blue-700" : ""
                                    }`}
                            >
                                <path d="M40.421 215.579H471.579C493.868 215.579 512 233.711 512 256s-18.132 40.421-40.421 40.421H40.421C18.132 296.421 0 278.289 0 256s18.132-40.421 40.421-40.421z" />
                                <path
                                    className={
                                        openIndex === index ? "hidden" : "block"
                                    }
                                    d="M215.579 40.421C215.579 18.132 233.711 0 256 0s40.421 18.132 40.421 40.421v431.158C296.421 493.868 278.289 512 256 512s-40.421-18.132-40.421-40.421V40.421z"
                                />
                            </svg>
                        </button>

                        <div
                            className={`content overflow-hidden transition-all duration-300 ${openIndex === index
                                ? "max-h-[1000px] pb-6 visible"
                                : "max-h-0 invisible"
                                }`}
                        >
                            <p className="text-[15px] text-slate-600 leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
