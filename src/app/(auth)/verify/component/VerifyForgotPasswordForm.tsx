"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const value = searchParams.get("value");

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setError(null);

    if (!code) {
      setError("Please enter the verification code.");
      return;
    }

    const savedOtp = localStorage.getItem("otp");

    if (code !== savedOtp) {
      setError("Invalid verification code.");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1500)); // شبیه‌سازی تاخیر

      alert("Verification successful! Redirecting to login...");
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Verification failed");
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

  return (
    <div className="max-w-md mx-auto p-6 mt-20 space-y-4 bg-neutral-900 rounded">
      <h1 className="text-xl font-semibold text-white">Verify your account</h1>
      <p className="text-white">
        Please enter the verification code sent to your <strong>{type}</strong>:{" "}
        <strong>{value}</strong>
      </p>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Verification code"
        className="w-full p-2 rounded border border-gray-600"
        maxLength={6}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleVerify}
        disabled={isLoading}
        className={`w-full py-2 rounded text-white font-semibold ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
}
