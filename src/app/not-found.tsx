"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative w-full h-screen">
      {/* بک‌گراند فیکس تمام‌صفحه */}
      <div
        className="fixed top-0 left-0 w-full h-full z-[-20] bg-no-repeat bg-[length:100%_100%] bg-center"
        style={{ backgroundImage: "url('/images/background/404.png')" }}
      />

      {/* محتوای صفحه در مرکز */}
      <div className="relative z-10 flex justify-center h-full ">
        <div className="relative container max-w-screen text-white">
          {/* عکس تزئینی تکراری فقط در container */}
          <div className="absolute inset-0 z-[-1] bg-[url('/images/background/overlay.png')] bg-repeat" />

          {/* محتوای متنی وسط‌چین شده */}
          <div className="flex mt-12 items-center flex-col h-full text-center">
            <p className="text-xl max-w-sm text-white/80 drop-shadow">
              Oops! The page you&apos;re looking for doesn&apos;t exist or may
              have been moved.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block px-6 py-2 bg-tint-500 text-white rounded-md font-medium hover:bg-tint-400 transition"
            >
              back to Home Page
            </Link>

            <h1 className="text-[200px] font-extrabold drop-shadow-md">404</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
