"use client";

import { useActionState, useRef, useState, useEffect } from "react";

export async function submitReclamation(prevState, formData) {
  const fullName = formData.get("fullName");
  const subject = formData.get("subject");
  const phone = formData.get("phone");
  const clientNumber = formData.get("clientNumber");
  const message = formData.get("message");
  const files = formData.getAll("files");

  const fieldErrors = {};
  if (!fullName?.trim()) fieldErrors.fullName = "Le nom complet est obligatoire.";
  if (!subject?.trim()) fieldErrors.subject = "Le sujet est obligatoire.";
  if (!phone?.trim()) fieldErrors.phone = "Le numéro de téléphone est obligatoire.";
  if (!message?.trim()) fieldErrors.message = "Le message est obligatoire.";

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    console.log("Reclamation submitted:", {
      fullName,
      subject,
      phone,
      clientNumber,
      message,
      filesCount: files.filter((f) => f.size > 0).length,
    });
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true };
  } catch {
    return { error: "Une erreur s'est produite. Veuillez réessayer." };
  }
}

const initialState = {};

export default function ReclamationForm() {
  const [state, formAction, isPending] = useActionState(submitReclamation, initialState);
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      setFiles([]);
    }
  }, [state.success]);

  const addFiles = (incoming) => {
    if (!incoming) return;
    const newFiles = Array.from(incoming).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id);
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return "🖼️";
    if (file.type === "application/pdf") return "📄";
    if (file.type.includes("word")) return "📝";
    if (file.type.includes("sheet") || file.type.includes("excel")) return "📊";
    return "📎";
  };

  const handleSubmit = () => {
    if (fileInputRef.current) {
      const dt = new DataTransfer();
      files.forEach(({ file }) => dt.items.add(file));
      fileInputRef.current.files = dt.files;
    }
  };

  const inputBase =
    "mt-1 block w-full rounded-xl px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-400 bg-black/[0.04] border transition-all duration-200 outline-none focus:bg-black/[0.06] focus:ring-2 focus:ring-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed";
  const inputNormal = `${inputBase} border-black/10 focus:border-red-600/50`;
  const inputError = `${inputBase} border-red-500/60 bg-red-500/5`;
  const fi = (err) => (err ? inputError : inputNormal);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-16 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-2xl shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          ✓
        </div>
        <h3 className="text-xl font-bold text-gray-900">Réclamation envoyée !</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
          Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 border border-black/20 text-gray-500 hover:text-gray-900 hover:border-black/40 rounded-lg px-5 py-2.5 text-sm transition-all duration-200 cursor-pointer"
        >
          Nouvelle réclamation
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      noValidate
    >
      {/* Global error */}
      {state.error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-600 text-sm">
          <span>⚠</span> {state.error}
        </div>
      )}

      {/* Full Name + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Jean Dupont"
            className={fi(state.fieldErrors?.fullName)}
            disabled={isPending}
          />
          {state.fieldErrors?.fullName && (
            <span className="mt-1 text-xs text-red-500">{state.fieldErrors.fullName}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Sujet / N° commande <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="CMD-2024-00123"
            className={fi(state.fieldErrors?.subject)}
            disabled={isPending}
          />
          {state.fieldErrors?.subject && (
            <span className="mt-1 text-xs text-red-500">{state.fieldErrors.subject}</span>
          )}
        </div>
      </div>

      {/* Phone + Client Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+212 60 00 00 00 00"
            className={fi(state.fieldErrors?.phone)}
            disabled={isPending}
          />
          {state.fieldErrors?.phone && (
            <span className="mt-1 text-xs text-red-500">{state.fieldErrors.phone}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="clientNumber" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            N° client{" "}
            <span className="normal-case tracking-normal font-normal text-xs text-gray-400">(optionnel)</span>
          </label>
          <input
            id="clientNumber"
            name="clientNumber"
            type="text"
            placeholder="CL0000"
            className={fi()}
            disabled={isPending}
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Décrivez votre problème en détail..."
          className={fi(state.fieldErrors?.message)}
          disabled={isPending}
        />
        {state.fieldErrors?.message && (
          <span className="mt-1 text-xs text-red-500">{state.fieldErrors.message}</span>
        )}
      </div>

      {/* File Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Pièces jointes{" "}
          <span className="normal-case tracking-normal font-normal text-xs text-gray-400">(optionnel)</span>
        </label>

        <div
          onClick={() => document.getElementById("file-trigger")?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`flex flex-col items-center justify-center gap-2 px-6 py-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 select-none ${
            dragOver
              ? "border-red-500/50 bg-red-500/5"
              : "border-black/10 hover:border-red-600/40 hover:bg-black/[0.02]"
          }`}
        >
          <span className="text-3xl">📁</span>
          <p className="text-sm text-gray-500 text-center">
            Glissez-déposez vos fichiers ici ou{" "}
            <span className="text-red-500 underline underline-offset-2">parcourir</span>
          </p>
          <p className="text-xs text-gray-400">PDF, images, Word, Excel — max 10 Mo par fichier</p>

          <input
            id="file-trigger"
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.xls,.xlsx"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
            disabled={isPending}
          />
          <input ref={fileInputRef} type="file" name="files" multiple className="hidden" readOnly />
        </div>

        {files.length > 0 && (
          <ul className="flex flex-col gap-2 mt-1">
            {files.map(({ id, file, preview }) => (
              <li
                key={id}
                className="flex items-center gap-3 bg-black/[0.03] hover:bg-black/[0.06] border border-black/[0.07] rounded-xl px-3 py-2.5 transition-colors duration-150"
              >
                {preview ? (
                  <img src={preview} alt={file.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <span className="text-xl w-9 text-center flex-shrink-0">{getFileIcon(file)}</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(id)}
                  disabled={isPending}
                  className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 text-base leading-none transition-colors duration-150 disabled:opacity-50 cursor-pointer"
                  aria-label="Supprimer"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white text-sm font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(200,30,30,0.35)] hover:shadow-[0_6px_28px_rgba(200,30,30,0.5)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
      >
        {isPending ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Envoi en cours...
          </>
        ) : (
          <>
            <span>✉</span>
            Soumettre la réclamation
          </>
        )}
      </button>
    </form>
  );
}