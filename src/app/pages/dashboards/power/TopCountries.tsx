// Local Imports
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/ui";
import transactionsData from "@/data/transactions.json";
import businessesData from "@/data/businesses.json";

// ----------------------------------------------------------------------

type BusinessStats = {
  id: number;
  name: string;
  transactionCount: number;
  totalAmount: number;
  rating: number;
  trend: number;
};

export function TopCountries() {
  // Get power businesses (sector_id: 3)
  const powerBusinesses = businessesData.filter(
    (business) => business.sector_id === 3
  );

  // Calculate stats for each power business
  const businessStats: BusinessStats[] = powerBusinesses.map((business) => {
    const businessTransactions = transactionsData.filter(
      (transaction) => transaction.business_id === business.id && transaction.sector_id === 3
    );

    const transactionCount = businessTransactions.length;

    // Calculate total transaction amount (remove currency symbols and convert to number)
    const totalAmount = businessTransactions.reduce((sum, transaction) => {
      const amountStr = transaction.transaction_amount.replace(/[₦,]/g, '');
      return sum + parseFloat(amountStr);
    }, 0);

    // Calculate trend based on recent transactions (last 3 months vs previous 3 months)
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);

    const recentTransactions = businessTransactions.filter(t => new Date(t.transaction_date) >= threeMonthsAgo);
    const previousTransactions = businessTransactions.filter(t =>
      new Date(t.transaction_date) >= sixMonthsAgo && new Date(t.transaction_date) < threeMonthsAgo
    );

    const recentCount = recentTransactions.length;
    const previousCount = previousTransactions.length;
    const trend = previousCount > 0 ? ((recentCount - previousCount) / previousCount) * 100 : 0;

    return {
      id: business.id,
      name: business.name,
      transactionCount,
      totalAmount,
      rating: business.rating,
      trend: Math.round(trend)
    };
  });

  // Sort by transaction count (highest first)
  const sortedBusinessStats = businessStats.sort((a, b) => b.transactionCount - a.transactionCount);

  // Count total power transactions
  const powerTransactionCount = transactionsData.filter(
    (transaction) => transaction.sector_id === 3
  ).length;

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `₦${(amount / 1000).toFixed(1)}K`;
    } else {
      return `₦${amount.toFixed(0)}`;
    }
  };

  return (
    <Card className="px-4 pb-5 sm:px-5">
      <div className="flex h-14 min-w-0 items-center justify-between py-3">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Transaction Volume
        </h2>
      </div>
      <div>
        <p>
          <span className="dark:text-dark-100 text-2xl text-gray-800">{powerTransactionCount}</span>
        </p>
        <p className="text-xs-plus">Total Transactions</p>
      </div>
      <div className="mt-5 space-y-4">
        {sortedBusinessStats.map((business) => (
          <div
            key={business.id}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <div className="size-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-300">
                  {business.name.charAt(0)}
                </span>
              </div>
              <a
                href="##"
                className="truncate transition-opacity hover:opacity-80"
              >
                {business.name}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm-plus dark:text-dark-100 text-gray-800 font-medium">
                  {business.transactionCount}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatCurrency(business.totalAmount)}
                </p>
              </div>
              {business.trend > 0 ? (
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
