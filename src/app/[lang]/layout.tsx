import { Options } from "@/components/language-option";
import React from "react";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" py-2">
      <div className=" flex w-full items-center justify-between px-4 pb-6">
        <h1 className=" text-foreground text-4xl font-extrabold">
          Learn <span className=" text-primary">Javascript</span>
        </h1>
        <Options />
      </div>
      {children}
    </div>
  );
}
