import { AILogoPrompt } from "@/app/configs/AiModel";
import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/app/configs/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    // Extract the prompt from the request body
    const { prompt, email, title, desc } = await req.json();

    // Validate the prompt
    if (!prompt) {
      throw new Error("Prompt is missing from the request body.");
    }

    // Generate AI prompt using AILogoPrompt
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);

    // Await and parse the response text
    const responseText = await AiPromptResult.response.text();

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch {
      throw new Error("Failed to parse AI response as JSON.");
    }

    // Extract the 'prompt' field from the response
    const AIPrompt = parsedResponse?.prompt;

    // Validate the extracted prompt
    if (!AIPrompt) {
      throw new Error("The response does not contain a valid 'prompt' field.");
    }

    // Send the AI-generated prompt to Hugging Face API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA",
      { inputs: AIPrompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    // Convert the response to base64
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

    try {
      // Generate a unique document ID based on the current timestamp
      const uniqueId = Date.now().toString();

      // Save the image and metadata to Firestore
      await setDoc(doc(db, "user", email, "logos", uniqueId), {
        image: base64ImageWithMime, // Ensure this is a valid base64 string with MIME type
        title: title, // Replace 'title' with the actual title value
        desc: desc, // Replace 'desc' with the actual description value
      });

      console.log("Image and metadata saved successfully!");
    } catch (error) {
      console.error("Error saving image and metadata:", error);
    }

    // Return the AI prompt and image in JSON format
    return NextResponse.json({
      prompt: AIPrompt,
      image: base64ImageWithMime,
    });
  } catch (error) {
    console.error("Error in POST handler:", error.message);

    // Return an error response
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
