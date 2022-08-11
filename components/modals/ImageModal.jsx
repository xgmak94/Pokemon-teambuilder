import React from 'react';
import Image from 'next/image';

function ImageModal({ images, width, height, setShowModal }) {
  function hideModal(e) {
    if (e.target.id === 'background') {
      setShowModal(false);
    }
  }

  return (
    <div
      id="background"
      className="grid place-items-center bg-slate-800/75 mt-5 backdrop-blur-sm fixed top-0 left-0 w-screen h-screen z-[1]"
      onClick={(e) => hideModal(e)}
    >
      <div
        className="grid place-items-center p-5 bg-slate-800/5 mt-5 backdrop-blur-sm"
      >
        <div className="grid place-items-center">
          <Image
            src={images.other['official-artwork'].front_default}
            alt="Image of pokemon"
            width={width}
            height={height}
          />
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
