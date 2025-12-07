import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import apiRequestHandler from "../../services/ApiRequestHandler";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const VerifyOtp = () => {
  const { handleSubmit, reset, control, setValue, trigger } = useForm();

  const inputsRef = useRef([]);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequestHandler(
        "/auth/verify-otp",
        "POST",
        data
      );
      return response;
    },

    onSuccess: async (data) => {
      if (data?.success === true) {
        toast.success("Otp verified successfully");
        navigate("/reset-password");
        reset();
      }
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = async (data) => {
    const code = Object.values(data).join("");
    if (code.length !== 6) {
      toast.error("Please enter a valid code");
      return;
    }
    const verifyData = { email, otp: code };

    // navigate("/reset-password");
    await mutation.mutateAsync(verifyData);
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      setValue(`digit${index + 1}`, value);
      trigger(`digit${index + 1}`);
      if (index + 1 < 6) {
        inputsRef.current[index + 1]?.focus();
      }
    } else {
      setValue(`digit${index + 1}`, "");
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const paste = e.clipboardData?.getData("text") || "";
    const digits = paste.replace(/\D/g, "").slice(0, 6 - index);
    if (!digits) return;

    for (let i = 0; i < digits.length; i++) {
      const pos = index + i;
      setValue(`digit${pos + 1}`, digits[i]);
      trigger(`digit${pos + 1}`);
    }

    const focusIndex = Math.min(index + digits.length, 5);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-jakarta px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-10 md:px-6 px-5 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.05)] rounded-2xl border border-border max-w-md w-full"
      >
        <h2 className="text-2xl text-secondary font-semibold mb-4 text-center">
          Verify your OTP
        </h2>
        <p className="text-tertiary text-sm mb-8 text-center">
          We just sent a 6-digit code to <br />
          {email}, enter it below
        </p>
        <p className="text-tertiary text-sm mb-2">Code</p>
        <div className="flex  items-center gap-2 mb-2 ">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center">
              <Controller
                name={`digit${index + 1}`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    ref={(el) => (inputsRef.current[index] = el)}
                    maxLength={1}
                    inputMode="numeric"
                    onChange={(e) => handleInput(e, index)}
                    onPaste={(e) => handlePaste(e, index)}
                    className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] text-xl text-center bg-background-secondary rounded-sm outline-none"
                  />
                )}
              />
              {index === 2 && (
                <span className="text-sm text-[#191C4D] mx-1">-</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-tertiary mt-2">This field is required</p>

        <p className="text-xs text-tertiary text-center my-6">
          Don’t see a code?{" "}
          <button
            type="button"
            onClick={() => alert("Resent!")}
            className="text-[#00A46B] font-medium"
          >
            Resend to email
          </button>
        </p>

        <button
          type="submit"
          className="w-full py-4 bg-primary text-sm font-semibold text-background rounded-md cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
