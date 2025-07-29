"use client";

import Button from "@/components/ui/Button/Button";
import React from "react";

export default function Home() {
  return (
    <div className="w-screen">
      <div className="container mx-auto">
        <Button onClick={() => console.log("Button clicked!")}>Click Me</Button>
      </div>
    </div>
  );
}
