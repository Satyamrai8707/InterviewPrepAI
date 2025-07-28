import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5">
      <p className="text-sm text-gray-700">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 cursor-pointer focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
