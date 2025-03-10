"use client";

import { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { FaRegSave, FaEdit} from "react-icons/fa"; // Kaydet, Düzenle, Sil ikonları
import { IoIosStarOutline} from "react-icons/io"; // Teknik indikatör ikonları
import { HiOutlineTrash } from "react-icons/hi"; // Silme ikonu
import ShowHideButton from "./show_hide_button"; // Göster/Gizle butonu
import { SiRobinhood } from "react-icons/si"; // Düzenleme ikonu
import CodeEditor from "../../CodeEditor";


const PersonalIndicators = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indicatorName, setIndicatorName] = useState("");
  const [indicatorCode, setIndicatorCode] = useState("");
  const [personalIndicators, setPersonalIndicators] = useState([]); // Kayıtlı indikatörler listesi
  const [editingIndicator, setEditingIndicator] = useState(null); // Düzenleme için seçilen indikatör
  const [activeIndicators, setActiveIndicators] = useState({}); // Göster/Gizle durumları(state)


  // Yeni indikatörü ekleme veya düzenleme fonksiyonu
  const handleSaveIndicator = () => {
    if (indicatorName.trim() !== "" && indicatorCode.trim() !== "") {
      if (editingIndicator) {
        // Düzenleme işlemi
        setPersonalIndicators((prev) =>
          prev.map((item) =>
            item.id === editingIndicator.id
              ? { ...item, name: indicatorName, code: indicatorCode }
              : item
          )
        );
        setEditingIndicator(null);
      } else {
        // Yeni indikatör ekleme
        setPersonalIndicators([
          ...personalIndicators,
          { name: indicatorName, code: indicatorCode, id: Date.now() },
        ]);
      }
      setIndicatorName("");
      setIndicatorCode("");
      setIsModalOpen(false);
    }
  };

  // Göster/Gizle butonu için işlem
  const toggleIndicator = (indicatorId) => {
    setActiveIndicators((prev) => ({
      ...prev,
      [indicatorId]: !prev[indicatorId], // Seçili indikatörün durumunu tersine çevir
    }));
    console.log(
      `İndikatör ${indicatorId} durumu: ${!activeIndicators[indicatorId] ? "Açık" : "Kapalı"}`
    );

    // Burada grafik üzerinde göster/gizle işlemini yapabilirsin!
    // Eğer bir grafik kütüphanesi kullanıyorsan, bu fonksiyon içine onun ilgili metodlarını eklemelisin.
  };


  // İndikatörü düzenleme butonu fonksiyonu (Modal içinde aç)
  const handleEditIndicator = (indicator) => {
    setIndicatorName(indicator.name);
    setIndicatorCode(indicator.code);
    setEditingIndicator(indicator);
    setIsModalOpen(true);
  };

    // İndikatörü silme butonu fonksiyonu
    const handleDeleteIndicator = (id) => {
      setPersonalIndicators(personalIndicators.filter((item) => item.id !== id));
    };

// İndikatör silme modalı state'leri
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedIndicator, setSelectedIndicator] = useState(null);

// Modal açma fonksiyonu
const handleDeleteClick = (indicator) => {
  setSelectedIndicator(indicator);
  setShowDeleteModal(true);
};

// Modal kapatma fonksiyonu
const closeDeleteModal = () => {
  setShowDeleteModal(false);
  setSelectedIndicator(null);
};

// Silme işlemi
const confirmDelete = () => {
  if (selectedIndicator) {
    handleDeleteIndicator(selectedIndicator.id);
  }
  closeDeleteModal(); // Modal kapat ve seçili indikatörü temizle
};

  return (
    <div className="text-white pt-2 flex flex-col items-center w-full">
      {/* Kaydedilen İndikatörler Listesi */}
      <div className="w-full max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {personalIndicators.length === 0 ? (
          <></>
        ) : (
          personalIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className="bg-gray-900 hover:bg-gray-800 flex items-center justify-between w-full h-[40px] mb-2"
            >
              {/* Kartın sol kısmı */}
              <div className="flex items-center">
                <button className="bg-transparent p-2 rounded-md hover:bg-gray-800">
                  <IoIosStarOutline className="text-lg text-yellow-500 hover:text-yellow-200 mr-3 text-[17px] cursor-pointer" />
                </button>
                <span className="text-[15px]">{indicator.name}</span>
              </div>

              {/* Kartın sağ kısmı (Kod, Düzenle, Sil Butonları) */}
              <div className="flex items-center gap-2">

                {/* Göster/Gizle Butonu */}
                <ShowHideButton indicatorId={indicator.id} onToggle={toggleIndicator} />

                {/* Düzenle Butonu */}
                <button
                  className="bg-transparent p-2 rounded-md hover:bg-gray-800"
                  onClick={() => handleEditIndicator(indicator)}
                >
                  <SiRobinhood  className="text-blue-400 hover:text-blue-700 text-lg cursor-pointer" />
                </button>

            
              {/* Silme Butonu */}
              <button
                className="bg-transparent pr-4 pl-2 rounded-md hover:bg-gray-800"
                onClick={() => handleDeleteClick(indicator)}
              >
                <HiOutlineTrash className="text-red-700 hover:text-red-900 text-[19.5px] cursor-pointer"/>
              
              </button>

              {/* Silme Onay Modali */}
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

      {/* Yeni İndikatör Ekle Butonu (Her Zaman En Altta Kalır) */}
      <button
        className="mt-1 p-3 bg-green-500 hover:bg-green-600 hover:scale-[1.01] text-white rounded-sm flex items-center justify-center h-3 w-16"
        onClick={() => {
          setIsModalOpen(true);
          setEditingIndicator(null);
          setIndicatorName("");
          setIndicatorCode("");
        }}
      >
        <IoMdAdd className="text-lg" />
      </button>

      {/* Modal Penceresi */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 text-white rounded-md w-[990px] h-[590px] p-6 shadow-lg relative">
            
            {/* Çarpı Butonu (Modal Kapatma) */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              <IoMdClose />
            </button>

            <h2 className="text-lg font-bold mb-4">
              {editingIndicator ? "İndikatörü Düzenle" : "Yeni İndikatör Ekle"}
            </h2>

            {/* İndikatör Adı Girişi */}
            <input
              type="text"
              className="w-60 p-2 mb-3 bg-gray-800 text-white rounded-[4px] border-[1px] border-[rgba(78,114,190,0.63)] focus:outline-none"
              placeholder="İndikatör adı..."
              value={indicatorName}
              onChange={(e) => setIndicatorName(e.target.value)}
              maxLength={40}
            />

            {/* Kaynak Kod Girişi */}
            <div className="w-full flex flex-col overflow-hidden border-[1px] border-[rgba(78,114,190,0.63)] rounded-md">
            <CodeEditor 
              key={isModalOpen} // Modal açıldığında Monaco'yu yeniden yükler
              code={indicatorCode} 
              setCode={setIndicatorCode} 
              language="python" 
            />
            </div>

            {/* Kaydet Butonu */}
            <div className="flex justify-end mt-2">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-sm font-medium"
                onClick={handleSaveIndicator}
              >
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
