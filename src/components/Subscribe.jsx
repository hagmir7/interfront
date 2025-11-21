"use client"
import React, { useState } from 'react'
import InterSpin from './ui/InterSpin'
import { api } from '@/lib/api'
import { AnimatedAlert } from './ui/AnimatedAlert';

export default function Subscribe() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await api.post('subscribers', { email })
            setMessage({
                content: response.data.message,
                type: "success",
            })
        } catch (error) {
            setLoading(false)
            setMessage({
                content: error.response?.data?.message || "Une erreur est survenue",
                type: "error",
            })
        }
        setLoading(false)
    }


    return (
        <div className="w-full max-w-lg bg-accent-red px-8 py-16 xl:ml-36 rounded-3xl relative overflow-hidden order-1 xl:order-2 md:flex md:justify-center bg-red-500">
            <div className="w-40 aspect-square rounded-full bg-gray-50 opacity-45 absolute z-0 -bottom-10 -left-10 animate__animated animate__zoomIn"></div>
            <div className="aspect-square rounded-full bg-gray-50 opacity-45 w-36 md:w-80 absolute z-0 -top-16 -right-16 md:-top-28 md:-right-28 animate__animated animate__zoomIn"></div>
            <div className="w-full relative z-20 space-y-6">
                {message?.type && (
                    <AnimatedAlert
                        type={message?.type}
                        title={message?.content}
                        autoClose={5000}
                        onDismiss={() => setMessage(null)}
                    />
                )}
                <div className="space-y-2">
                    <h3 className="text-white text-4xl font-bold uppercase tracking-wide"> Newsletter </h3>
                    <p className="text-white text-lg">
                        Restez informés ! Abonnez-vous à notre newsletter.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <label htmlFor="newsletter_email" className="sr-only">
                            Newsletter_email
                        </label>
                        <input
                            type="text"
                            id="newsletter_email"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-gray-200 p-4 text-sm rounded-xl bg-white"
                        />
                    </div>
                    <button onClick={handleSubmit} className="flex items-center justify-center gap-2 text-accent-red bg-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-red hover:bg-transparent border hover:border-white hover:text-white">
                       {loading && <InterSpin />} 
                        S'abonner
                    </button>
                    <div>
                        <p className="text-white text-sm">
                            Nous respectons votre vie privée. Vous pouvez vous désinscrire à tout moment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
