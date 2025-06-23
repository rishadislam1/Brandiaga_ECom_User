import React, { useEffect, useState } from "react";
import { UpdateProfileRequest, UserProfile } from "@/Request/AuthRequest";
import { GetCustomerReview } from "@/Request/ReviewRequest";
import { Link } from "react-router-dom";

// Define interfaces for TypeScript
interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
  token: string | null;
  passwordHash: string | null;
  address: string | null;
}

interface Review {
  // Define review structure based on expected data
  id: string;
  productId: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface ReviewResponse {
  status: string;
  message: string;
  data: Review[];
}

const CustomerAccount: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roleName: "",
    token: null,
    passwordHash: null,
    address: null,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserData>(userData);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Fetch user profile and reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userRes = await UserProfile();
        setUserData(userRes.data);
        setFormData(userRes.data);

        // Fetch reviews (mock API call based on provided response)
        const reviewRes: ReviewResponse = await GetCustomerReview(); // Replace with actual API call

        setReviews(reviewRes.data);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      }
    };
    fetchData();
  }, []);

  // Mock review fetch function (replace with actual API)
  const fetchReviews = async (): Promise<ReviewResponse> => {
    return {
      status: "Success",
      message: "Reviews retrieved successfully.",
      data: [], // Replace with actual review data
    };
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for updating user data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace with actual API call to update user profile
      const updateRes = await UpdateProfileRequest(userData.userId, formData);

      if (updateRes?.status === "Success") {
        setUserData(formData);
        setIsEditing(false);
        setSuccess("Profile updated successfully.");
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };
  console.log("from review", reviews);
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Account Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        {/* User Profile Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Personal Information
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 font-medium">
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 outline-none block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 outline-none block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 outline-none block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full outline-none border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleInputChange}
                  className="mt-1  outline-none block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows={3}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData(userData);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {userData.firstName} {userData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {userData.address || "Not provided"}
              </p>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            My Reviews
          </h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">
              You haven't submitted any reviews yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review.id} className="border-b pb-4">
                  <p className="text-sm text-gray-600">
                    Product ID: {review.productId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rating: {review.rating}/5
                  </p>
                  <p className="text-gray-800">Comment: {review.comment}</p>
                  <p className="text-xs text-gray-500">
                    Posted on {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <div className="mt-5">
                    <Link to={`/products/${review.productId}`} className={`bg-yellow-600 text-white p-2 rounded`}>Show Product</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerAccount;
