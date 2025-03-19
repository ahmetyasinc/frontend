"use client";

import { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import CodeEditor from "../../CodeEditor";
import useStrategyStore from "@/store/strategyStore";
import { SiRobinhood } from "react-icons/si";
import { IoMdStar, IoIosStarOutline} from "react-icons/io";
import ShowHideButton from "./show_hide_button_str";


const MyStrategies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [strategyName, setStrategyName] = useState("");
  const [strategyCode, setStrategyCode] = useState("");
  const [editingStrategy, setEditingStrategy] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const { strategies, addStrategy, deleteStrategy, favorites, toggleFavorite } = useStrategyStore();

  const handleSaveStrategy = () => {
    if (strategyName.trim() !== "" && strategyCode.trim() !== "") {
        if (editingStrategy) {
            // Önce stratejinin favori olup olmadığını kontrol et
            const isFavorite = favorites.some(fav => fav.id === editingStrategy.id);

            // Stratejiyi silmeden önce favori bilgisini al
            deleteStrategy(editingStrategy.id);

            // Güncellenmiş stratejiyi ekle
            const updatedStrategy = { 
                name: strategyName, 
                code: strategyCode, 
                id: editingStrategy.id 
            };
            addStrategy(updatedStrategy);

            // Eğer eski strateji favoriyse, güncellenmiş stratejiyi tekrar favorilere ekle
            if (isFavorite) {
                toggleFavorite(updatedStrategy);
            }

            setEditingStrategy(null);
        } else {
            addStrategy({ name: strategyName, code: strategyCode, id: Date.now() });
        }
        setStrategyName("");
        setStrategyCode("");
        setIsModalOpen(false);
    }
};


  const handleDeleteClick = (strategy) => {
    setSelectedStrategy(strategy);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedStrategy(null);
  };

  const confirmDelete = () => {
    if (selectedStrategy) {
      deleteStrategy(selectedStrategy.id);
    }
    closeDeleteModal();
  };

  return (
    <div className="text-white pt-2 flex flex-col items-center w-full">
      <div className="w-full max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {strategies.length === 0 ? (
          <></>
        ) : (
          strategies.map((strategy) => (
            <div key={strategy.id} className="bg-gray-900 hover:bg-gray-800 flex items-center justify-between w-full h-[40px] mb-2">
              <div className="flex items-center pl-2">
              <button
              className="bg-transparent p-2 rounded-md hover:bg-gray-800"
              onClick={() => toggleFavorite(strategy)}
            >
              {favorites.some((fav) => fav.id === strategy.id) ? (
                <IoMdStar className="text-lg text-yellow-500" />
              ) : (
                <IoIosStarOutline className="text-lg text-gray-600" />
              )}
            </button>
                <span className="text-[15px]">{strategy.name}</span>
              </div>
              <div className="flex items-center gap-2">
              <ShowHideButton strategyId={strategy.id} />
                <button className="bg-transparent p-2 rounded-md hover:bg-gray-800" onClick={() => {
                  setStrategyName(strategy.name);
                  setStrategyCode(strategy.code);
                  setEditingStrategy(strategy);
                  setIsModalOpen(true);
                }}>
                  <SiRobinhood className="text-blue-400 hover:text-blue-700 text-lg cursor-pointer" />
                </button>
                <button className="bg-transparent pr-4 pl-2 rounded-md hover:bg-gray-800" onClick={() => handleDeleteClick(strategy)}>
                  <HiOutlineTrash className="text-red-700 hover:text-red-900 text-[19.5px] cursor-pointer" />
                </button>
                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-gray-900 text-white rounded-md w-[400px] p-6 shadow-lg relative">
                            <h2 className="text-lg font-bold mb-4">Silme Onayı</h2>
                            <p>{selectedStrategy?.name} stratejinizi silmek istediğinize emin misiniz?</p>
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

      <button className="mt-1 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-sm flex items-center justify-center h-3 w-16" onClick={() => {
        setIsModalOpen(true);
        setEditingStrategy(null);
        setStrategyName("");
        setStrategyCode("");
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
              {editingStrategy ? "Stratejiyi Düzenle" : "Yeni Strateji Ekle"}
            </h2>
            <input type="text" className="w-60 p-2 mb-3 bg-gray-800 text-white rounded-[4px] border-[1px] border-[rgba(78,114,190,0.63)] focus:outline-none"
              placeholder="Strateji adı..." value={strategyName} onChange={(e) => setStrategyName(e.target.value)} maxLength={40}
            />
            <div className="w-full flex flex-col overflow-hidden border-[1px] border-[rgba(78,114,190,0.63)] rounded-md">
              <CodeEditor key={isModalOpen} code={strategyCode} setCode={setStrategyCode} language="python" />
            </div>
            <div className="flex justify-end mt-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-medium" onClick={handleSaveStrategy}>
                <FaRegSave className="text-sm" />
                {editingStrategy ? "Güncelle" : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStrategies;
