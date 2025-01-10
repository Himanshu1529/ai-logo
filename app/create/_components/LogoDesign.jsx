import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import LogoDesig from "@/app/_data/LogoDesig";
import Image from "next/image";

function LogoDesign({ onHandleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {LogoDesig.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.title);
              onHandleInputChange(design);
            }}
            className={`p-1 rounded-xl cursor-pointer ${
              selectedOption === design.title
                ? "border-2 border-primary"
                : "hover:border-2 border-primary"
            }`}
          >
            <Image
              src={design.image}
              alt={design.title}
              width={250}
              height={250}
              className="w-full rounded-xl h-[100px] object-cover"
            />
            <p className="text-center mt-2 font-medium">{design.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesign;
