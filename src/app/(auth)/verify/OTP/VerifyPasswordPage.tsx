"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import OtpInput from "./OtpInput";
import RHFSubmitButton from "@/components/ui/form/RHFSubmitButton";

export default function VerifyPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const value = searchParams.get("value");

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [timer, setTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const timerActive = useRef(false);


  useEffect(() => {
    timerActive.current = true;
  }, []);


  useEffect(() => {
    if (!timerActive.current) return;

    if (timer === 0) {
      setCanResend(true);
      timerActive.current = false; 
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    alert(`Resend OTP to your ${type}: ${value}`);

    setTimer(90);
    setCanResend(false);
    setIsSent(true);
    timerActive.current = true;
  };

  const handleVerify = async () => {
    setError(null);
    if (code.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    const savedOtp = localStorage.getItem("otp");
    if (code !== savedOtp) {
      setError("Invalid verification code.");
      return;
    }
    try {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      alert("Verification successful! Redirecting to login...");
      router.push("/login");
    } catch {
      setError("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!type || !value) {
    return (
      <div className="max-w-md mx-auto p-6 mt-20 text-center text-red-600">
        Missing verification data in URL.
      </div>
    );
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="max-w-md mx-auto p-6 mt-20 space-y-4 bg-neutral-900 rounded text-white">
      <h1 className="text-2xl font-semibold text-center">Evenjo</h1>
      <p className="text-center text-sm mb-6">
        {isSent && canResend ? (
          "Request sent successfully!"
        ) : (
          <>
            Verification code sent to your <strong>{type}</strong>: <br />
            <span className="break-all">{value}</span>
          </>
        )}
      </p>

      <OtpInput length={6} onChange={setCode} />

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      <RHFSubmitButton
        onClick={handleVerify}
        disabled={isLoading || code.length !== 6}
        isLoading={isLoading}
      >
        Confirm
      </RHFSubmitButton>

      <div className="flex justify-between mt-4 text-sm w-full" >
        <div className="flex  w-full">
          {canResend ? (
            <div className="flex justify-between w-full">
              <button
                onClick={handleResend}
                className="hover:text-tint-600"
                type="button"
              >
                Resend verification code
              </button>
              <span className="text-sm">Time finished</span>
            </div>
          ) : (
            <span className="text-neutral-400">Didn't receive the code?</span>
          )}
        </div>

        {!canResend && (
          <p className="text-neutral-400">
            Resend code in {minutes}:{seconds.toString().padStart(2, "0")}
          </p>
        )}
      </div>
    </div>
  );
}
