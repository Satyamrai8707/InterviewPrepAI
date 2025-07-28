import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setpreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(preview || null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newPreview = URL.createObjectURL(file);
      setImage(file);
      setPreviewUrl(newPreview);
      if (setpreview) {
        setpreview(newPreview);
      }
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setpreview) setpreview(null);
    if (inputRef.current) inputRef.current.value = null;
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-orange-500" />
          <button type="button" className="w-8 h-8 flex items-center justify-center bg-linear-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer" onClick={onChooseFile}>
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img src={preview || previewUrl} alt="profile photo" className="w-20 h-20 rounded-full object-cover" />
          <button type="button" className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer" onClick={handleRemove}>
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
