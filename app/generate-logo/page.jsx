"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { DownloadIcon, LayoutDashboardIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

function GenerateLogo() {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
        console.log("Loaded formData:", JSON.parse(storage));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  useEffect(() => {
    if (logoImage) {
      localStorage.removeItem("formData");
    }
  }, [logoImage]);

  const GenerateAILogo = async () => {
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData?.palette)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);

    console.log("Generated PROMPT:", PROMPT);

    try {
      const result = await axios.post("/api/ai-logo-model", {
        prompt: PROMPT,
        email: userDetail.email,
        title: formData.title,
        desc: formData.desc,
      });

      setLogoImage(result.data?.image);
    } catch (error) {
      console.error("Error generating AI logo:", error);
      toast("Failed to generate logo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onDownload = () => {
    if (!logoImage) {
      toast("No logo available to download.");
      return;
    }

    const link = document.createElement("a");
    link.href = logoImage; // Ensure `logoImage` is a valid URL or base64 image
    link.download = "generated_logo.png"; // Set the download filename
    link.click();

    toast("Logo has been downloaded.");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl text-primary font-bold p-5 mt-5">
        Your Logo is being Created
      </h2>
      <p>
        ⭐ Please wait a moment while we work our magic to bring your logo to
        life.
      </p>

      <div className="flex flex-col items-center justify-center">
        <h2>
          {loading ? (
            <img
              height={250}
              width={250}
              src="/waiting.gif"
              alt="Loading"
              className="m-auto"
            />
          ) : (
            "Your Logo"
          )}
        </h2>

        {!loading && logoImage && (
          <>
            <img
              src={logoImage}
              alt="Generated Logo"
              width={200}
              height={200}
              className="mt-4"
            />

            <div className="flex mt-4 items-center gap-5">
              <Button onClick={onDownload}>
                <DownloadIcon />
                Download
              </Button>
              <Link href={"/dashboard"}>
                <Button variant="outline">
                  <LayoutDashboardIcon />
                  Dashboard
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GenerateLogo;
