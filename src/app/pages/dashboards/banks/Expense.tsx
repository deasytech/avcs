// Import Dependencies
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Card } from "@/components/ui";
import transactionsData from "@/data/transactions.json";

// ----------------------------------------------------------------------

const series = [
  {
    name: "Expense",
    data: [82, 25, 60, 30, 50, 20],
  },
];

const chartConfig: ApexOptions = {
  colors: ["#FF5724"],
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
      top: -20,
      bottom: -8,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.45,
      opacityTo: 0.1,
      stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    width: 2,
  },
  tooltip: {
    shared: true,
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

// Calculate total chargeable amount for Banking sector (sector_id: 1)
const calculateBankingChargeable = () => {
  const bankingTransactions = transactionsData.filter(
    (transaction) => transaction.sector_id === 1
  );

  const totalChargeable = bankingTransactions.reduce((sum, transaction) => {
    // Remove currency symbol and convert to number
    const chargeableAmount = parseFloat(
      transaction.transaction_amount_chargeable.replace(/[₦,]/g, '')
    );
    return sum + chargeableAmount;
  }, 0);

  return totalChargeable;
};

export function Expense() {
  const totalChargeable = calculateBankingChargeable();

  return (
    <Card className="overflow-hidden">
      <div className="flex min-w-0 items-center justify-between px-4 pt-3 sm:px-5">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Volume Trend
        </h2>
      </div>
      <p className="dark:text-dark-100 grow px-4 text-xl font-semibold text-gray-800 sm:px-5">
        ₦{totalChargeable.toLocaleString()}
      </p>
      <div className="ax-transparent-gridline">
        <Chart options={chartConfig} series={series} type="area" height={150} />
      </div>
    </Card>
  );
}
