const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Example for interacting with the API
export const AILogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generated Prompt: Generate a text prompt to create a logo using a color combination of Ocean Blues and incorporating the Custom Luxury Logos Design design idea. The prompt should generate a logo for the brand name: India , with the description: Beautiful logo .",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Okay, here are a few options for text prompts, playing with slightly different nuances to try and get the best result:\n\n**Option 1 (Short & Direct):**\n\n> "Create a beautiful, custom luxury logo for the brand \'India\'. Use a color palette of ocean blues. Design should evoke a sense of high-end, custom luxury."\n\n**Option 2 (More Descriptive):**\n\n> "Design a beautiful logo for the brand \'India\', using a luxurious aesthetic and a color scheme of various shades of ocean blue. The logo should have a custom luxury feel, conveying sophistication and elegance."\n\n**Option 3 (Emphasis on Design Elements):**\n\n> "Generate a logo for the brand \'India\', embodying the style of a \'Custom Luxury Logo Design\'. The logo should be beautiful and use a palette of rich ocean blues. Consider elegant typography and refined visual elements to convey a sense of bespoke luxury."\n\n**Option 4 (A Bit More Specific):**\n\n> "Craft a beautiful, high-end logo for the brand \'India\'. Use a color combination of deep and light ocean blues. The logo design should align with \'Custom Luxury Logos,\' emphasizing clean lines, sophistication, and a sense of bespoke quality."\n\n**Key Takeaways & Why These Prompts Work:**\n\n* **"Beautiful Logo":** This is directly from your description, ensuring the AI focuses on aesthetics.\n* **"Custom Luxury Logo Design":** This specifies the desired style, giving the AI a specific framework to work within.\n* **"Ocean Blues":** This dictates the color palette.\n* **"Brand \'India\'":** Clearly specifies the brand for which the logo is being designed.\n* **Keywords:** Words like "sophistication," "elegance," "refined," "bespoke," "high-end," and "clean lines" help reinforce the "luxury" concept.\n* **Variety:** The prompts offer slightly different ways of phrasing the same core idea, which can lead to different and possibly more creative interpretations from the AI.\n\n**Tips for Use:**\n\n* **Iterate:** If you don\'t get the desired result with the first prompt, try a different variation or refine the prompt with more specific instructions based on the initial output.\n* **Experiment:** Don\'t be afraid to try different AI image generators and see which one best interprets your prompts.\n\nGood luck! Let me know if you\'d like any more variations!\n',
        },
      ],
    },
  ],
});
