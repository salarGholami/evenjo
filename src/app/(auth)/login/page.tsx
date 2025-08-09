"use client";

import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
  <div className="w-full overflow-hidden min-h-screen flex justify-center ">
      {/* بک‌گراند کامل */}
      <div className="absolute -top-[1050px] md:-top-[650px] inset-0 z-0 flex justify-center items-center">
        <div className="relative w-full h-[700px] rounded-full">
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
          <div className="relative w-[300px] h-[300px] rounded-full">
            <Image
              src="/images/background/overlay.png"
              alt="overlay background"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute -top-[380px] inset-0 z-0 flex justify-center items-center">
          <div className="relative w-[300px] h-[300px] rounded-full">
            <Image
              src="/images/background/overlay.png"
              alt="overlay background"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute -top-[380px] -left-96 inset-0 z-0 flex justify-center items-center">
          <div className="relative w-[300px] h-[300px] rounded-full">
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
      <div className="relative z-10 flex justify-center min-h-screen mt-10 md:mt-12">
        <LoginForm />
      </div>
    </div>
  );
}
