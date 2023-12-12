"use client";
import React from "react";
import useLoader from "../hooks/useLoader";
import MyLoader from './MyLoader'
// import styles from './Loader.css'

const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;
  // if(true) return null;

  const noClicks = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        background: "rgba(255,255,255,0.3)",
      }}
      className="absolute-top h-screen w-screen flex items-center justify-center bg-opacity-80"
      onClick={noClicks}
    >
      <MyLoader/>
    </div>
  );
};

export default Loader;
