import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-lg mt-2">Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <Link
        href="/" 
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
