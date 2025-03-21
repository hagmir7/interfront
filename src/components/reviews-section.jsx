import React from "react";
import { FaStar } from "react-icons/fa";
import { format } from "date-fns";

const reviewsData = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    reviewText:
      "Amazing product! The quality exceeded my expectations. Would definitely recommend to others.",
    rating: 5,
    reviewDate: new Date("2024-01-15"),
  },
  {
    id: 2,
    customerName: "Michael Chen",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    reviewText:
      "Great value for money. The customer service was exceptional throughout the process.",
    rating: 4,
    reviewDate: new Date("2024-01-14"),
  },
  {
    id: 3,
    customerName: "Emily Rodriguez",
    customerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    reviewText:
      "Solid product with great features. Just what I needed for my daily tasks.",
    rating: 5,
    reviewDate: new Date("2024-01-13"),
  },
  {
    id: 4,
    customerName: "David Wilson",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    reviewText:
      "The product is good but there's room for improvement in some areas.",
    rating: 4,
    reviewDate: new Date("2024-01-12"),
  },
  {
    id: 5,
    customerName: "Lisa Thompson",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    reviewText:
      "Exceeded all my expectations! The attention to detail is remarkable.",
    rating: 5,
    reviewDate: new Date("2024-01-11"),
  },
  {
    id: 6,
    customerName: "James Parker",
    customerAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    reviewText: "Very satisfied with my purchase. The quality is outstanding!",
    rating: 5,
    reviewDate: new Date("2024-01-10"),
  },
];

const ReviewCard = ({ review }) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <div className="flex items-center mb-4">
          <img
            src={review.customerAvatar}
            alt={`${review.customerName}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
          />
          <div className="ml-4">
            <h3 className="font-semibold text-lg text-gray-800">
              {review.customerName}
            </h3>
            <p className="text-sm text-gray-500">
              {format(review.reviewDate, "MMM dd, yyyy")}
            </p>
          </div>
        </div>

        <div className="flex mb-3">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`${
                index < review.rating ? "text-yellow-400" : "text-gray-300"
              } w-5 h-5`}
            />
          ))}
        </div>

        <p className="text-gray-600 line-clamp-3">{review.reviewText}</p>
      </div>
    </>
  );
};

const ReviewsSection = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;