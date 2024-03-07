"use client";
import React from "react";

interface Props {
  onChange: (image: File) => void;
}

const ImageUploadInput = ({ onChange }: Props) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  React.useEffect(() => {
    if (selectedFile) {
      onChange(selectedFile);
    }
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create image preview URL using URL.createObjectURL()
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && <img src={previewUrl} alt="Selected Image Preview" />}
    </div>
  );
};

export default ImageUploadInput;
