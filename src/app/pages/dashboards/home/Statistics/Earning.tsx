// Import Dependencies
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Card } from "@/components/ui";
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

// Calculate total earnings across all sectors
const calculateTotalRevenue = () => {
  const sectorTotals: { [key: number]: number } = {};

  transactionsData.forEach(transaction => {
    const amount = roundToTwoDecimals(parseNairaAmount(transaction.transaction_amount));
    if (!sectorTotals[transaction.sector_id]) {
      sectorTotals[transaction.sector_id] = 0;
    }
    sectorTotals[transaction.sector_id] += amount;
  });

  // Calculate total revenue across all sectors
  const totalRevenue = Object.values(sectorTotals).reduce((sum, amount) => sum + amount, 0);
  return roundToTwoDecimals(totalRevenue);
};

const totalRevenue = calculateTotalRevenue();

const series = [
  {
    name: "Total Revenue",
    data: [totalRevenue * 0.2, totalRevenue * 0.3, totalRevenue * 0.15, totalRevenue * 0.25, totalRevenue * 0.1],
  },
];

const chartConfig: ApexOptions = {
  grid: {
    show: false,
    padding: {
      left: -8,
      right: 0,
      bottom: -8,
      top: 0,
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
  xaxis: {
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
  chart: {
    toolbar: {
      show: false,
    },
    stacked: true,
    stackType: "100%",
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val: number) {
        const roundedVal = roundToTwoDecimals(val);
        return '₦' + roundedVal.toLocaleString();
      }
    }
  },
  fill: {
    colors: ["#0EA5E9", "#e2e8f0"],
  },
  plotOptions: {
    bar: {
      borderRadius: 2,
      horizontal: false,
      columnWidth: "25%",
    },
  },
  legend: {
    show: false,
  },
};

export function Earning() {
  // Format Naira amount for display
  const formatNairaAmount = (amount: number): string => {
    return `₦${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <Card className="row-span-2 flex flex-col px-4 sm:px-5">
      <h2 className="min-w-0 pt-3 font-medium tracking-wide text-gray-800 dark:text-dark-100">
        Total Revenue
      </h2>
      <p className="grow mt-1 text-xl font-semibold text-gray-800 dark:text-dark-100">
        {formatNairaAmount(totalRevenue)}
      </p>
      <div>
        <Chart type="bar" height={120} options={chartConfig} series={series} />
      </div>
    </Card>
  );
}
