"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  const { user } = useUser();
  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={150} height={150} />
      <div className="flex gap-3 items-center">
        {user ? (
          <Button variant="outline">Dashboard</Button>
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
