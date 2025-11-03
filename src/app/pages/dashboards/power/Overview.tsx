// Import Dependencies
import {
  Radio,
  RadioGroup,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  CheckBadgeIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";

// Local Imports
import { Button, Card } from "@/components/ui";
import transactionsData from "@/data/transactions.json";

// ----------------------------------------------------------------------

// Helper function to parse Naira amount string to number
const parseNairaAmount = (amountStr: string): number => {
  return parseFloat(amountStr.replace(/[₦,]/g, ''));
};

// Process transaction data for power sector (sector_id: 3)
const processTransactionData = () => {
  const monthlyData: { [key: string]: { chargeable: number; vat: number; volume: number } } = {};
  const yearlyData: { [key: string]: { chargeable: number; vat: number; volume: number } } = {};

  // Filter transactions for power sector only
  const powerTransactions = transactionsData.filter(transaction => transaction.sector_id === 3);

  powerTransactions.forEach(transaction => {
    const date = new Date(transaction.transaction_date);
    const monthKey = date.toLocaleString('default', { month: 'short' });
    const yearKey = date.getFullYear().toString();

    const chargeable = parseNairaAmount(transaction.transaction_amount_chargeable);
    const vat = parseNairaAmount(transaction.transaction_amount_vat);

    // Monthly data
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { chargeable: 0, vat: 0, volume: 0 };
    }
    monthlyData[monthKey].chargeable += chargeable;
    monthlyData[monthKey].vat += vat;
    monthlyData[monthKey].volume += 1; // Count of transactions

    // Yearly data
    if (!yearlyData[yearKey]) {
      yearlyData[yearKey] = { chargeable: 0, vat: 0, volume: 0 };
    }
    yearlyData[yearKey].chargeable += chargeable;
    yearlyData[yearKey].vat += vat;
    yearlyData[yearKey].volume += 1; // Count of transactions
  });

  // Get sorted months and years
  const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });

  const sortedYears = Object.keys(yearlyData).sort();

  return {
    monthly: {
      categories: sortedMonths,
      chargeable: sortedMonths.map(month => Math.round(monthlyData[month].chargeable)),
      vat: sortedMonths.map(month => Math.round(monthlyData[month].vat)),
      volume: sortedMonths.map(month => monthlyData[month].volume), // Keep as count
    },
    yearly: {
      categories: sortedYears,
      chargeable: sortedYears.map(year => Math.round(yearlyData[year].chargeable)),
      vat: sortedYears.map(year => Math.round(yearlyData[year].vat)),
      volume: sortedYears.map(year => yearlyData[year].volume), // Keep as count
    },
  };
};

const processedData = processTransactionData();

const data = {
  yearly: {
    series: [
      {
        name: "Chargeable",
        data: processedData.yearly.chargeable,
      },
      {
        name: "VAT",
        data: processedData.yearly.vat,
      },
      {
        name: "Volume",
        data: processedData.yearly.volume,
      },
    ],
    categories: processedData.yearly.categories,
  },
  monthly: {
    series: [
      {
        name: "Chargeable",
        data: processedData.monthly.chargeable,
      },
      {
        name: "VAT",
        data: processedData.monthly.vat,
      },
      {
        name: "Volume",
        data: processedData.monthly.volume,
      },
    ],
    categories: processedData.monthly.categories,
  },
};

type DataRange = keyof typeof data;

// Calculate overview metrics for power sector (sector_id: 3)
const calculateOverviewMetrics = () => {
  // Filter transactions for power sector only
  const powerTransactions = transactionsData.filter(transaction => transaction.sector_id === 3);

  const allTransactions = powerTransactions.reduce((sum, transaction) =>
    sum + parseNairaAmount(transaction.transaction_amount), 0);
  const totalChargeable = powerTransactions.reduce((sum, transaction) =>
    sum + parseNairaAmount(transaction.transaction_amount_chargeable), 0);
  const totalVat = powerTransactions.reduce((sum, transaction) =>
    sum + parseNairaAmount(transaction.transaction_amount_vat), 0);
  const totalVolume = powerTransactions.length; // Count of transactions

  return {
    allTransactions: Math.round(allTransactions),
    vatChargeable: Math.round(totalChargeable),
    vatIncome: Math.round(totalVat),
    totalVolume: totalVolume,
  };
};

const chartConfig = {
  colors: ["#4C4EE7", "#26E7A6", "#FF9800"],
  chart: {
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      barHeight: "90%",
      columnWidth: "35%",
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    labels: {
      hideOverlappingLabels: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
  yaxis: {
    show: false,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 850,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "55%",
          },
        },
      },
    },
  ],
};

export function Overview() {
  const [focusRange, setFocusRange] = useState<DataRange>("monthly");
  const chartOptions = JSON.parse(JSON.stringify(chartConfig));
  chartOptions.xaxis.categories = data[focusRange].categories;

  const metrics = useMemo(() => calculateOverviewMetrics(), []);

  return (
    <Card className="col-span-12 lg:col-span-8">
      <div className="flex flex-col justify-between px-4 pt-3 sm:flex-row sm:items-center sm:px-5">
        <div className="flex flex-1 items-center justify-between space-x-2 sm:flex-initial">
          <h2 className="text-sm-plus dark:text-dark-100 font-medium tracking-wide text-gray-800">
            Overview
          </h2>
        </div>
        <RadioGroup
          name="options"
          value={focusRange}
          onChange={setFocusRange}
          className="hidden gap-2 sm:flex"
        >
          <Radio as={Fragment} value="monthly">
            {({ checked }) => (
              <Button
                className="h-8 rounded-full text-xs"
                variant={checked ? "soft" : "flat"}
                color={checked ? "primary" : "neutral"}
              >
                Monthly
              </Button>
            )}
          </Radio>
          <Radio as={Fragment} value="yearly">
            {({ checked }) => (
              <Button
                className="h-8 rounded-full text-xs"
                variant={checked ? "soft" : "flat"}
                color={checked ? "primary" : "neutral"}
              >
                Yearly
              </Button>
            )}
          </Radio>
        </RadioGroup>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 px-4 sm:mt-5 sm:grid-cols-4 sm:px-5 lg:mt-6">
        <div className="dark:bg-surface-3 rounded-lg bg-gray-100 p-3 2xl:p-4">
          <div className="flex justify-between space-x-1">
            <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
              ₦{metrics.allTransactions.toLocaleString()}
            </p>
            <CurrencyDollarIcon className="this:secondary text-this dark:text-this-light size-5" />
          </div>
          <p className="text-xs-plus mt-1">All Transactions</p>
        </div>
        <div className="dark:bg-surface-3 rounded-lg bg-gray-100 p-3 2xl:p-4">
          <div className="flex justify-between space-x-1">
            <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
              ₦{metrics.vatChargeable.toLocaleString()}
            </p>
            <CheckBadgeIcon className="this:success text-this dark:text-this-light size-5" />
          </div>
          <p className="text-xs-plus mt-1">VAT Chargeable</p>
        </div>
        <div className="dark:bg-surface-3 rounded-lg bg-gray-100 p-3 2xl:p-4">
          <div className="flex justify-between space-x-1">
            <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
              ₦{metrics.vatIncome.toLocaleString()}
            </p>
            <ArrowPathIcon className="this:primary text-this dark:text-this-light size-5" />
          </div>
          <p className="text-xs-plus mt-1">VAT Income</p>
        </div>
        <div className="dark:bg-surface-3 rounded-lg bg-gray-100 p-3 2xl:p-4">
          <div className="flex justify-between space-x-1">
            <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
              {metrics.totalVolume.toLocaleString()}
            </p>
            <ClockIcon className="this:warning text-this dark:text-this-light size-5" />
          </div>
          <p className="text-xs-plus mt-1">Total Volume</p>
        </div>
      </div>

      <div className="ax-transparent-gridline mt-2 overflow-hidden px-2">
        <ReactApexChart
          options={chartOptions}
          series={data[focusRange].series}
          type="bar"
          height={270}
        />
      </div>
    </Card>
  );
}
