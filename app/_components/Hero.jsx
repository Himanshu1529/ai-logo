"use client";
import React, { useState, useEffect, useContext } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Ensure this is imported
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { collection, getDocs } from "firebase/firestore"; // Ensure correct Firebase imports
import { db } from "@/app/configs/FirebaseConfig";
function Hero() {
  const [logoTitle, setLogoTitle] = useState("");
  const { userDetail } = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState([]);

  useEffect(() => {
    if (userDetail) {
      fetchUserLogos();
    }
  }, [userDetail]);

  const fetchUserLogos = async () => {
    if (!userDetail?.email) {
      console.error("User email is undefined.");
      return;
    }

    try {
      const querySnapshot = await getDocs(
        collection(db, "user", userDetail.email, "logos")
      );
      const logos = querySnapshot.docs.map((doc) => doc.data());
      setLogoList(logos);
    } catch (error) {
      console.error("Error fetching user logos:", error);
    }
  };

  const viewLogo = (image) => {
    const imageWindow = window.open("", "_blank");
    if (imageWindow) {
      imageWindow.document.write(
        `<html><body style="margin:0;"><img src="${image}" style="width:100%;height:auto;" alt="logo"></body></html>`
      );
    }
  };

  return (
    <div className="flex items-center mt-24 flex-col gap-5">
      <h2 className="text-primary text-5xl text-center font-bold">
        {Lookup.HeroHeading}
      </h2>
      <h2 className="text-4xl text-center font-semibold">
        {Lookup.HeroSubHeading}
      </h2>
      <p className="text-lg text-gray-500">{Lookup.HeroDesc}</p>
      <div className="flex gap-6 w-full items-center max-w-2xl mt-10">
        <input
          type="text"
          value={logoTitle}
          placeholder={Lookup.InputTitlePlaceholder}
          className="p-3 rounded-md w-full shadow-md"
          onChange={(event) => setLogoTitle(event.target.value)}
        />
        <Link href={`/create?title=${encodeURIComponent(logoTitle)}`}>
          <Button className="w-full p-5">Get Started</Button>
        </Link>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {logoList?.length > 0
            ? logoList.map((logo, index) => (
                <div
                  key={index}
                  className="hover:scale-105 transition-all cursor-pointer"
                  onClick={() => viewLogo(logo?.image)}
                >
                  <Image
                    src={logo?.image}
                    width={400}
                    height={200}
                    className="w-full rounded-xl"
                    alt={`Logo ${index + 1}`}
                  />
                  <h2 className="text-center text-lg font-medium mt-2">
                    {logo?.title}
                  </h2>
                  <p className="text-sm text-gray-500 text-center">
                    {logo?.desc}
                  </p>
                </div>
              ))
            : Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-slate-200 animate-pulse rounded-xl w-full h-[200px]"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
