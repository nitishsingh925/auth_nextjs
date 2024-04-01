"use client";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const verifyUserEmail = async () => {
    try {
      const response = await fetch("/api/users/verifyemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        setVerified(true);
        setErrorMessage("");
      } else {
        setVerified(false);
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to verify email");
      }
    } catch (error: any) {
      console.error("Error verifying email:", error.message);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const handleVerifyClick = () => {
    verifyUserEmail();
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl">Verify Email</h1>
      {!verified && (
        <>
          {" "}
          {/* Wrap conditional content for better readability */}
          <button
            onClick={handleVerifyClick}
            className="mt-5 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Verify Email
          </button>
          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}
        </>
      )}
      {verified && (
        <p className="text-green-500 text-center">Email verified!</p>
      )}
    </div>
  );
};

export default VerifyEmailPage;
