"use client";
import Link from "next/link";
import Image from "next/image";

type AvatarProps = {
  href?: string;
  src: string;
  size?: number;
};

export default function Avatar({
  href = "/dashboard",
  src,
  size = 32,
}: AvatarProps) {
  return (
    <Link href={href}>
      <div
        className="relative cursor-pointer rounded-full ring-1 ring-secondary-300 overflow-hidden"
        style={{ width: size, height: size }}
      >
        <Image src={src} alt="User Avatar" fill className="object-cover" />
      </div>
    </Link>
  );
}
