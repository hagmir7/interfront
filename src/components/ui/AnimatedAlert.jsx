"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from "lucide-react"

export function AnimatedAlert({
  type = "info",
  title,
  message,
  dismissible = true,
  onDismiss,
  autoClose,
}) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss && onDismiss()
  }

  const typeStyles = {
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-900 dark:text-emerald-100",
      icon: "text-emerald-600 dark:text-emerald-400",
      Icon: CheckCircle2,
    },
    error: {
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-900 dark:text-red-100",
      icon: "text-red-600 dark:text-red-400",
      Icon: AlertCircle,
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      text: "text-amber-900 dark:text-amber-100",
      icon: "text-amber-600 dark:text-amber-400",
      Icon: AlertTriangle,
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-900 dark:text-blue-100",
      icon: "text-blue-600 dark:text-blue-400",
      Icon: Info,
    },
  }

  const styles = typeStyles[type]
  const Icon = styles.Icon

  // Auto close
  useEffect(() => {
    if (!autoClose) return
    const timer = setTimeout(() => handleDismiss(), autoClose)
    return () => clearTimeout(timer)
  }, [autoClose])

  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
      <div
        className={`flex items-start gap-3 px-4 py-3 rounded-lg border
        ${styles.bg} ${styles.border} ${styles.text}
        shadow-sm transition-all duration-300`}
      >
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${styles.icon}`} />

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold leading-tight">{title}</h3>
          { message ??  <p className="text-sm opacity-90 leading-snug mt-0.5">{message}</p>}
        </div>

        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
