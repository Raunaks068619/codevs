import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"

export const runtime = 'edge';

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

// Route Handlers let us create API logic
// POST api/analyzeImage
export async function POST(request: Request) {
    // { image: "ASDFASDFASDF base64 string" }
    const { image, prevResponse, exPrompt } = await request.json();
    const prompt: string = `You are an expert Tailwind developer
    You take screenshots of a reference web page from the user, and then build single page apps 
    using Tailwind, HTML and JS.
    You might also be given a screenshot(The second image) of a web page that you have already built, and asked to
    update it to look more like the reference image(The first image).
    
    - Make sure the app looks exactly like the screenshot.
    - Pay close attention to background color, text color, font size, font family, 
    padding, margin, border, etc. Match the colors and sizes exactly.
    - Use the exact text from the screenshot.
    - Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
    - Repeat elements as needed to match the screenshot. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
    - For images, use placeholder images from https://placehold.co and include a detailed description of the image in the alt text so that an image generation AI can generate the image later.
    
    In terms of libraries,
    
    - Use this script to include Tailwind: <script src="https://cdn.tailwindcss.com"></script>
    - You can use Google Fonts
    - Font Awesome for icons: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
    
    Return only the full code in <html></html> tags.

    - and only provide code not any other text explaining the code.
    - Do not include any other text or comments in the code.

    very important : code should be refactored and clean. check beofre submitting.
    strictlyt followe all instructions.

    do not add baptics at end and start.
    `;
    
    const response = await openai.createChatCompletion({
        model: "gpt-4-vision-preview",
        stream: true,
        max_tokens: 4096, // No max tokens: super short / cut off response.
        messages: [ // GPT-4 with Vision is JUST GPT-4. So you can still talk with it like GPT-4
            // There is no "system" message (THIS MAY CHANGE)
            {
                role: "user",
                //@ts-ignore
                content: [
                    exPrompt ? { type: "text", text: `${prompt} : ${exPrompt} : ${prevResponse}` } : { type: "text", text: prompt },
                    {
                        type: "image_url",
                        image_url: image // base64 images
                    }
                ]
            }
        ]
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}