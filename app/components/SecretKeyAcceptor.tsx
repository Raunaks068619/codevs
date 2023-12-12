"use client";
import React, { useState, useEffect } from "react";

const SecretKeyAcceptor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const openApiKey = window.localStorage.getItem("open-ai-secret-key");
    if (!openApiKey) return setIsModalOpen(true);
    if (isModalOpen) return setIsModalOpen(false);
  }, [isModalOpen]);

  return (
    <div className=" flex items-center justify-center">
      {/* Modal */}
      {isModalOpen && (
        <div className="modal fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50">
          <div className="modal-content bg-white w-1/3 mx-auto my-8 p-6 rounded shadow">
            {/* Modal Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 cursor-pointer"
            >
              <span className="text-2xl">&times;</span>
            </button>

            {/* Input Field */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="apiKey"
            >
              Enter your API Key:
            </label>
            <input
              type="text"
              style={{ color: "black  " }}
              className="w-full border p-2 mt-4"
              placeholder="Enter something"
            />

            {/* Additional Modal Content */}
            {/* Add your modal content here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretKeyAcceptor;
