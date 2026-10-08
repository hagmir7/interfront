"use client";

import { api } from "@/lib/api";
import { useState } from "react";

export default function ReviewForm({ product }) {
  const [stars, setStars] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage(null);
    setIsSubmitting(true);

    const payload = {
      product_id: product.id,
      stars,
      full_name: fullName,
      email,
      comment,
    }


    try {
      const res = await api.post("reviews", payload);

      setMessage(res.data.message || "Votre avis a été soumis avec succès.");
      setStars(0);
      setFullName("");
      setEmail("");
      setComment("");
    } catch (error) {
      setErrors(error?.response?.data?.errors || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Soumettez votre avis</h2>

      {message && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <label
              key={i}
              htmlFor={`star${i}`}
              className="cursor-pointer transition hover:scale-125 has-[:focus]:scale-125"
            >
              <span className="sr-only">
                {i} star{i > 1 ? "s" : ""}
              </span>
              <input
                id={`star${i}`}
                type="radio"
                name="stars"
                value={i}
                checked={stars === i}
                onChange={() => setStars(i)}
                className="sr-only"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${stars >= i ? "text-amber-500" : "text-neutral-600"}`}
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          ))}
        </div>
        {errors.stars && <p className="text-red-500 text-xs mb-4">{errors.stars}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Hassane ag..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 focus:bg-white dark:focus:bg-gray-800"
            />
            {errors.full_name && <span className="text-red-500 text-xs">{errors.full_name}</span>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 focus:bg-white dark:focus:bg-gray-800"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Donnez votre avis *
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Écrivez ici..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 focus:bg-white dark:focus:bg-gray-800"
          />
          {errors.comment && <span className="text-red-500 text-xs">{errors.comment}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className=" bg-green-600 w-1/2 text-white font-normal py-2 px-4 rounded hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Envoi..." : "Soumettre des avis"}
        </button>
      </form>
    </div>
  );
}