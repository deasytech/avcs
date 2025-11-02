// Import Dependencies
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Box } from "@/components/ui";
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

// Calculate total balance from all transactions
const calculateTotalBalance = () => {
  const rawTotal = transactionsData.reduce((total, transaction) => {
    return total + parseNairaAmount(transaction.transaction_amount);
  }, 0);
  return roundToTwoDecimals(rawTotal);
};

const totalBalance = calculateTotalBalance();

const series = [
  {
    name: "Balance",
    data: [0, totalBalance * 0.3, totalBalance * 0.8, totalBalance],
  },
];

const chartConfig: ApexOptions = {
  colors: ["#fff"],
  chart: {
    stacked: false,
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
      top: -28,
    },
  },
  stroke: {
    width: 3,
    curve: "smooth",
  },
  tooltip: {
    shared: true,
    y: {
      formatter: function (val: number) {
        const roundedVal = roundToTwoDecimals(val);
        return '₦' + roundedVal.toLocaleString();
      }
    }
  },
  legend: {
    show: false,
  },
  yaxis: {
    show: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
};

export function CurrentBalance() {
  return (
    <Box className="from-primary-600 to-primary-500 relative flex flex-col rounded-lg bg-linear-to-br px-5 pb-5">
      <div className="ax-transparent-gridline mt-5 w-1/2">
        <Chart type="line" height="70" series={series} options={chartConfig} />
      </div>
      <p className="mt-8 text-3xl font-semibold">
        <span className="text-white/80">₦</span>
        <span className="text-white">{totalBalance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
      </p>
      <p className="font-medium tracking-wide text-white/80">Total Transaction Volume</p>
    </Box>
  );
}
