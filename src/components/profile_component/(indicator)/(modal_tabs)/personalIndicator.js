"use client";

import { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { IoIosStarOutline, IoMdStar } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi";
import ShowHideButton from "./show_hide_button";
import { SiRobinhood } from "react-icons/si";
import CodeEditor from "../../CodeEditor";
import useIndicatorStore from "@/store/indicatorStore";

const PersonalIndicators = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indicatorName, setIndicatorName] = useState("");
  const [indicatorCode, setIndicatorCode] = useState("");
  const [editingIndicator, setEditingIndicator] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(null);


  const { indicators, addIndicator, deleteIndicator, favorites, toggleFavorite } = useIndicatorStore();

  const handleSaveIndicator = () => {
    if (indicatorName.trim() !== "" && indicatorCode.trim() !== "") {
      if (editingIndicator) {
        deleteIndicator(editingIndicator.id);
        addIndicator({ name: indicatorName, code: indicatorCode, id: editingIndicator.id });
        setEditingIndicator(null);
      } else {
        addIndicator({ name: indicatorName, code: indicatorCode, id: Date.now() });
      }
      setIndicatorName("");
      setIndicatorCode("");
      setIsModalOpen(false);
    }
  };

    const handleDeleteClick = (indicator) => {
      setSelectedIndicator(indicator);
      setShowDeleteModal(true);
  };

   const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedIndicator(null);
  };

    const confirmDelete = () => {
      if (selectedIndicator) {
          deleteIndicator(selectedIndicator.id);
      }
      closeDeleteModal(); // Modalı kapat
  };


 

  return (
    <div className="text-white pt-2 flex flex-col items-center w-full">
      <div className="w-full max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {indicators.length === 0 ? (
          <></>
        ) : (
          indicators.map((indicator) => (
            <div key={indicator.id} className="bg-gray-900 hover:bg-gray-800 flex items-center justify-between w-full h-[40px] mb-2">
              <div className="flex items-center pl-2">
                <button className="bg-transparent p-2 rounded-md hover:bg-gray-800" onClick={() => toggleFavorite(indicator)}>
                  {favorites.some((fav) => fav.id === indicator.id) ? (
                    <IoMdStar className="text-lg text-yellow-500" />
                  ) : (
                    <IoIosStarOutline className="text-lg text-gray-600" />
                  )}
                </button>
                <span className="text-[15px]">{indicator.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShowHideButton indicatorId={indicator.id} />
                <button className="bg-transparent p-2 rounded-md hover:bg-gray-800" onClick={() => {
                  setIndicatorName(indicator.name);
                  setIndicatorCode(indicator.code);
                  setEditingIndicator(indicator);
                  setIsModalOpen(true);
                }}>
                  <SiRobinhood className="text-blue-400 hover:text-blue-700 text-lg cursor-pointer" />
                </button>
                <button
                    className="bg-transparent pr-4 pl-2 rounded-md hover:bg-gray-800"
                    onClick={() => handleDeleteClick(indicator)}
                >
                    <HiOutlineTrash className="text-red-700 hover:text-red-900 text-[19.5px] cursor-pointer"/>
                </button>

                 {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-gray-900 text-white rounded-md w-[400px] p-6 shadow-lg relative">
                            <h2 className="text-lg font-bold mb-4">Silme Onayı</h2>
                            <p>{selectedIndicator?.name} indikatörünü silmek istediğinize emin misiniz?</p>
                            <div className="flex justify-end mt-4 gap-2">
                                <button
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                                    onClick={closeDeleteModal}
                                >
                                    Hayır
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
                                    onClick={confirmDelete}
                                >
                                    Sil
                                </button>
                            </div>
                        </div>
                    </div>
                )}

              </div>
            </div>
          ))
        )}
      </div>

      <button className="mt-1 p-3 bg-green-500 hover:bg-green-600 text-white rounded-sm flex items-center justify-center h-3 w-16" onClick={() => {
        setIsModalOpen(true);
        setEditingIndicator(null);
        setIndicatorName("");
        setIndicatorCode("");
      }}>
        <IoMdAdd className="text-lg" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 text-white rounded-md w-[990px] h-[590px] p-6 shadow-lg relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl" onClick={() => setIsModalOpen(false)}>
              <IoMdClose />
            </button>
            <h2 className="text-lg font-bold mb-4">
              {editingIndicator ? "İndikatörü Düzenle" : "Yeni İndikatör Ekle"}
            </h2>
            <input type="text" className="w-60 p-2 mb-3 bg-gray-800 text-white rounded-[4px] border-[1px] border-[rgba(78,114,190,0.63)] focus:outline-none"
              placeholder="İndikatör adı..." value={indicatorName} onChange={(e) => setIndicatorName(e.target.value)} maxLength={40}
            />
            <div className="w-full flex flex-col overflow-hidden border-[1px] border-[rgba(78,114,190,0.63)] rounded-md">
              <CodeEditor key={isModalOpen} code={indicatorCode} setCode={setIndicatorCode} language="python" />
            </div>
            <div className="flex justify-end mt-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-medium" onClick={handleSaveIndicator}>
                <FaRegSave className="text-sm" />
                {editingIndicator ? "Güncelle" : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalIndicators;
