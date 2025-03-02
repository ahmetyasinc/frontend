import React, { useState } from "react";

const PopupModal = ({ showModal, handleClose, handleConfirm }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Çıkış yapmak istediğinize emin misiniz?</h3>
        <button onClick={handleClose}>Vazgeç</button>
        <button onClick={handleConfirm}>Çıkış Yap</button>
      </div>
    </div>
  );
};

export default PopupModal;
