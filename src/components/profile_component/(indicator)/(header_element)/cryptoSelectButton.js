"use client";

import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";

const cryptosList = [
  "Bitcoin (BTC)", "Ethereum (ETH)", "Binance Coin (BNB)", "Cardano (ADA)", "Solana (SOL)",
  "Ripple (XRP)", "Dogecoin (DOGE)", "Polkadot (DOT)", "Shiba Inu (SHIB)", "SUI (SUI)",
  "Chainlink (LINK)", "Tron (TRX)", "Hedera (HBAR)", "Stellar (XLM)", "Toncoin (TON)"
];

const CryptoSelectButton = ({ selectedCrypto, setSelectedCrypto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pinned, setPinned] = useState([]); // Sabitlenenleri takip eder

  // Kriptoları sıralama (sabitlenenler başa gelir)
  const sortedCryptos = [...pinned, ...cryptosList.filter(c => !pinned.includes(c))];

  // Aramaya göre filtreleme
  const filteredCryptos = sortedCryptos.filter(crypto =>
    crypto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sabitleme toggling
  const togglePinned = (crypto) => {
    setPinned((prevpinned) =>
      prevpinned.includes(crypto)
        ? prevpinned.filter(fav => fav !== crypto) // Çıkart
        : [crypto, ...prevpinned] // Başa ekle
    );
  };

  return (
    <>
      {/* Kripto Seçim Butonu */}
      <button
        className="pl-4 ml-2 flex items-center w-[200px] h-[40px] rounded bg-gray-800 hover:bg-gray-700 text-white overflow-hidden text-ellipsis whitespace-nowrap"
        onClick={() => setIsModalOpen(true)}
      >
        <IoMdSearch className="text-[19px] mr-2" />
        <span className="ml-3">{selectedCrypto || "Kripto seçin"}</span>
      </button>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 text-white rounded-[2px] p-6 w-[500px] h-[550px] shadow-lg flex flex-col relative">

            {/* Çarpı Kapat Butonu */}
            <button
              className="absolute top-2 right-4 text-gray-400 hover:text-white text-3xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <h2 className="text-lg font-bold mb-4">Kripto Para Seç</h2>

            {/* Arama Çubuğu */}
            <input
              type="text"
              placeholder="Kripto ara..."
              className="w-full px-3 py-2 rounded bg-gray-800 text-white mb-3 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Kripto Listesi */}
            <div className="flex-grow overflow-y-auto pl-0 ml-0">
              {filteredCryptos.length > 0 ? (
                <ul className="pl-0 ml-0">
                  {filteredCryptos.map((crypto) => (
                    <li
                      key={crypto}
                      className="py-2 pl-12 pr-4 hover:bg-gray-700 cursor-pointer rounded-sm flex items-center justify-between"
                      onClick={() => {
                        setSelectedCrypto(crypto);
                        setIsModalOpen(false);
                      }}
                    >
                      {crypto}
                      <button onClick={(e) => {
                        e.stopPropagation(); // Listeyi kapatmamak için
                        togglePinned(crypto);
                      }}>
                        {pinned.includes(crypto) ? (
                          <BsPinAngleFill className="text-red-700" />
                        ) : (
                          <BsPinAngle className="text-gray-400" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-400">Eşleşen öğe yok</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoSelectButton;
