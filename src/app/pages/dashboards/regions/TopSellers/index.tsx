import { CSSProperties, useMemo } from "react";
import { Card } from "@/components/ui";
import { SellerCard } from "./SellerCard";
import transactions from "@/data/transactions.json";
import states from "@/data/states.json";

export function TopRegions({ currentState }: { currentState: any }) {
  const regions = useMemo(() => {
    const stateRegionMap: Record<number, string> = {};
    for (const state of states) {
      stateRegionMap[state.id] = state.region;
    }

    const regionTotals: Record<string, { total: number; count: number }> = {};

    for (const tx of transactions) {
      if (currentState && tx.state_id !== currentState.id) continue;

      const region = stateRegionMap[tx.state_id] || "Unknown";
      const amount =
        parseFloat(tx.transaction_amount.replace(/[₦,]/g, "")) || 0;

      if (!regionTotals[region]) regionTotals[region] = { total: 0, count: 0 };
      regionTotals[region].total += amount;
      regionTotals[region].count += 1;
    }

    const regionsArray = Object.entries(regionTotals).map(([region, data]) => ({
      region,
      totalAmount: data.total,
      count: data.count,
    }));

    regionsArray.sort((a, b) => b.totalAmount - a.totalAmount);
    const top3 = regionsArray.slice(0, 3);

    const getRegionAvatar = (region: string): string => {
      const map: Record<string, string> = {
        "South West": "/images/avatar/avatar-1.jpg",
        "South East": "/images/avatar/avatar-2.jpg",
        "South South": "/images/avatar/avatar-3.jpg",
        "North Central": "/images/avatar/avatar-4.jpg",
        "North East": "/images/avatar/avatar-5.jpg",
        "North West": "/images/avatar/avatar-6.jpg",
      };
      return map[region] || "/images/avatar/avatar-1.jpg";
    };

    const formatSalesAmount = (amount: number): string => {
      if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)}B`;
      if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
      if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K`;
      return amount.toFixed(0);
    };

    const generateChartData = (totalAmount: number, count: number): number[] => {
      const base = totalAmount / count;
      const points = Math.min(count, 12);
      return Array.from({ length: points }, () => {
        const variation = (Math.random() - 0.5) * 0.3;
        return Math.round(base * (1 + variation));
      });
    };

    return top3.map((r, index) => ({
      uid: `${index + 1}`,
      avatar: getRegionAvatar(r.region),
      name: r.region,
      sales: formatSalesAmount(r.totalAmount),
      impression: Math.random() * 10,
      chartData: generateChartData(r.totalAmount, r.count),
    }));
  }, [currentState]);

  return (
    <Card skin="none" className="col-span-12 pb-2 lg:col-span-5 xl:col-span-8">
      <div
        className="custom-scrollbar flex justify-end space-x-5 overflow-x-auto px-4 pb-3 sm:px-5"
        style={{ "--margin-scroll": "1.25rem" } as CSSProperties}
      >
        {regions.map((region) => (
          <SellerCard key={region.uid} {...region} />
        ))}
      </div>
    </Card>
  );
}
