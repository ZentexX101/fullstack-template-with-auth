import toast from "react-hot-toast";
import apiRequestHandler from "../../services/ApiRequestHandler";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { setUser, login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planName = searchParams.get("plan_name");
  const billingCycle = searchParams.get("billing_cycle");
  const [showPassword, setShowPassword] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequestHandler("/auth/login", "POST", data);
      return response;
    },

    onSuccess: async (data) => {
      const token = data?.data?.token;
      const user = data?.data?.user;

      if (!token) return;
      if (user?.isVerified === false) {
        toast.error("Please verify your email before logging in.");
        return;
      }

      toast.success("Sign in successfully completed");

      // Save user and token
      login(user, token);
      setUser(user);

      // Default redirect
      navigate("/");
      reset();
    },
    onError: () => {
      toast.error("Sign in failed");
    },
  });

  const onSubmit = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className="flex items-center  justify-center min-h-screen font-jakarta">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg  lg:max-w-4xl">
        {/* Form section */}
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <h1 className="text-2xl font-semibold text-secondary pb-4">Login</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="md:mt-4 mt-2">
            <div>
              <label
                className="block mb-1.5 text-xs md:text-sm   text-[#363636]"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`bg-background-secondary  outline-none border-[1px] border-border w-full h-[48px] md:h-[56px] pl-4 rounded-[8px]`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="lg:mt-8 md:mt-6 mt-3">
              <div className="flex justify-between">
                <label
                  className="block mb-1.5 text-xs md:text-sm   text-[#363636]"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`bg-background-secondary  outline-none border-[1px] border-border w-full h-[48px] md:h-[56px] pl-4 pr-12 rounded-[8px]`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
              <Link
                to="/forgot-password"
                className="text-xs md:text-sm  pt-1.5 text-tertiary "
              >
                Forget Password?{" "}
              </Link>
            </div>

            <div className="md:mt-8 mt-6">
              <button
                type="submit"
                className="w-full py-4 bg-primary text-sm font-semibold text-background rounded-md"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Signing In..." : "Sign In"}
              </button>
            </div>

            <div className="flex items-center justify-between md:mt-6 mt-4">
              <span className="border-b-[#C8C8C8] border-b w-[40%]"></span>
              <a href="#" className="text-xs text-tertiary">
                or
              </a>
              <span className="border-b-[#C8C8C8] border-b w-[40%]"></span>
            </div>
            <p className="text-sm text-tertiary max-w-[250px] text-center mx-auto mb-6">
              By continuing you agree to the{" "}
              <span className="text-primary underline font-medium">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="text-primary underline font-medium">
                Terms & Condition
              </span>
            </p>
            <p className="text-center text-tertiary text-sm ">
              Don't have an account?{" "}
              {searchParams.get("plan_name") ? (
                <Link
                  to={`/register?plan_name=${planName}&billing_cycle=${
                    billingCycle || "monthly"
                  }`}
                  className="text-primary underline"
                >
                  Sign Up
                </Link>
              ) : (
                <Link to={"/register"} className="text-primary underline">
                  Sign Up
                </Link>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
