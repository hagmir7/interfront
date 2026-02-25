"use client";

import { useState } from "react";

export default function FAQAccordion({ faqs = [] }) {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (faqs.length === 0) {
        return (
            <p className="text-center text-gray-400 py-12">
                Aucune question disponible pour le moment.
            </p>
        );
    }

    return (
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
                            className={`w-[14px] h-[14px] fill-current ml-auto transition-transform duration-300 ${
                                openIndex === index ? "rotate-180 text-blue-700" : ""
                            }`}
                        >
                            {/* Horizontal bar (always visible) */}
                            <path d="M40.421 215.579H471.579C493.868 215.579 512 233.711 512 256s-18.132 40.421-40.421 40.421H40.421C18.132 296.421 0 278.289 0 256s18.132-40.421 40.421-40.421z" />
                            {/* Vertical bar (hidden when open) */}
                            <path
                                className={openIndex === index ? "hidden" : "block"}
                                d="M215.579 40.421C215.579 18.132 233.711 0 256 0s40.421 18.132 40.421 40.421v431.158C296.421 493.868 278.289 512 256 512s-40.421-18.132-40.421-40.421V40.421z"
                            />
                        </svg>
                    </button>

                    <div
                        className={`content overflow-hidden transition-all duration-300 ${
                            openIndex === index
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
    );
}