import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center  h-full bg-black/40">
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg max-w-xl w-full mx-4 max-h-[90vh]">
        
        {/* Modal Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {title || "Modal"}
            </h3>
          </div>
        )}

        {/* Close Button (always present) */}
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-400 hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
          onClick={onClose}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l12 12M13 1L1 13"
            />
          </svg>
        </button>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto custom-scrollbar max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
