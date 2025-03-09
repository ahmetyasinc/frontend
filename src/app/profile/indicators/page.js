import IndicatorHeader from "@/components/profile_component/indicatorHeader";

import ChartComponent from "@/components/ChartComponent"; // Yolunu kontrol et!


export const metadata = {
    title: "Göstergeler",
    description: "Göstergeler sayfası.",
};

export default function Indicators() {


    return (
        <div className="p-4">
            {/* Sayfa Üstündeki Header */}
            <IndicatorHeader />

            {/* İçerik Alanı */}
            <div className="mt-[56px]">
                <ChartComponent />
                {/* Buraya gösterge listesi eklenebilir */}
            </div>
        </div>
    );
}
