"use client";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
