import React from 'react';

function ImageUploader({ thumbnail, galleryImages, handleFiles, removeGalleryImage, download }) {
  const sections = [{
    label: 'Muqovasi',
    handler: (e) => handleFiles(Array.from(e.target.files), 'thumbnail'),
    inputId: 'thumbnailInput',
    images: thumbnail ? [thumbnail] : [],
    removable: false,
  }, {
    label: 'Rasmlari',
    handler: (e) => handleFiles(Array.from(e.target.files), 'gallery'),
    inputId: 'galleryInput',
    images: galleryImages,
    removable: true,
  }];

  return sections.map(({ label, handler, inputId, images, removable }, idx) => (
    <div key={idx} className="w-full bg-[#F4F5F9] mt-6 border-2 rounded-md border-[#DBDCDE] pb-4">
      <h1 className='text-black pt-3 pl-6'>Yangilik {label}</h1>
      <div
        className="w-[630px] h-[125px] border-3 rounded-md border-dashed border-[#6E39CB] mx-auto mt-4 flex flex-col items-center justify-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById(inputId).click()}
      >
        <img src={download} alt="Upload" className='h-5' />
        <div className="text-center mt-2 text-sm">
          <p><span className='text-[#6E39CB] font-medium'>Click to upload</span> or drag and drop</p>
          <p>SVG, PNG, JPG or GIF (max 800x400px)</p>
        </div>
        <input
          type="file"
          id={inputId}
          multiple={removable}
          accept="image/*"
          onChange={handler}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="mt-4 px-5 flex flex-wrap gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-[100px] h-[100px] overflow-hidden rounded-md border border-gray-300 group"
            >
              <img
                src={img.url}
                alt="preview"
                className="w-full h-full object-cover"
              />
              {removable && (
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-1 right-1 bg-black text-white rounded-full w-[20px] h-[20px] text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  title="Remove"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  ));
}

export default ImageUploader;
