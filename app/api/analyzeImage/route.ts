// "use client";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getApiKey, getPromptFromMode } from "../../helper/common";

export const runtime = "edge";
// const apiKey = getApiKey();


// Route Handlers let us create API logic
// POST api/analyzeImage
export async function POST(request: Request) {
  // { image: "ASDFASDFASDF base64 string" }
  const { image, prevResponse, exPrompt, style, apiKey } = await request.json();

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  const openai = new OpenAIApi(configuration);
  const prompt: string = getPromptFromMode(style);

  const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: JSON.parse(JSON.stringify(
          [
            exPrompt
              ? `${prompt} : ${exPrompt} : ${prevResponse}`
              : prompt,
            {
              type: "image_url",
              image_url: image, // base64 images
            },
          ],
        )),
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
