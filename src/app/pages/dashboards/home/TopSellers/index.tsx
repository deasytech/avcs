// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment } from "react";
import { register } from "swiper/element/bundle";

// Local Imports
import { Button, Card } from "@/components/ui";
import { SellerCard } from "./SellerCard";
import { useLocaleContext } from "@/app/contexts/locale/context";
import sectorsData from "@/data/sectors.json";
import businessesData from "@/data/businesses.json";
import transactionsData from "@/data/transactions.json";

// ----------------------------------------------------------------------

register();

// Utility function to parse naira amount
const parseNairaAmount = (amount: string): number => {
  return parseFloat(amount.replace(/[₦,]/g, ''));
};

// Calculate sector performance data
const calculateSectorPerformance = () => {
  const sectorStats: {
    [key: string]: {
      totalRevenue: number;
      transactionCount: number;
      topBusiness: string;
      growth: number;
      monthlyData: number[];
    }
  } = {};

  // Initialize stats for each sector
  sectorsData.forEach(sector => {
    sectorStats[sector.name] = {
      totalRevenue: 0,
      transactionCount: 0,
      topBusiness: '',
      growth: Math.random() * 10 - 2, // Random growth between -2% and 8%
      monthlyData: Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000) + 100)
    };
  });

  // Calculate revenue and transaction counts by sector
  transactionsData.forEach(transaction => {
    const sector = sectorsData.find(s => s.id === transaction.sector_id);
    if (sector) {
      const amount = parseNairaAmount(transaction.transaction_amount);
      sectorStats[sector.name].totalRevenue += amount;
      sectorStats[sector.name].transactionCount += 1;
    }
  });

  // Find top business for each sector
  Object.keys(sectorStats).forEach(sectorName => {
    const sector = sectorsData.find(s => s.name === sectorName);
    if (sector) {
      const sectorBusinesses = businessesData.filter(b => b.sector_id === sector.id);
      if (sectorBusinesses.length > 0) {
        // Pick the first business as the "top" business for simplicity
        sectorStats[sectorName].topBusiness = sectorBusinesses[0].name;
      }
    }
  });

  return sectorStats;
};

// Get sector avatar based on sector name
const getSectorAvatar = (sectorName: string): string | undefined => {
  const sectorAvatars: { [key: string]: string } = {
    'Banking': '/images/avatar/avatar-20.jpg',
    'Telecoms': '/images/avatar/avatar-5.jpg',
    'Power': '/images/avatar/avatar-11.jpg',
    'Hotel': '/images/avatar/avatar-1.jpg'
  };
  return sectorAvatars[sectorName];
};

export function TopSellers() {
  const { direction } = useLocaleContext();

  // Calculate sector performance data
  const sectorPerformance = calculateSectorPerformance();

  // Transform sector data to match Seller interface
  const sectorSellers = Object.entries(sectorPerformance).map(([sectorName, stats], index) => ({
    id: (index + 1).toString(),
    avatar: getSectorAvatar(sectorName),
    name: sectorName,
    sales: `₦${Math.floor(stats.totalRevenue / 1000000)}M`, // Convert to millions
    impression: stats.growth,
    chartData: stats.monthlyData,
  }));

  return (
    <Card className="pb-4">
      <div className="flex min-w-0 items-center justify-between px-4 py-3">
        <h2 className="dark:text-dark-100 min-w-0 font-medium tracking-wide text-gray-800">
          Top Performing Sectors
        </h2>
        <ActionMenu />
      </div>
      {/* @ts-expect-error - Swiper web components */}
      <swiper-container
        pagination
        pagination-clickable
        slides-per-view="1"
        dir={direction}
        space-between="16"
      >
        {sectorSellers.map((seller) => (
          <Fragment key={seller.id}>
            {/* @ts-expect-error - Swiper web components */}
            <swiper-slide>
              <SellerCard {...seller} />
              {/* @ts-expect-error - Swiper web components */}
            </swiper-slide>
          </Fragment>
        ))}
        {/* @ts-expect-error - Swiper web components */}
      </swiper-container>
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
