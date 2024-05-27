import React from 'react';
import './ModalImage.css';

const Modal = ({ isOpen, onClose, imagePath }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <div className="modal-content">
          <img src={imagePath} alt="img" className="modal-image" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
