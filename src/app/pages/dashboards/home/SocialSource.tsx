// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";

// Local Imports
import { Button, Card } from "@/components/ui";
import { formatNumber } from "@/utils/formatNumber";
import sectorsData from "@/data/sectors.json";
import businessesData from "@/data/businesses.json";
import transactionsData from "@/data/transactions.json";

// ----------------------------------------------------------------------

interface SectorSource {
  uid: string;
  name: string;
  businesses: number;
  transactionVolume: number;
  revenue: number;
  growth: number;
  trend: number;
}

// Calculate sector metrics from data
const calculateSectorMetrics = (): SectorSource[] => {
  const sectorMetrics = sectorsData.map(sector => {
    const sectorBusinesses = businessesData.filter(b => b.sector_id === sector.id);
    const sectorTransactions = transactionsData.filter(t => t.sector_id === sector.id);

    // Calculate total transaction volume (number of transactions)
    const transactionVolume = sectorTransactions.length;

    // Calculate total revenue from transaction amounts
    const revenue = sectorTransactions.reduce((total, transaction) => {
      // Remove ₦ symbol and convert to number
      const amount = parseFloat(transaction.transaction_amount.replace(/[₦,]/g, ''));
      return total + amount;
    }, 0);

    // Calculate growth percentage (mock data for demonstration)
    const growth = Math.floor(Math.random() * 20) - 5; // Random between -5% and 15%
    const trend = growth >= 0 ? 1 : -1;

    return {
      uid: sector.id.toString(),
      name: sector.name,
      businesses: sectorBusinesses.length,
      transactionVolume,
      revenue,
      growth,
      trend
    };
  });

  return sectorMetrics;
};

const sectors: SectorSource[] = calculateSectorMetrics();

export function SocialSource() {
  // Calculate total metrics for header
  const totalBusinesses = sectors.reduce((sum, sector) => sum + sector.businesses, 0);
  const avgGrowth = sectors.reduce((sum, sector) => sum + sector.growth, 0) / sectors.length;

  return (
    <Card className="pb-2">
      <div className="flex h-14 min-w-0 items-center justify-between px-4 py-3 sm:px-5">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Sector Overview
        </h2>
        <ActionMenu />
      </div>
      <div className="px-4 sm:px-5">
        <p>
          <span className="dark:text-dark-100 text-2xl text-gray-800">
            {formatNumber(totalBusinesses)}
          </span>
          <span className={`text-xs ${avgGrowth >= 0 ? 'text-success dark:text-success-lighter' : 'text-error dark:text-error-lighter'}`}>
            {avgGrowth >= 0 ? '+' : ''}{avgGrowth.toFixed(1)}%
          </span>
        </p>
        <p className="text-xs-plus">Total businesses across all sectors</p>
      </div>
      <div className="mt-2 w-full overflow-x-auto px-4 sm:px-5">
        <table className="w-full">
          <tbody>
            {sectors.map((sector) => (
              <tr key={sector.uid}>
                <td className="w-full">
                  <div className="flex items-center gap-2 py-2">
                    <div className="size-6 rounded bg-gray-100 dark:bg-dark-600 flex items-center justify-center">
                      <BuildingOfficeIcon className="size-4 text-gray-600 dark:text-dark-200" />
                    </div>
                    <a
                      href="##"
                      className="truncate transition-opacity hover:opacity-80 font-medium"
                    >
                      {sector.name}
                    </a>
                  </div>
                </td>
                <td>
                  <div className="flex justify-end">
                    <div className="flex items-center gap-1 py-2 font-medium">
                      <span className="text-xs-plus">
                        {formatNumber(sector.transactionVolume)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-dark-400">txns</span>
                      {sector.trend === 1 ? (
                        <ArrowTrendingUpIcon className="this:success text-this dark:text-this-lighter size-3" />
                      ) : (
                        <ArrowTrendingDownIcon className="this:error text-this dark:text-this-lighter size-3" />
                      )}
                    </div>
                    <div className="dark:bg-dark-500 mx-1.5 my-2 w-px bg-gray-200"></div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-start gap-1 py-2 font-medium">
                    <span className="text-xs-plus">
                      ₦{formatNumber(Math.floor(sector.revenue / 1000000))}M
                    </span>
                    {sector.trend === 1 ? (
                      <ArrowTrendingUpIcon className="this:success text-this dark:text-this-lighter size-3" />
                    ) : (
                      <ArrowTrendingDownIcon className="this:error text-this dark:text-this-lighter size-3" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function ActionMenu() {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left ltr:-mr-1.5 rtl:-ml-1.5"
    >
      <MenuButton
        as={Button}
        variant="flat"
        isIcon
        className="size-8 rounded-full"
      >
        <EllipsisHorizontalIcon className="size-5" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <MenuItems className="dark:border-dark-500 dark:bg-dark-700 absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 rtl:left-0 dark:shadow-none">
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Action</span>
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Another action</span>
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Other action</span>
              </button>
            )}
          </MenuItem>

          <hr className="border-gray-150 dark:border-dark-500 mx-3 my-1.5 h-px" />

          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Separated action</span>
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
