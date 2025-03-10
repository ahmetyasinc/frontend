import IndicatorHeader from "@/components/profile_component/(indicator)/indicatorHeader";
import StockChart from "@/components/profile_component/(indicator)/StockChart";

export const metadata = {
    title: "Göstergeler",
    description: "Göstergeler sayfası.",
};

export default function Indicators() {
    return (
        <div>
            {/* Sayfa Üstündeki Header */}
            <IndicatorHeader />

            <div className="pt-[56px]">
                <StockChart />
            </div>
        </div>
    );
}
