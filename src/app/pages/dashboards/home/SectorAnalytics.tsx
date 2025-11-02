// Local Imports
import { Card } from "@/components/ui";
import transactionsData from "@/data/transactions.json";
import sectorsData from "@/data/sectors.json";
import businessesData from "@/data/businesses.json";

// ----------------------------------------------------------------------

// Helper function to parse Naira amount to number
const parseNairaAmount = (nairaString: string): number => {
  return parseFloat(nairaString.replace(/[₦,]/g, ''));
};

// Helper function to format Naira amount
const formatNairaAmount = (amount: number): string => {
  return `₦${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

// Calculate sector analytics
const calculateSectorAnalytics = () => {
  const sectorStats: { [key: string]: { sales: number; customers: number; products: number; revenue: number } } = {};

  // Initialize stats for each sector
  sectorsData.forEach(sector => {
    sectorStats[sector.name] = { sales: 0, customers: 0, products: 0, revenue: 0 };
  });

  // Process all transactions
  transactionsData.forEach(transaction => {
    const sector = sectorsData.find(s => s.id === transaction.sector_id);
    const business = businessesData.find(b => b.id === transaction.business_id);

    if (sector && business) {
      const amount = parseNairaAmount(transaction.transaction_amount);

      // Map to our 4 metrics based on sector characteristics
      switch (sector.name) {
        case 'Banking':
          sectorStats[sector.name].sales += 1;
          sectorStats[sector.name].revenue += amount;
          sectorStats[sector.name].customers += 1;
          break;
        case 'Telecommunications':
          sectorStats[sector.name].products += 1;
          sectorStats[sector.name].revenue += amount;
          sectorStats[sector.name].customers += 1;
          break;
        case 'Power':
          sectorStats[sector.name].sales += 1;
          sectorStats[sector.name].revenue += amount;
          break;
        case 'Hotel':
          sectorStats[sector.name].products += 1;
          sectorStats[sector.name].revenue += amount;
          sectorStats[sector.name].customers += 1;
          break;
        default:
          sectorStats[sector.name].sales += 1;
          sectorStats[sector.name].revenue += amount;
      }
    }
  });

  return sectorStats;
};

const sectorAnalytics = calculateSectorAnalytics();

// Safe getter function with fallback
const getSectorStats = (sectorName: string) => {
  return sectorAnalytics[sectorName] || { sales: 0, customers: 0, products: 0, revenue: 0 };
};

// Map sectors to our display metrics
const sectorMapping = {
  'Banking': { title: 'Sales', icon: '💰', color: 'text-green-600' },
  'Telecommunications': { title: 'Customers', icon: '👥', color: 'text-blue-600' },
  'Power': { title: 'Products', icon: '⚡', color: 'text-yellow-600' },
  'Hotel': { title: 'Revenue', icon: '🏨', color: 'text-purple-600' }
};

export function SectorAnalytics() {
  return (
    <div className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {Object.entries(sectorMapping).map(([sectorName, mapping]) => {
        const stats = getSectorStats(sectorName);
        const totalValue = stats.sales + stats.customers + stats.products + stats.revenue;

        return (
          <Card key={sectorName} className="relative overflow-hidden">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {mapping.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mapping.title === 'Revenue' || mapping.title === 'Sales'
                      ? formatNairaAmount(totalValue)
                      : totalValue.toLocaleString()}
                  </p>
                </div>
                <div className={`text-3xl ${mapping.color}`}>
                  {mapping.icon}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {sectorName} Sector
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  {stats.sales > 0 && (
                    <div>
                      <span className="text-gray-500">Sales:</span>
                      <span className="ml-1 font-medium">{stats.sales}</span>
                    </div>
                  )}
                  {stats.customers > 0 && (
                    <div>
                      <span className="text-gray-500">Customers:</span>
                      <span className="ml-1 font-medium">{stats.customers}</span>
                    </div>
                  )}
                  {stats.products > 0 && (
                    <div>
                      <span className="text-gray-500">Products:</span>
                      <span className="ml-1 font-medium">{stats.products}</span>
                    </div>
                  )}
                  {stats.revenue > 0 && (
                    <div className="col-span-2">
                      <span className="text-gray-500">Revenue:</span>
                      <span className="ml-1 font-medium">{formatNairaAmount(stats.revenue)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${mapping.color.replace('text-', 'bg-')}`}></div>
          </Card>
        );
      })}
    </div>
  );
}
