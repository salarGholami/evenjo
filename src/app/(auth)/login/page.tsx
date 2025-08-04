import LoginForm from "@/app/(auth)/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full overflow-hidden">
      {/* بک‌گراند کامل */}
      <div className="absolute -top-[910px]  inset-0  z-0 flex justify-center items-center rounded-full">
        <img
          src="/images/background/light.png"
          alt="light background"
          className=""
        />
      </div>

      <div className="flex">
        <div className="absolute -top-[380px] left-96 inset-0  z-0 flex justify-center items-center rounded-full">
          <img
            src="/images/background/overlay.png"
            alt="light background"
            className=""
          />
        </div>

        <div className="absolute -top-[380px] inset-0  z-0 flex justify-center items-center rounded-full">
          <img
            src="/images/background/overlay.png"
            alt="light background"
            className=""
          />
        </div>

        <div className="absolute -top-[380px] -left-96 inset-0  z-0 flex justify-center items-center rounded-full">
          <img
            src="/images/background/overlay.png"
            alt="light background"
            className=""
          />
        </div>
      </div>
      {/* محتوای روی بک‌گراند */}
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
}
