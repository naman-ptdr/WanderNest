import { useState } from "react";
import API from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent");
    } catch (error) {
      setMessage("Error sending reset link");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-white flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot Password?
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm font-medium text-blue-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
