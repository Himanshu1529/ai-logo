import React, { useEffect, useState } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import { Loader2Icon } from "lucide-react";
import axios from "axios";

function LogoIdea({ formData, onHandleInputChange }) {
  const [ideas, setIdeas] = useState([]); // State for storing generated ideas
  const [loading, setLoading] = useState(false); // State for showing the loader
  const [selectedOption, setSelectedOption] = useState(formData?.idea || ""); // Track selected idea

  useEffect(() => {
    // Trigger idea generation if required form fields are available
    if (formData?.design?.title && formData?.title && formData?.desc) {
      generateLogoDesignIdea();
    }
  }, [formData]);

  const generateLogoDesignIdea = async () => {
    setLoading(true);

    try {
      // Generate the prompt using the Prompt utility
      const prompt = Prompt.generate({
        logoType: formData?.design?.title || "default logo type",
        logoTitle: formData?.title || "default title",
        logoDesc: formData?.desc || "default description",
        logoPrompt: formData?.design?.prompt || "default prompt",
      });

      const result = await axios.post("/api/ai-design-ideas", { prompt });

      // Update state with generated ideas or fallback to empty array
      setIdeas(result.data?.ideas || []);
    } catch (error) {
      console.error("Error generating ideas:", error);
      setIdeas([]); // Ensure empty state on error
    } finally {
      setLoading(false); // Stop loader after API response
    }
  };

  const handleOptionSelect = (idea) => {
    setSelectedOption(idea); // Update selected option state
    onHandleInputChange("idea", idea); // Trigger parent callback
  };

  return (
    <div className="my-10">
      {/* Heading and Description */}
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
      <div className="flex items-center justify-center">
        {loading ? (
          // Show loading spinner
          <Loader2Icon className="animate-spin my-10" />
        ) : ideas.length > 0 ? (
          // Display generated ideas
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {ideas.map((idea, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(idea)}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedOption === idea
                    ? "border-primary"
                    : "hover:border-gray-300"
                }`}
              >
                <p>{idea}</p>
              </div>
            ))}
          </div>
        ) : (
          // Show fallback message if no ideas
          <p className="text-center mt-5 text-gray-500">
            No ideas generated yet. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}

export default LogoIdea;
