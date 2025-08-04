import LoginForm from "../login/LoginForm";

const backgrounds = [
  {
    src: "/images/background/light.png",
    alt: "light background",
    className:
      "absolute -top-[910px] inset-0 z-0 flex justify-center items-center rounded-full",
  },
  {
    src: "/images/background/overlay.png",
    alt: "overlay background",
    className:
      "absolute -top-[380px] left-96 inset-0 z-0 flex justify-center items-center rounded-full",
  },
  {
    src: "/images/background/overlay.png",
    alt: "overlay background",
    className:
      "absolute -top-[380px] inset-0 z-0 flex justify-center items-center rounded-full",
  },
  {
    src: "/images/background/overlay.png",
    alt: "overlay background",
    className:
      "absolute -top-[380px] -left-96 inset-0 z-0 flex justify-center items-center rounded-full",
  },
];

export default function LoginPage() {
  return (
    <div className="w-full overflow-hidden relative">
      {backgrounds.map(({ src, alt, className }, index) => (
        <div key={index} className={className}>
          <img src={src} alt={alt} />
        </div>
      ))}

      <div className="relative z-10 flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
