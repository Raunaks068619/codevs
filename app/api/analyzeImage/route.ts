import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getApiKey, getPromptFromMode } from "../../helper/common";

export const runtime = "edge";
const apiKey = getApiKey();

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

// Route Handlers let us create API logic
// POST api/analyzeImage
export async function POST(request: Request) {
  // { image: "ASDFASDFASDF base64 string" }
  const { image, prevResponse, exPrompt, style } = await request.json();
  const prompt: string = getPromptFromMode(style);

  const response = await openai.createChatCompletion({
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: [
          exPrompt
            ? {
                type: "text",
                text: `${prompt} : ${exPrompt} : ${prevResponse}`,
              }
            : { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: image || '', // base64 images
          },
        ],
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
