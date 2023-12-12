/* eslint-disable @next/next/no-img-element */
"use client";
import { ChangeEvent, useState, FormEvent } from "react";
import Dropdown from "./components/Dropdown";

export default function Home() {
  const [image, setImage] = useState<string>("");
  const [openAIResponse, setOpenAIResponse] = useState<string>("");
  const [exPrompt, setExPrompt] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("tailwind");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files === null) {
      window.alert("No file selected. Choose a file.");
      return;
    }
    const file = event.target.files[0];

    // Convert the users file (locally on their computer) to a base64 string
    // FileReader
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // reader.result -> base64 string ("ENTIRESTRING" -> :))
      if (typeof reader.result === "string") {
        console.log(reader.result);
        setImage(reader.result);
      }
    };

    reader.onerror = (error) => {
      console.log("error: " + error);
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (image === "") {
      alert("Upload an image.");
      return;
    }

    // POST api/analyzeImage
    await fetch("api/analyzeImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image, // base64 image
        style: selectedStyle,
      }),
    }).then(async (response: any) => {
      // Because we are getting a streaming text response
      // we have to make some logic to handle the streaming text
      const reader = response.body?.getReader();
      setOpenAIResponse("");
      // reader allows us to read a new piece of info on each "read"
      // "Hello" + "I am" + "Cooper Codes"  reader.read();
      while (true) {
        const { done, value } = await reader?.read();
        // done is true once the response is done
        if (done) {
          break;
        }

        // value : uint8array -> a string.
        var currentChunk = new TextDecoder().decode(value);
        setOpenAIResponse((prev) => prev + currentChunk);
      }
    });
  }

  async function handleReSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (image === "") {
      alert("Upload an image.");
      return;
    }

    // POST api/analyzeImage
    await fetch("api/analyzeImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image, // base64 image
        prevResponse: openAIResponse,
        exPrompt: exPrompt,
      }),
    }).then(async (response: any) => {
      // Because we are getting a streaming text response
      // we have to make some logic to handle the streaming text
      const reader = response.body?.getReader();
      setOpenAIResponse("");
      // reader allows us to read a new piece of info on each "read"
      // "Hello" + "I am" + "Cooper Codes"  reader.read();
      while (true) {
        const { done, value } = await reader?.read();
        // done is true once the response is done
        if (done) {
          break;
        }

        // value : uint8array -> a string.
        var currentChunk = new TextDecoder().decode(value);
        setOpenAIResponse((prev) => prev + currentChunk);
      }
    });
  }

  return (
    <div className="min-h-screen flex items-start justify-center text-md">
     
      <div className="bg-slate-800 w-full max-w-2xl rounded-lg shadow-md p-8">
        <Dropdown selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />
       
        <h2 className="text-xl font-bold mb-4">Uploaded Image</h2>
        {image !== "" ? (
          <div className="mb-4 overflow-hidden">
            <img
              alt="selected-image"
              src={image}
              className="w-full object-contain max-h-72"
            />
          </div>
        ) : (
          <div className="mb-4 p-8 text-center">
            <p>Once you upload an image, you will see it here.</p>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Upload Image</label>
            <input
              type="file"
              className="text-sm border rounded-lg cursor-pointer"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className="flex flex-col mb-6">
            <label className="mb-2 text-sm font-medium">Refacotor your code</label>
            <div className="flex gap-2">
              <input
                value={exPrompt}
                style={{ color: "black  " }}
                onChange={(e) => setExPrompt(e.target.value)}
                type="text"
                placeholder="Enter your text"
                className="form-input px-4 py-2 flex-1 border rounded border-gray-300 text-color-black"
              />
              <button
                className="p-2 bg-sky-600 rounded-md m-auto"
                onClick={(e: any) => handleReSubmit(e)}
              >
                resubmit
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="p-2 bg-sky-600 rounded-md mb-4">
              Ask ChatGPT To Analyze Your Image
            </button>
          </div>
        </form>

        {openAIResponse !== "" ? (
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-xl font-bold mb-2">AI Response</h2>
            <p>
              {openAIResponse.replaceAll("```html", "").replaceAll("```", "")}
            </p>
          </div>
        ) : null}
      </div>
      {openAIResponse !== "" && (
        <iframe
          style={{ height: "100vh" }}
          title="Preview"
          className="inset-0 w-full h-full bg-white"
          sandbox="allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals"
          srcDoc={`
        ${openAIResponse.replaceAll("```html", "").replaceAll("```", "")}
              `}
        />
      )}
    </div>
  );
}
