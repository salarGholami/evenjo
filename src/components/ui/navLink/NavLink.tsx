"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavLinkProps {
  path: string;
  children: React.ReactNode;
}

export default function NavLink({ path, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      className={clsx(
        "transition-colors duration-200 hover:text-tint-400",
          isActive ? "radial-gradient font-semibold" : "text-neutral-200" 
          
      )}
    >
      {children}
    </Link>
  );
}
