'use client';

import { useState, useEffect } from 'react';

export default function OrarPage() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    // Load the image from localStorage when the component mounts
    const savedImage = localStorage.getItem('orarImage');
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        localStorage.setItem('orarImage', result); // Save the image to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setImage(null);
    localStorage.removeItem('orarImage'); // Remove the image from localStorage
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Orarul meu</h1>

      {!image ? (
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      ) : (
        <button
          onClick={handleDelete}
          className="mb-4 block w-full text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full font-semibold"
        >
          Șterge imaginea
        </button>
      )}

      {image && (
        <div className="mt-4">
          <p className="mb-2 text-center text-gray-700">Imaginea ta cu orarul:</p>
          <img src={image} alt="Orarul meu" className="rounded shadow-md max-w-full" />
        </div>
      )}
    </div>
  );
}