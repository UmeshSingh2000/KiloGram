import axios from "axios";
import { MoveLeft, MoveRight, X, MapPin, Users, ChevronDown } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from 'react-hot-toast';
import { useSelector } from "react-redux"
import StatusCodes from "../helpers/statusCodes";
import Loader from "./Loader/Loader";
import { createPost } from "../Service/postService";

const api = import.meta.env.VITE_BACKEND_API

export default function CreatePost({ onClose }) {
  const { user } = useSelector((state) => state.auth)


  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]); // uploaded image files
  const [currentIndex, setCurrentIndex] = useState(0);
  const [descriptionActive, setDescriptionActive] = useState(false);
  const [description, setDescription] = useState("");
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleSelectClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    const invalidFile = selectedFiles.find(file => !file.type.startsWith("image/"));
    if (invalidFile) {
      alert("Please select only image files");
      return;
    }

    const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
    setFiles(selectedFiles);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % previews.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + previews.length) % previews.length);
  };

  const handleBack = () => {
    setDescriptionActive(false);
  };

  const handleShare = async () => {
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("content", description)

      files.forEach((file) => {
        formData.append("image", file)
      })
      const token = localStorage.getItem('token')
      const res = await createPost(formData, token)

      if (res.status === StatusCodes.CREATED) {
        toast.success(res.data.message)
        onClose("Home")
      }
      else if (res.status === StatusCodes.NO_CONTENT) {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 sm:p-4">
      {
        loading ? <div className="flex justify-center items-center h-screen"><Loader /></div> :
          <div className={`
        relative bg-[#262626] text-white rounded-xl shadow-2xl overflow-hidden
        w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-5xl
        h-full max-h-[90vh] sm:max-h-[85vh]
        flex flex-col
        ${descriptionActive ? 'md:flex-row' : ''}
      `}>

            {/* Header - Mobile Only */}
            <div className="flex items-center justify-between p-4 border-b border-[#343434] md:hidden">
              {descriptionActive ? (
                <>
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-[#333] rounded-full transition-colors"
                    aria-label="Back"
                  >
                    <MoveLeft size={20} />
                  </button>
                  <h3 className="font-medium text-base">New post</h3>
                  <button
                    onClick={handleShare}
                    className="text-[#3897f0] font-semibold text-sm px-3 py-1 hover:text-blue-400 transition-colors"
                  >
                    Share
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onClose("Home")}
                    className="p-2 hover:bg-[#333] rounded-full transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                  <h3 className="font-medium text-base">Create new post</h3>
                  <div className="w-8" /> {/* Spacer */}
                </>
              )}
            </div>

            {/* Left Panel - Image selector and preview */}
            <div className={`
          flex flex-col items-center justify-center relative
          ${descriptionActive ? 'w-full md:w-1/2 lg:w-3/5' : 'w-full'}
          ${descriptionActive ? 'px-4 py-4 sm:px-6 sm:py-6' : 'px-4 py-6 sm:px-8 sm:py-8'}
          flex-1 min-h-0
        `}>

              {/* Close Button - Desktop Only */}
              <button
                className="hidden md:block absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-[#333] rounded-full transition-colors z-10"
                onClick={() => onClose("Home")}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Header - Desktop Only */}
              {!descriptionActive && (
                <h3 className="hidden md:block font-medium text-lg mb-6 text-center pt-8">
                  Create new post
                </h3>
              )}

              {/* Image Preview Area */}
              <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
                {previews.length > 0 ? (
                  <div className="relative w-full flex-1 max-h-full mb-4 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                    <img
                      src={previews[currentIndex]}
                      alt={`preview-${currentIndex}`}
                      className="w-full h-full object-contain rounded-md max-h-full"
                    />

                    {/* Navigation buttons */}
                    {previews.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-colors"
                          onClick={handlePrev}
                          aria-label="Previous image"
                        >
                          <MoveLeft size={18} />
                        </button>
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-colors"
                          onClick={handleNext}
                          aria-label="Next image"
                        >
                          <MoveRight size={18} />
                        </button>
                      </>
                    )}

                    {/* Image indicator */}
                    {previews.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1">
                        {previews.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-40'
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-1">
                    <div className="bg-[#363636] rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-6">
                      <svg width="32" height="32" fill="white" viewBox="0 0 24 24" className="sm:w-10 sm:h-10">
                        <rect width="18" height="14" x="3" y="5" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="9" cy="9" r="2" fill="currentColor" />
                        <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                    <p className="text-lg sm:text-xl text-white mb-6 text-center font-light">
                      Drag photos and videos here
                    </p>
                  </div>
                )}
              </div>

              {/* File input */}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                multiple
                ref={inputRef}
              />

              {/* Action Button */}
              <div className="w-full flex justify-center">
                {files.length > 0 ? (
                  <button
                    className="bg-[#3897f0] text-white font-semibold text-sm sm:text-base cursor-pointer rounded-lg px-6 py-2.5 hover:bg-blue-600 transition-colors w-full sm:w-auto"
                    onClick={() => setDescriptionActive(true)}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="bg-[#3897f0] text-white font-semibold text-sm sm:text-base cursor-pointer rounded-lg px-6 py-2.5 hover:bg-blue-600 transition-colors w-full sm:w-auto"
                    onClick={handleSelectClick}
                  >
                    Select from computer
                  </button>
                )}
              </div>
            </div>

            {/* Description panel */}
            {descriptionActive && (
              <div className="w-full md:w-1/2 lg:w-2/5 bg-[#181818] flex flex-col text-gray-200 border-t border-[#343434] md:border-t-0 md:border-l min-h-0">

                {/* Header - Desktop Only */}
                <div className="hidden md:flex items-center justify-between p-4 border-b border-[#343434]">
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-[#333] rounded-full transition-colors"
                    aria-label="Back"
                  >
                    <MoveLeft size={20} />
                  </button>
                  <h3 className="font-medium text-base">New post</h3>
                  <button
                    onClick={handleShare}
                    className="text-[#3897f0] cursor-pointer font-semibold text-sm px-3 py-1 hover:text-blue-400 transition-colors"
                  >
                    Share
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="p-4 sm:p-5">
                    {/* User Info */}
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mr-3 flex-shrink-0"></div>
                      <span className="font-semibold text-sm sm:text-base">{user?.userName}</span>
                    </div>

                    {/* Description Textarea */}
                    <div className="mb-6">
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write a caption..."
                        className="w-full bg-transparent text-white placeholder-gray-400 resize-none border-none outline-none text-sm sm:text-base min-h-[100px] max-h-[200px]"
                        maxLength={2200}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-gray-400">
                          <span className="text-lg mr-2">😊</span>
                          <span className="text-xs">Add emoji</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {description.length}/2,200
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mb-6">
                      <button
                        type="button"
                        className="w-full flex items-center text-gray-300 hover:bg-[#232323] rounded-lg px-3 py-3 transition-colors"
                      >
                        <MapPin size={20} className="mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Add location</span>
                      </button>

                      <button
                        type="button"
                        className="w-full flex items-center text-gray-300 hover:bg-[#232323] rounded-lg px-3 py-3 transition-colors"
                      >
                        <Users size={20} className="mr-3 flex-shrink-0" />
                        <span className="text-sm sm:text-base">Tag people</span>
                      </button>
                    </div>

                    {/* Expandable Sections */}
                    <div className="space-y-1">
                      <div className="border-t border-[#343434] pt-3">
                        <button
                          onClick={() => setShowAccessibility(!showAccessibility)}
                          className="w-full flex items-center justify-between py-3 px-1 hover:bg-[#232323] rounded-lg transition-colors"
                        >
                          <span className="text-sm sm:text-base">Accessibility</span>
                          <ChevronDown size={16} className={`transition-transform ${showAccessibility ? 'rotate-180' : ''}`} />
                        </button>
                        {showAccessibility && (
                          <div className="px-3 py-2 text-gray-400 text-xs sm:text-sm">
                            <p className="mb-2">Alt text describes your photos for people with visual impairments.</p>
                            <input
                              type="text"
                              placeholder="Write alt text..."
                              className="w-full bg-[#333] text-white placeholder-gray-500 px-3 py-2 rounded-md text-sm border-none outline-none"
                            />
                          </div>
                        )}
                      </div>

                      <div className="border-t border-[#343434] pt-1">
                        <button
                          onClick={() => setShowAdvanced(!showAdvanced)}
                          className="w-full flex items-center justify-between py-3 px-1 hover:bg-[#232323] rounded-lg transition-colors"
                        >
                          <span className="text-sm sm:text-base">Advanced settings</span>
                          <ChevronDown size={16} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                        </button>
                        {showAdvanced && (
                          <div className="px-3 py-2 space-y-3">
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">Hide like and view counts</span>
                              <input type="checkbox" className="w-4 h-4" />
                            </label>
                            <label className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">Turn off commenting</span>
                              <input type="checkbox" className="w-4 h-4" />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
      }
    </div>
  );
}