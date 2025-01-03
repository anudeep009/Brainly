import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import axios from "axios";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/signin`,
        formData
      );

      toast.success("Signed in successfully!");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userid", response.data.userid);
      navigate("/");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      setFormError(errorMessage);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-[60px] min-h-[670px]">
      <div className="mx-auto max-w-[350px] space-y-6 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl text-white font-bold">Sign In</h1>
          <p className="text-white">
            Not a User?{" "}
            <Link to="/signup" className="text-white underline">
              Sign Up
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-white block font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-3 py-2 text-black border border-gray-300 rounded"
              />
              {formError && (
                <p className="text-red-500 text-sm">{formError}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-white block font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="px-8 py-3 ml-16 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
