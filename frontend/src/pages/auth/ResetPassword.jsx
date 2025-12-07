import { useForm } from "react-hook-form";
import apiRequestHandler from "../../services/ApiRequestHandler";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequestHandler(
        "/auth/reset-password",
        "POST",
        data
      );
      return response;
    },

    onSuccess: async (data) => {
      if (data?.success) {
        toast.success("Password Reset Successfully");
        localStorage.removeItem("email");
        navigate("/");
        reset();
      }
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    const resetPassData = {
      email: email,
      newPassword: data.newPassword,
    };
    await mutation.mutateAsync(resetPassData);
  };

  return (
    <div className="flex items-center  justify-center min-h-screen font-jakarta">
      <section className="max-w-md max-md:mx-4 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-10 md:px-6 px-5 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)] rounded-2xl border border-border"
        >
          <h1 className="text-secondary font-semibold text-[18px] md:text-2xl ">
            Forget Password
          </h1>
          <p className="py-3 md:py-4 text-xs md:text-sm text-tertiary">
            Enter your email, and we’ll send you simple steps to reset your
            password.
          </p>
          <hr className="border-none h-[1px] bg-border md:mb-10 mb-6" />
          <div className="mb-3">
            <label
              className="block mb-1.5 text-xs md:text-sm   text-[#363636]"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: "New Password is required",
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
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="mb-6 md:mb-8">
            <label
              className="block mb-1.5 text-xs md:text-sm   text-[#363636]"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className={`bg-background-secondary  outline-none border-[1px] border-border w-full h-[56px] pl-4 pr-12 rounded-[8px]`}
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
          <button
            type="submit"
            className="w-full py-4 bg-primary text-sm font-semibold text-background rounded-md cursor-pointer"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "  Sending..." : "Send"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ResetPassword;
