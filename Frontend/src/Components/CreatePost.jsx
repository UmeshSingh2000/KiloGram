import { MoveLeft, MoveRight } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function CreatePost({ onClose }) {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelectClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    const invalidFile = selectedFiles.find(file => !file.type.startsWith("image/"));
    if (invalidFile) {
      toast.error("Please select only image files");
      return;
    }

    const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
    setFiles(selectedFiles);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % previews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + previews.length) % previews.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative bg-[#262626] text-white rounded-xl w-[90%] max-w-[600px] min-h-[400px] flex flex-col items-center px-4 py-6 shadow-2xl">
        {/* Close Button */}
        <button
          className="absolute cursor-pointer top-4 right-4 p-1 text-gray-400 hover:text-white"
          onClick={() => onClose("Home")}
          aria-label="Close"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h3 className="font-medium text-lg mb-6">Create new post</h3>

        {/* Image Preview Slider */}
        {previews.length > 0 ? (
          <div className="relative w-full h-[300px] mb-4 flex items-center justify-center">
            <img
              src={previews[currentIndex]}
              alt={`preview-${currentIndex}`}
              className="w-full h-full object-contain rounded-md"
            />

            {/* Prev Button */}
            {previews.length > 1 && (
              <>
                <button
                  className="absolute left-2 cursor-pointer bg-black bg-opacity-40 text-white px-2 py-1 rounded-full hover:bg-opacity-70"
                  onClick={handlePrev}
                >
                  <MoveLeft />
                </button>

                {/* Next Button */}
                <button
                  className="absolute cursor-pointer right-2 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full hover:bg-opacity-70"
                  onClick={handleNext}
                >
                  <MoveRight />
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-[#363636] rounded-full w-[70px] h-[70px] flex items-center justify-center mb-6">
            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="4" fill="#444" />
              <path
                d="M7.5 15.5L10.5 12.5L13.5 15.5L16.5 12.5"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="9" r="1.5" fill="#fff" />
            </svg>
          </div>
        )}

        <p className="text-base text-white mb-7 text-center">
          {previews.length === 0 && "Drag photos here"}
        </p>

        {/* File Input */}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          ref={inputRef}
        />

        {/* Select Button */}
        {files.length > 0 ?
          <button className="bg-[#3897f0] text-white font-semibold text-[15px] cursor-pointer rounded-md px-4 py-2 hover:bg-blue-600">Next</button> :
          <button
            className="bg-[#3897f0] text-white font-semibold text-[15px] cursor-pointer rounded-md px-4 py-2 hover:bg-blue-600"
            onClick={handleSelectClick}
          >
            Select from computer
          </button>
        }
      </div>
    </div>
  );
}
