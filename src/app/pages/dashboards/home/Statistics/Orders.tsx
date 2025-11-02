// Import Dependencies
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Card } from "@/components/ui";
import transactionsData from "@/data/transactions.json";
import sectorsData from "@/data/sectors.json";

// ----------------------------------------------------------------------

// Helper function to round to 2 decimal places
const roundToTwoDecimals = (num: number): number => {
  return Math.round(num * 100) / 100;
};

// Calculate transaction counts by sector
const calculateSectorTransactionCounts = () => {
  const sectorCounts: { [key: number]: number } = {};

  transactionsData.forEach(transaction => {
    if (!sectorCounts[transaction.sector_id]) {
      sectorCounts[transaction.sector_id] = 0;
    }
    sectorCounts[transaction.sector_id] += 1;
  });

  return sectorCounts;
};

const sectorTransactionCounts = calculateSectorTransactionCounts();
const totalTransactions = Object.values(sectorTransactionCounts).reduce((sum, count) => sum + count, 0);

// Create series data for top sectors
const topSectors = Object.entries(sectorTransactionCounts)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 6)
  .map(([sectorId, count]) => ({
    name: sectorsData.find(s => s.id === parseInt(sectorId))?.name || `Sector ${sectorId}`,
    count: roundToTwoDecimals(count)
  }));

const series = [
  {
    name: "Transactions by Sector",
    data: topSectors.map(sector => sector.count),
  },
];

const chartConfig: ApexOptions = {
  colors: ["#FF9800"],

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
      bottom: -10,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
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
    y: {
      formatter: function (val: number) {
        const roundedVal = roundToTwoDecimals(val);
        return roundedVal.toLocaleString() + ' transactions';
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

export function Orders() {
  return (
    <Card className="row-span-2 flex flex-col">
      <h2 className="min-w-0 px-4 pt-3 font-medium tracking-wide text-gray-800 dark:text-dark-100 sm:px-5">
        Transaction Volume
      </h2>
      <p className="grow px-4 mt-1 text-xl font-semibold text-gray-800 dark:text-dark-100 sm:px-5">
        {totalTransactions.toLocaleString()}
      </p>
      <div className="ax-transparent-gridline">
        <Chart type="area" height={140} options={chartConfig} series={series} />
      </div>
    </Card>
  );
}
