import React from "react";
import { useState } from "react";
import ModalImage from "./ModalImage";
import "./SmallImage.css";

const SmallImage = ({ imgPath = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {imgPath && imgPath.length > "/api/".length ? (
        <>
          <img
            src={imgPath}
            height="100"
            width="200"
            alt="img"
            onClick={openModal}
            className="smallImage"
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
