import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experince,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onClick={onSelect}
    >
      {/* Header Background */}
      <div
        className="p-4 relative rounded-t-2xl"
        style={{ background: colors?.bgcolor }}
      >
        <div className="flex items-start gap-4">
          {/* Avatar Placeholder */}
          <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center font-semibold text-lg shadow">
            {getInitials(role)}
          </div>

          {/* Role & Topic */}
          <div className="flex flex-col">
            <h2 className="text-base md:text-lg font-semibold text-black">{role}</h2>
            <p className="text-xs text-gray-800 font-medium">{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          className="hidden group-hover:flex items-center gap-1 text-xs text-rose-600 font-medium bg-rose-100 hover:bg-rose-200 px-3 py-1 rounded-md border border-rose-200 absolute top-3 right-3"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2/>
        </button>
      </div>

      {/* Info Section */}
      <div className="p-4 bg-white">
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-700">
          <span className="bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            Experience: {experince} {experince == 1 ? "Year" : "Years"}
          </span>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
            {questions} Q&A
          </span>
          <span className="ml-auto text-[11px] text-gray-500">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md p-3 leading-relaxed line-clamp-3">
          {description || "No description provided."}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
