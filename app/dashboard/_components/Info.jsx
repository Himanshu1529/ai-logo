"use client";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import React, { useContext } from "react";

function Info() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div>
      <div>
        <h2 className="font-bold text-3xl text-primary">
          Hello {userDetail?.userName}
        </h2>
        <div className="flex justify-between items-center mt-6">
          <h2 className="font-bold text-2xl">Dashboard</h2>
          <Link href="/create">
            <Button>+ Create New Logo</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Info;
