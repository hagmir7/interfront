import React from "react";
import { FaStar } from "react-icons/fa";
import { format } from "date-fns";
import Image from "next/image";


const ReviewCard = ({ review }) => (
  
  <div className="bg-white rounded-xl md:shadow-lg p-6 border md:border-0 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
    <div className="flex items-center mb-4">
      <Image
        src="/imgs/3298099085884037069-head.png"
        alt={`${review.full_name}`}
        className="w-12 h-12 rounded-full object-cover border"
        loading="lazy"
        width={400}
        height={400}
      />
      <div className="ml-4">
        <h3 className="font-semibold text-lg text-gray-800">{review.full_name}</h3>
        <p className="text-sm text-gray-500">{format(review.updated_at, "MMM dd, yyyy")}</p>
      </div>
    </div>

    <div className="flex mb-3">
      <FaStar className="text-yellow-400 w-5 h-5" />
      <FaStar className="text-yellow-400 w-5 h-5" />
      <FaStar className="text-yellow-400 w-5 h-5" />
      <FaStar className="text-yellow-400 w-5 h-5" />
      <FaStar className="text-yellow-400 w-5 h-5" />
    </div>

    <p className="text-gray-600 line-clamp-3">{review.comment}</p>
  </div>
);

const ReviewsSection = async () => {
  const response = await fetch('https://interapi.facepy.com/api/reviews')
  if(!response.ok){
    throw new Error('Failed to fetch reviews')
  }
  const reviews = await response.json();
  return (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          Avis des clients
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez ce que nos clients disent de leur expérience avec nos produits et services.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 md:p-0">
        {reviews.map((review, index) => <ReviewCard key={index} review={review} />)}
      </div>
    </div>
  </div>
  )
};

export default ReviewsSection;