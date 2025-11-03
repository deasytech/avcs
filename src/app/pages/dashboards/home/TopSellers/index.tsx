// Import Dependencies
import { CSSProperties } from "react";

// Local Imports
import { Card } from "@/components/ui";
import { SellerCard } from "./SellerCard";
import { useBankingData } from "./useBankingData";

// ----------------------------------------------------------------------

export interface Seller {
  uid: string;
  avatar?: string;
  name: string;
  sales: string;
  impression: number;
  chartData: number[];
}

// Avatar mapping based on business branding colors
const getBusinessAvatar = (businessName: string): string => {
  const avatarMap: Record<string, string> = {
    "Access Bank": "/images/avatar/avatar-1.jpg", // Blue theme
    "GTBank": "/images/avatar/avatar-2.jpg",   // Orange theme
    "First Bank": "/images/avatar/avatar-3.jpg",   // Red theme
  };
  return avatarMap[businessName] || "/images/avatar/avatar-1.jpg";
};

// Generate chart data from transaction amounts
const generateChartData = (totalAmount: number, transactionCount: number): number[] => {
  const baseAmount = totalAmount / transactionCount;
  const dataPoints = Math.min(transactionCount, 12); // Max 12 data points

  return Array.from({ length: dataPoints }, () => {
    const variation = (Math.random() - 0.5) * 0.4; // ±20% variation
    return Math.round(baseAmount * (1 + variation));
  });
};

// Format sales amount for display
const formatSalesAmount = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K`;
  }
  return amount.toString();
};

export function TopSellers() {
  const bankingData = useBankingData();

  const sellers: Seller[] = bankingData.map((business) => ({
    uid: business.id.toString(),
    avatar: getBusinessAvatar(business.name),
    name: business.name,
    sales: formatSalesAmount(business.totalAmount),
    impression: business.rating,
    chartData: generateChartData(business.totalAmount, business.transactionCount),
  }));

  return (
    <Card className="col-span-12 pb-2 lg:col-span-5 xl:col-span-6">
      <div className="flex min-w-0 items-center justify-between px-4 py-3 sm:px-5">
        <div className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Top 3 Performing Banks
        </div>
      </div>
      <div
        className="custom-scrollbar flex space-x-3 overflow-x-auto px-4 pb-3 sm:px-5"
        style={{ "--margin-scroll": "1.25rem" } as CSSProperties}
      >
        {sellers.map((seller) => (
          <SellerCard key={seller.uid} {...seller} />
        ))}
      </div>
    </Card>
  );
}
