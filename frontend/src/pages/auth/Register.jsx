import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import apiRequestHandler from "../../services/ApiRequestHandler";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { login } = useAuth();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await apiRequestHandler(
        "/auth/register",
        "POST",
        userData
      );
      return response;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Registered Successfully");
        login(data?.user, data?.token);
        navigate("/dashboard");
        reset();
      } else {
        toast.error(data?.message || "Registration failed");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    if (!recaptchaToken) {
      toast.error("Please verify that you're not a robot");
      return;
    }

    if (data?.password !== data?.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    const userData = {
      email: data?.email,
      password: data?.password,
      recaptchaToken,
    };

    registerMutation.mutate(userData);
  };

  return (
    <div className="flex items-center  justify-center min-h-screen font-jakarta">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg  lg:max-w-4xl">
        {/* Form section */}
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <h1 className="md:text-2xl text-[18px] font-semibold text-secondary pb-4">
            Create Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="md:mt-4 mt-2">
            <div>
              <label
                className="block mb-1.5 text-xs md:text-sm  text-[#363636]"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`bg-background-secondary  outline-none border border-border w-full h-12 md:h-14 pl-4 rounded-lg`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="lg:mt-8 md:mt-6 mt-3 ">
              <div className="flex justify-between">
                <label
                  className="block mb-1.5 text-xs md:text-sm    text-[#363636]"
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
                  className={`bg-background-secondary  outline-none border border-border w-full h-12 md:h-14 pl-4 pr-12 rounded-lg`}
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
            </div>
            <div className="lg:mt-8 md:mt-6 mt-3">
              <div className="flex justify-between">
                <label
                  className="block mb-1.5 text-xs md:text-sm   text-[#363636]"
                  htmlFor="password"
                >
                  Confirm Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Password is required",
                  })}
                  className={`bg-background-secondary  outline-none border border-border w-full h-12 md:h-14 pl-4 pr-12 rounded-lg`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-center">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>

            <div className="mt-6 md:mt-8">
              <button
                type="submit"
                className="w-full cursor-pointer py-4 bg-primary text-sm font-semibold text-background rounded-md"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Creating...." : "Create Account"}
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
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
