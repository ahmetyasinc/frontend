export default function Loading() { // ✅ Yükleme animasyonu
    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
        <p className="ml-3 text-white text-lg">Yükleniyor...</p>
      </div>
    );
  }
  