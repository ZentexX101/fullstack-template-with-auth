import { useForm } from "react-hook-form";
import apiRequestHandler from "../../services/ApiRequestHandler";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequestHandler(
        "/auth/forgot-password",
        "POST",
        data
      );
      return response;
    },

    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success("OTP Sent to your email successfully. Please check.");
        localStorage.setItem("email", variables.email);
        navigate("/verify-otp");
        reset();
      }
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = async (data) => {
    localStorage.setItem("email", data.email);
    await mutation.mutateAsync(data);
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
            Enter your email, and we'll send you simple steps to reset your
            password.
          </p>
          <hr className="border-none h-[1px] bg-border md:mb-10 mb-6" />
          <div className="mb-6 md:mb-8">
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

export default ForgotPassword;
