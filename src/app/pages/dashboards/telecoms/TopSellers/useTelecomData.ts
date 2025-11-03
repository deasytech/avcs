import { useMemo } from "react";
import transactionsData from "@/data/transactions.json";
import businessesData from "@/data/businesses.json";

export interface TelecomBusiness {
  id: number;
  name: string;
  rating: number;
  review_count: number;
  totalAmount: number;
  transactionCount: number;
  averageTransaction: number;
}

export function useTelecomData() {
  const telecomData = useMemo(() => {
    // Filter transactions for sector_id: 2 (Telecoms)
    const sector2Transactions = transactionsData.filter(t => t.sector_id === 2);

    // Group transactions by business_id and calculate total transaction amounts
    const businessPerformance: Record<number, { totalAmount: number; transactionCount: number }> = {};

    sector2Transactions.forEach(transaction => {
      const businessId = transaction.business_id;
      const amount = parseFloat(transaction.transaction_amount.replace("₦", "").replace(/,/g, ""));

      if (!businessPerformance[businessId]) {
        businessPerformance[businessId] = {
          totalAmount: 0,
          transactionCount: 0,
        };
      }

      businessPerformance[businessId].totalAmount += amount;
      businessPerformance[businessId].transactionCount += 1;
    });

    // Get business details for sector 2
    const sector2Businesses = businessesData.filter(b => b.sector_id === 2);

    // Combine business details with performance data
    const businessData: TelecomBusiness[] = sector2Businesses.map(business => {
      const performance = businessPerformance[business.id] || {
        totalAmount: 0,
        transactionCount: 0,
      };
      return {
        id: business.id,
        name: business.name,
        rating: business.rating,
        review_count: business.review_count,
        totalAmount: performance.totalAmount,
        transactionCount: performance.transactionCount,
        averageTransaction:
          performance.transactionCount > 0
            ? performance.totalAmount / performance.transactionCount
            : 0,
      };
    });

    // Sort by total amount (descending) and get top 3
    const top3Businesses = businessData
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 3);

    return top3Businesses;
  }, []);

  return telecomData;
}
