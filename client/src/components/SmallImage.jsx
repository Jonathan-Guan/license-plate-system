import React from "react";
import { useState } from "react";
import ModalImage from "./ModalImage";

const SmallImage = ({ imgPath = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(imgPath);
  return (
    <>
      {imgPath ? (
        <>
          <img
            src={imgPath}
            height="100"
            width="200"
            alt="img"
            onClick={openModal}
          />
          <ModalImage
            isOpen={isModalOpen}
            onClose={closeModal}
            imagePath={imgPath}
          />
        </>
      ) : (
        <p>No Image Found</p>
      )}
    </>
  );
};

export default SmallImage;
