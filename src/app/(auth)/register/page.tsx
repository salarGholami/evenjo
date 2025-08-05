"use client";

import Image from "next/image";
import RegisterForm from "./RegisterForm";
import { RegisterFormValues } from "./registerSchema";

export default function LoginPage() {
  const handleRegister = (data: RegisterFormValues) => {
    console.log("User registered:", data);
  };

  return (
    <div className="w-full overflow-hidden min-h-screen">
      {/* بک‌گراند کامل */}
      <div className="absolute -top-[1050px] md:-top-[1550px] inset-0 z-0 flex justify-center items-center">
        <div className="relative w-full h-full rounded-full">
          <Image
            src="/images/background/light.png"
            alt="light background"
            fill
            className=" absolute inset-0"
          />
        </div>
      </div>

      <div className="flex">
        <div className="absolute -top-[380px] left-96 inset-0 z-0 flex justify-center items-center">
          <div className="relative w-[600px] h-[600px] rounded-full">
            <Image
              src="/images/background/overlay.png"
              alt="overlay background"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute -top-[380px] inset-0 z-0 flex justify-center items-center">
          <div className="relative w-[600px] h-[600px] rounded-full">
            <Image
              src="/images/background/overlay.png"
              alt="overlay background"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute -top-[380px] -left-96 inset-0 z-0 flex justify-center items-center">
          <div className="relative w-[600px] h-[600px] rounded-full">
            <Image
              src="/images/background/overlay.png"
              alt="overlay background"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* محتوای روی بک‌گراند */}
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  );
}
