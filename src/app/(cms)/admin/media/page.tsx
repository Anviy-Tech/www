'use client';
import { useState } from 'react';

export default function MediaPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="card-modern p-6">
        <h1 className="text-2xl font-bold mb-2">Media Library</h1>
        <p className="text-neutral-600">Upload and manage product images, videos, and other media assets.</p>
      </div>

      {/* Upload Area */}
      <div className="card-modern p-6">
        <h3 className="text-lg font-semibold mb-4">Upload New Media</h3>
        <div
          className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
            ${dragActive 
              ? 'border-accent bg-accent/5 scale-105' 
              : 'border-neutral-300 hover:border-accent'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-4xl mb-4">📸</div>
          <h4 className="text-lg font-semibold mb-2">Drop files here or click to upload</h4>
          <p className="text-neutral-600 mb-4">Support for JPG, PNG, WebP files up to 10MB</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="btn cursor-pointer">
            Choose Files
          </label>
        </div>

        {/* Upload Progress */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-4">Uploaded Files ({uploadedFiles.length})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="bg-white/50 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-xs text-neutral-500 mb-2">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <div className="bg-green-100 rounded-full h-2">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                  <div className="text-xs text-green-600 mt-1">Uploaded ✓</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Media Gallery */}
      <div className="card-modern p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Media Gallery</h3>
          <div className="flex items-center gap-4">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>All Media</option>
              <option>Images</option>
              <option>Videos</option>
            </select>
            <button className="btn-outline text-sm">Bulk Actions</button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1603575449299-0f2f5d6c2c88?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1506629905607-683b94ba4833?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1611123029321-9b004d6ac613?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1551135049-8a33b5883815?w=300&h=300&fit=crop'
          ].map((src, i) => (
            <div key={i} className="group relative aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
              <img 
                src={src} 
                alt={`Jewelry ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs hover:bg-red-50 hover:text-red-600">
                  ✕
                </button>
              </div>
              <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-xs bg-black/50 rounded px-2 py-1">
                  300x300
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="btn-outline">Load More</button>
        </div>
      </div>
    </div>
  );
}
