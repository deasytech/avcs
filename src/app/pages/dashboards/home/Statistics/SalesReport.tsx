// Import Dependencies
import Chart from "react-apexcharts";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from "@headlessui/react";
import { clsx } from "clsx";
import { Fragment, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Button, Card } from "@/components/ui";
import transactionsData from "@/data/transactions.json";

// ----------------------------------------------------------------------

// Helper function to parse Naira amount to number
const parseNairaAmount = (nairaString: string): number => {
  return parseFloat(nairaString.replace(/[₦,]/g, ''));
};

// Helper function to round to 2 decimal places
const roundToTwoDecimals = (num: number): number => {
  return Math.round(num * 100) / 100;
};

// Process transaction data for all available months
const processTransactionData = () => {
  // Group transactions by month
  const monthlyData: { [key: string]: { total: number; count: number } } = {};

  // Find the date range of available data
  let earliestDate = new Date('2025-12-31');
  let latestDate = new Date('2025-01-01');

  transactionsData.forEach(transaction => {
    const transactionDate = new Date(transaction.transaction_date);
    const monthKey = transactionDate.toLocaleDateString('en-US', { month: 'short' });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { total: 0, count: 0 };
    }
    monthlyData[monthKey].total += roundToTwoDecimals(parseNairaAmount(transaction.transaction_amount));
    monthlyData[monthKey].count += 1;

    // Track date range
    if (transactionDate < earliestDate) earliestDate = transactionDate;
    if (transactionDate > latestDate) latestDate = transactionDate;
  });

  // Get all months that have data, in chronological order
  const monthsWithData = Object.keys(monthlyData).sort((a, b) => {
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });

  // If we have less than 6 months, pad with additional months
  const targetMonths = 6;
  const months = monthsWithData.slice(0, targetMonths);

  // If we need more months, add them
  if (months.length < targetMonths) {
    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startIndex = allMonths.indexOf(months[0] || 'Jan');

    for (let i = 0; i < targetMonths; i++) {
      const monthIndex = (startIndex - targetMonths + 1 + i + 12) % 12;
      const monthName = allMonths[monthIndex];
      if (!months.includes(monthName)) {
        months.unshift(monthName);
      }
    }
  }

  // Ensure we have exactly 6 months
  const finalMonths = months.slice(-6);
  const totalAmounts = finalMonths.map(month => monthlyData[month]?.total || 0);
  const transactionCounts = finalMonths.map(month => monthlyData[month]?.count || 0);

  return { months: finalMonths, totalAmounts, transactionCounts };
};

const { months, totalAmounts, transactionCounts } = processTransactionData();

const data = {
  yearly: {
    series: [
      {
        name: "Transaction Volume (₦)",
        data: totalAmounts,
      },
      {
        name: "Transaction Count",
        data: transactionCounts,
      },
    ],
    categories: months,
  },
  monthly: {
    series: [
      {
        name: "Transaction Volume (₦)",
        data: totalAmounts,
      },
      {
        name: "Transaction Count",
        data: transactionCounts,
      },
    ],
    categories: months,
  },
  daily: {
    series: [
      {
        name: "Transaction Volume (₦)",
        data: totalAmounts.slice(-7), // Last 7 days
      },
      {
        name: "Transaction Count",
        data: transactionCounts.slice(-7),
      },
    ],
    categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
  },
};

type DataRanges = keyof typeof data;

const chartConfig: ApexOptions = {
  colors: ["#4C4EE7", "#0EA5E9"],
  chart: {
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      }
    },
    background: 'transparent',
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '10px',
      fontWeight: 'bold',
      colors: ['#333', '#333']
    },
    formatter: function (val: number, opts: any) {
      const roundedVal = roundToTwoDecimals(val);
      if (opts.seriesIndex === 0) {
        return '₦' + (roundedVal / 1000000).toFixed(1) + 'M';
      } else {
        return roundedVal.toLocaleString();
      }
    },
    offsetY: -5,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      barHeight: "85%",
      columnWidth: "45%",
      distributed: false,
      dataLabels: {
        position: 'top',
      }
    },
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'right',
    fontSize: '12px',
    fontWeight: 'bold',
    labels: {
      colors: ['#4C4EE7', '#0EA5E9'],
      useSeriesColors: true
    },
    markers: {
      size: 12,
      strokeWidth: 2,
    }
  },
  xaxis: {
    axisBorder: {
      show: true,
      color: '#e0e0e0',
      height: 1,
    },
    axisTicks: {
      show: true,
      color: '#e0e0e0',
    },
    labels: {
      style: {
        fontSize: '11px',
        fontWeight: '600',
        colors: '#666'
      }
    },
    tooltip: {
      enabled: true,
    },
  },
  grid: {
    show: true,
    borderColor: '#f0f0f0',
    strokeDashArray: 3,
    padding: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
    },
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  yaxis: {
    axisBorder: {
      show: true,
      color: '#e0e0e0',
    },
    axisTicks: {
      show: true,
      color: '#e0e0e0',
    },
    labels: {
      show: true,
      style: {
        fontSize: '10px',
        fontWeight: '600',
        colors: '#666'
      },
      formatter: function (val: number) {
        const roundedVal = roundToTwoDecimals(val);
        if (roundedVal >= 1000000) {
          return '₦' + (roundedVal / 1000000).toFixed(1) + 'M';
        } else if (roundedVal >= 1000) {
          return '₦' + (roundedVal / 1000).toFixed(0) + 'K';
        } else {
          return '₦' + roundedVal.toLocaleString();
        }
      }
    },
  },
  tooltip: {
    enabled: true,
    shared: true,
    intersect: false,
    y: {
      formatter: function (val: number, opts: any) {
        const roundedVal = roundToTwoDecimals(val);
        if (opts.seriesIndex === 0) {
          return '₦' + roundedVal.toLocaleString();
        } else {
          return roundedVal.toLocaleString() + ' transactions';
        }
      }
    },
    style: {
      fontSize: '12px',
    }
  }
};

export function SalesReport() {
  const [activeRange, setActiveRange] = useState<DataRanges>("monthly");
  const chartOptions = JSON.parse(JSON.stringify(chartConfig));
  chartOptions.xaxis.categories = data[activeRange].categories;

  return (
    <Card className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-8">
      <div className="mt-3 flex flex-col justify-between gap-2 px-4 sm:flex-row sm:items-center sm:px-5">
        <div className="flex flex-1 items-center justify-between space-x-2 sm:flex-initial">
          <h2 className="text-sm-plus dark:text-dark-100 font-medium tracking-wide text-gray-800">
            6 Months Transaction Report
          </h2>
          <ActionMenu />
        </div>
        <RadioGroup
          name="options"
          value={activeRange}
          onChange={setActiveRange}
          className="flex flex-wrap -space-x-px"
        >
          <Radio
            as={Button}
            unstyled
            value="daily"
            className={({ checked }: { checked: boolean }) =>
              clsx(
                "text-xs-plus dark:border-dark-450 dark:text-dark-100 h-8 border border-gray-300 px-3 text-gray-800 first:ltr:rounded-l-lg last:ltr:rounded-r-lg first:rtl:rounded-r-lg last:rtl:rounded-l-lg",
                checked && "dark:bg-surface-2 bg-gray-200",
              )
            }
          >
            Daily
          </Radio>
          <Radio
            as={Button}
            unstyled
            value="monthly"
            className={({ checked }: { checked: boolean }) =>
              clsx(
                "text-xs-plus dark:border-dark-450 dark:text-dark-100 h-8 border border-gray-300 px-3 text-gray-800 first:ltr:rounded-l-lg last:ltr:rounded-r-lg first:rtl:rounded-r-lg last:rtl:rounded-l-lg",
                checked && "dark:bg-surface-2 bg-gray-200",
              )
            }
          >
            Monthly
          </Radio>
          <Radio
            as={Button}
            unstyled
            value="yearly"
            className={({ checked }: { checked: boolean }) =>
              clsx(
                "text-xs-plus dark:border-dark-450 dark:text-dark-100 h-8 border border-gray-300 px-3 text-gray-800 first:ltr:rounded-l-lg last:ltr:rounded-r-lg first:rtl:rounded-r-lg last:rtl:rounded-l-lg",
                checked && "dark:bg-surface-2 bg-gray-200",
              )
            }
          >
            Yearly
          </Radio>
        </RadioGroup>
      </div>
      <div className="ax-transparent-gridline pr-2">
        <Chart
          type="bar"
          height="260"
          options={chartOptions}
          series={data[activeRange].series}
        />
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
        <MenuItems className="dark:border-dark-500 dark:bg-dark-700 absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 sm:ltr:left-0 rtl:left-0 sm:rtl:right-0 dark:shadow-none">
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
