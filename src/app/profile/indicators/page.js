import IndicatorHeader from "@/components/profile_component/indicatorHeader";

import ChartComponent from "@/components/ChartComponent"; // Yolunu kontrol et!


export const metadata = {
    title: "Göstergeler",
    description: "Göstergeler sayfası.",
};

export default function Indicators() {
    const handleAddIndicator = () => {
        console.log("Yeni gösterge ekleme butonuna basıldı.");
        // Burada yeni bir gösterge ekleme modalı açabilirsin veya bir işlem yapabilirsin
    };

    return (
        <div className="p-4">
            {/* Sayfa Üstündeki Header */}
            <IndicatorHeader />

            {/* İçerik Alanı */}
            <div className="mt-[56px]">
                <h1 className="text-lg font-semibold">Grafik</h1>
                <h1>Stock Chart</h1>
                <ChartComponent />
                {/* Buraya gösterge listesi eklenebilir */}
            </div>
        </div>
    );
}
