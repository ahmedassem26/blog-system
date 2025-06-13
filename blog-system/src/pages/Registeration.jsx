import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { PostsContext } from "../context/PostsContext";

function Registeration() {
  const { handleLogin } = useContext(PostsContext);
  const [mode, setMode] = useState("Login");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // form data
    alert(`${mode} successful!`);
    handleLogin();
    navigate("/");
  };

  const password = watch("password");

  // Reset form when mode changes
  const handleModeChange = (newMode) => {
    setMode(newMode);
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-base-300 rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex space-x-2 mb-4 ">
          <button
            type="button"
            onClick={() => handleModeChange("Login")}
            className={`px-4 py-2 rounded btn grow ${
              mode === "Login"
                ? "bg-purple-600  "
                : "bg-base-100 hover:bg-purple-700 transition-color"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("Signup")}
            className={`px-4 py-2 rounded btn grow ${
              mode === "Signup"
                ? "bg-purple-600 "
                : "bg-base-100 hover:bg-purple-700 transition-color"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.password.message}
            </span>
          )}
        </div>

        {mode === "Signup" && (
          <div>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 btn py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          {mode === "Login" ? "Log In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Registeration;
