'use client'
import React, { useState } from 'react'

export default function ProductPiece({ pieces }) {
    const [downloading, setDownloading] = useState({})

    function handleDownload(item) {
        if (downloading[item.id]) return
        setDownloading(prev => ({ ...prev, [item.id]: true }))

        const link = document.createElement('a')
        link.href = `https://app.intercocina.com/storage/${item.file}`
        link.download = item.file
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setTimeout(() => {
            setDownloading(prev => ({ ...prev, [item.id]: false }))
        }, 2000)
    }

    return (
        <div className="py-2 px-1 grid grid-cols-2 gap-3">
            {pieces.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white border border-red-200 border-l-4 border-l-red-500 rounded-lg px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A32D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <div>
                            <p className="m-0 font-semibold text-sm" style={{ color: '#A32D2D' }}>{item.title}</p>
                            <p className="m-0 mt-0.5 text-xs truncate max-w-xs" style={{ color: '#b91c1c' }}>{item.file}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleDownload(item)}
                        disabled={!!downloading[item.id]}
                        title="Download file"
                        className={`w-9 h-9 rounded-lg border border-red-200 flex items-center justify-center shrink-0 transition-colors
                            ${downloading[item.id]
                                ? 'bg-red-100 cursor-not-allowed'
                                : 'bg-red-50 hover:bg-red-100 cursor-pointer'}`}
                    >
                        {downloading[item.id] ? (
                            <svg
                                className="animate-spin"
                                width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="#A32D2D" strokeWidth="2.5" strokeLinecap="round"
                            >
                                <path d="M12 2a10 10 0 0 1 10 10" opacity="0.3" />
                                <path d="M12 2a10 10 0 0 1 10 10" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A32D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                        )}
                    </button>
                </div>
            ))}
        </div>
    )
}