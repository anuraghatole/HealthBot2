import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const { recommendations } = location.state || { recommendations: "" };
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < recommendations.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + recommendations[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 10); // Adjust the speed of typing effect here

      return () => clearTimeout(timer);
    }
  }, [currentIndex, recommendations]);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-5">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Recommendations</h1>
        <div
          className="text-lg leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: displayedText || "Sorry, something went wrong while generating recommendations." }}
        />
      </div>
    </div>
  );
};

export default Result;
