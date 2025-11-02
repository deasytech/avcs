// Import Dependencies
import { EyeIcon } from "@heroicons/react/20/solid";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { CSSProperties } from "react";

// Local Imports
import { Badge, Box, Card } from "@/components/ui";
import { formatNumber } from "@/utils/formatNumber";
import transactionsData from "@/data/transactions.json";
import sectorsData from "@/data/sectors.json";

// ----------------------------------------------------------------------

interface SectorSource {
  uid: number;
  icon: string;
  name: string;
  transactions: number;
  transactionImpression: number;
  revenue: number;
  revenueImpression: number;
}

// Helper function to parse Naira amount to number
const parseNairaAmount = (nairaString: string): number => {
  return parseFloat(nairaString.replace(/[₦,]/g, ''));
};

// Calculate sector analytics
const calculateSectorData = (): SectorSource[] => {
  const sectorStats: { [key: string]: { transactions: number; revenue: number } } = {};

  // Initialize stats for each sector
  sectorsData.forEach(sector => {
    sectorStats[sector.name] = { transactions: 0, revenue: 0 };
  });

  // Process all transactions
  transactionsData.forEach(transaction => {
    const sector = sectorsData.find(s => s.id === transaction.sector_id);
    if (sector) {
      const amount = parseNairaAmount(transaction.transaction_amount);
      sectorStats[sector.name].transactions += 1;
      sectorStats[sector.name].revenue += amount;
    }
  });

  // Map to sector source format with icons and impressions
  const sectorMapping = [
    {
      id: 1,
      name: 'Banking',
      icon: '🏦',
      transactionImpression: 1,
      revenueImpression: 1
    },
    {
      id: 2,
      name: 'Telecoms',
      icon: '📡',
      transactionImpression: 1,
      revenueImpression: 1
    },
    {
      id: 3,
      name: 'Power',
      icon: '⚡',
      transactionImpression: -1,
      revenueImpression: 1
    },
    {
      id: 4,
      name: 'Hotel',
      icon: '🏨',
      transactionImpression: 1,
      revenueImpression: -1
    }
  ];

  return sectorMapping.map(sector => ({
    uid: sector.id,
    icon: sector.icon,
    name: sector.name,
    transactions: sectorStats[sector.name]?.transactions || 0,
    transactionImpression: sector.transactionImpression,
    revenue: sectorStats[sector.name]?.revenue || 0,
    revenueImpression: sector.revenueImpression
  }));
};

const sectors = calculateSectorData();

export function CountrySource() {
  // Calculate total sectors and percentage change
  const totalSectors = sectors.length;

  return (
    <Card className="pb-4">
      <div className="flex h-14 min-w-0 items-center justify-between px-4 py-3 sm:px-5">
        <h2 className="dark:text-dark-100 min-w-0 font-medium tracking-wide text-gray-800">
          Sector Performance
        </h2>
        <a
          href="##"
          className="text-xs-plus text-primary-600 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400/70 dark:focus:text-primary-400/70 border-b border-dotted border-current pb-0.5 font-medium outline-hidden transition-colors duration-300"
        >
          View All
        </a>
      </div>

      <div className="-mt-2 px-4 sm:px-5">
        <p>
          <span className="dark:text-dark-100 text-2xl text-gray-800">{totalSectors}</span>
          <span className="text-success dark:text-success-lighter text-xs">
            {" "}
            +2.1%
          </span>
        </p>
        <p className="text-xs-plus">Active sectors this month</p>
      </div>

      <div
        className="custom-scrollbar mt-3 flex gap-2 overflow-x-auto px-4 whitespace-nowrap sm:px-5"
        style={{ "--margin-scroll": "1.25rem" } as CSSProperties}
      >
        {sectors.map((sector) => (
          <Box
            key={sector.uid}
            className="border-gray-150 dark:border-dark-600 inline-flex shrink-0 items-center gap-4 rounded-lg border p-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{sector.icon}</span>
              <span>{sector.name}</span>
            </div>
            <div className="flex gap-1.5">
              <Badge
                className="h-5 gap-1 rounded-full font-bold"
                color={sector.transactionImpression === 1 ? "success" : "error"}
                variant="soft"
              >
                <EyeIcon className="size-3.5" />
                <span>{formatNumber(sector.transactions)}</span>
                {sector.transactionImpression === 1 ? (
                  <ArrowTrendingUpIcon className="size-3.5" />
                ) : (
                  <ArrowTrendingDownIcon className="size-3.5" />
                )}
              </Badge>
              <Badge
                className="h-5 gap-1 rounded-full font-bold"
                color={sector.revenueImpression === 1 ? "success" : "error"}
                variant="soft"
              >
                <span>₦{formatNumber(sector.revenue)}</span>
                {sector.revenueImpression === 1 ? (
                  <ArrowTrendingUpIcon className="size-3.5" />
                ) : (
                  <ArrowTrendingDownIcon className="size-3.5" />
                )}
              </Badge>
            </div>
          </Box>
        ))}
      </div>
    </Card>
  );
}
