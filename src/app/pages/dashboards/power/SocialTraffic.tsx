// Import Dependencies
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

// Local Imports
import { Card } from "@/components/ui";
import { formatNumber } from "@/utils/formatNumber";
import transactionsData from "@/data/transactions.json";
import businessesData from "@/data/businesses.json";

// ----------------------------------------------------------------------


type Channel = {
  uid: string;
  name: string;
  views: number;
  impression: number;
};

export function SocialTraffic() {
  const { channels, totalRevenue, growthPercentage } = useMemo(() => {
    // Filter transactions for sector_id: 3 (Power)
    const powerTransactions = transactionsData.filter(transaction => {
      const business = businessesData.find(b => b.id === transaction.business_id);
      return business?.sector_id === 3;
    });

    // Calculate total revenue per business for power only
    const businessRevenue = new Map<number, number>();

    powerTransactions.forEach(transaction => {
      const amount = parseFloat(transaction.transaction_amount.replace(/[₦,]/g, ''));
      const currentRevenue = businessRevenue.get(transaction.business_id) || 0;
      businessRevenue.set(transaction.business_id, currentRevenue + amount);
    });

    // Get top 8 businesses by revenue
    const topBusinesses = Array.from(businessRevenue.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    // Calculate total revenue
    const totalRevenue = topBusinesses.reduce((sum, [, revenue]) => sum + revenue, 0);

    // Calculate growth percentage (simulated based on transaction dates) for power only
    const currentMonth = new Date().getMonth();
    const currentMonthPowerTransactions = powerTransactions.filter(t =>
      new Date(t.transaction_date).getMonth() === currentMonth
    );
    const previousMonthPowerTransactions = powerTransactions.filter(t =>
      new Date(t.transaction_date).getMonth() === currentMonth - 1
    );

    const currentMonthRevenue = currentMonthPowerTransactions.reduce((sum, t) =>
      sum + parseFloat(t.transaction_amount.replace(/[₦,]/g, '')), 0
    );
    const previousMonthRevenue = previousMonthPowerTransactions.reduce((sum, t) =>
      sum + parseFloat(t.transaction_amount.replace(/[₦,]/g, '')), 0
    );

    const growthPercentage = previousMonthRevenue > 0
      ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1)
      : '0.0';

    // Map business IDs to business data and create channels
    const channels: Channel[] = topBusinesses.map(([businessId, revenue], index) => {
      const business = businessesData.find(b => b.id === businessId);

      // Generate impression based on revenue ranking and some randomness
      const impression = index < 3 ? Math.floor(Math.random() * 5) + 1 :
        index < 6 ? Math.floor(Math.random() * 3) + 1 :
          Math.floor(Math.random() * 4) - 1;

      return {
        uid: businessId.toString(),
        name: business?.name || `Business ${businessId}`,
        views: Math.floor(revenue / 1000), // Convert to thousands for display
        impression: impression,
      };
    });

    return { channels, totalRevenue, growthPercentage };
  }, []);

  return (
    <Card className="px-4 pb-5 sm:px-5">
      <div className="flex h-14 min-w-0 items-center justify-between py-3">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Top Revenue Earners
        </h2>
      </div>
      <div>
        <p>
          <span className="dark:text-dark-100 text-2xl text-gray-800">
            {formatNumber(totalRevenue / 1000000, 1)}M
          </span>
          <span className={`text-xs ${parseFloat(growthPercentage) >= 0 ? 'text-success dark:text-success-lighter' : 'text-error dark:text-error-lighter'}`}>
            {parseFloat(growthPercentage) >= 0 ? '+' : ''}{growthPercentage}%
          </span>
        </p>
        <p className="text-xs-plus">Total revenue this period</p>
      </div>
      <div className="mt-5 space-y-4">
        {channels.map((channel) => (
          <div
            key={channel.uid}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <a
                href="#"
                className="truncate transition-opacity hover:opacity-80 font-bold"
              >
                {channel.name}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm-plus dark:text-dark-100 text-gray-800">
                {formatNumber(channel.views, 0)}
              </p>
              {channel.impression > 0 ? (
                <ArrowUpIcon className="this:success text-this dark:text-this-lighter size-4" />
              ) : (
                <ArrowDownIcon className="this:error text-this dark:text-this-lighter size-4" />
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
