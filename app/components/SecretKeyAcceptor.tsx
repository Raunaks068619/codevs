"use client";
import React, { useState, useEffect } from "react";

const SecretKeyAcceptor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event: any) => {
    window.localStorage.setItem("open-ai-secret-key", apiKey);
    const openApiKey = window.localStorage.getItem("open-ai-secret-key");
    if (openApiKey) return setIsModalOpen(false);
  };

  useEffect(() => {
    const openApiKey = window.localStorage.getItem("open-ai-secret-key");
    if (!openApiKey) return setIsModalOpen(true);
  }, [isModalOpen]);

  return (
    <div className=" flex items-center justify-center">
      {/* Modal */}
      {isModalOpen && (
        <div className="modal fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50">
          <div className="modal-content bg-white w-1/3 mx-auto my-8 p-6 rounded shadow">
            {/* Input Field */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="apiKey"
            >
              Enter your API Key:
            </label>
            <input
              type="text"
              style={{ color: "black" }}
              className="w-full border p-2 mt-4"
              placeholder="Enter something"
              value={apiKey}
              onChange={(event: any) => {
                setApiKey(event.target.value);
              }}
            />
            <button
              onClick={(e: any) => {
                handleSubmit(e);
              }}
              className="mt-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretKeyAcceptor;
