import { BASEURL } from '@component/apiendpoints/api';
import React, { useEffect } from 'react';

function ImagesModal({ previewImages, setIsOpen }) {
  useEffect(() => {
    // Disable background scrolling when modal is open
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      {/* Full-Screen Background Blur */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 mt-10">
        <div className="modal d-block mt-10" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg
           modal-dialog-centered bg-white mt-4" role="document">
            <div className="modal-content" style={{ maxHeight: '80vh' }}>
              <div className="modal-header">
                <h5 className="text-lg font-semibold">Gallery</h5>
                <button
                  className="text-2xl font-bold text-gray-600 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  &times;
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-4 overflow-auto flex-1" style={{ maxHeight: '70vh' }}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previewImages?.length > 0 && previewImages?.map((it, i) => (
                    <div key={i} className="w-full">
                      <img
                        src={it.startsWith("https") ? it : `${BASEURL}/${it}`}
                        alt={`Gallery ${i + 1}`}
                        className="w-full h-48 object-cover rounded shadow-sm" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImagesModal;
