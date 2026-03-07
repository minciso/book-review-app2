"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchBookDetails, fetchReviews, submitReview } from "../../../services/api";
import { useUser } from "../../../context/UserContext";

export default function BookDetails() {
  const { id } = useParams();
  const router = useRouter(); // added for navigation
  const { user } = useUser();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookDetails(id).then(setBook).catch(err => console.error(err));
    fetchReviews(id).then(setReviews).catch(err => console.error(err));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("You must be logged in to post a review.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await submitReview({ bookId: id, comment: newReview, rating }, token);
      setReviews([response.review, ...reviews]);
      setNewReview("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit review.");
    }
  };

  if (!book) return <p className="text-center text-gray-500 mt-8">Loading book details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
	  //className="mb-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
      className="mb-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        ← Back to Home
      </button>

      {/* Book Details */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
        <p className="text-gray-700 mt-1">by {book.author}</p>
        <p className="text-yellow-500 font-semibold mt-2">⭐ {book.rating}/5</p>
      </div>

      {/* Reviews */}
      <div className="max-w-3xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review, index) => (
              <li key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <p className="font-semibold text-gray-800">{review.username}</p>
                <p className="text-gray-700 mt-1">{review.comment}</p>
                <p className="text-yellow-500 font-semibold mt-1">⭐ {review.rating}/5</p>
              </li>
            ))}
          </ul>
        )}

        {/* Add Review Form */}
        {user && (
          <form onSubmit={handleReviewSubmit} className="mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Add a Review</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <textarea
              className="w-full p-3 border rounded-lg mt-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Write your review..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
            />
            <select
              className="w-full p-3 border rounded-lg mt-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num} ⭐</option>
              ))}
            </select>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
