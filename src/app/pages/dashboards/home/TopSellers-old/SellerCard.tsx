// Local Imports
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Import Dependencies
import { Box } from "@/components/ui";

// ----------------------------------------------------------------------

export interface Seller {
  id: string;
  avatar?: string;
  name: string;
  sales: string;
  impression: number;
  chartData: number[];
}

const chartConfig: ApexOptions = {
  colors: ["#4467EF"],
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
    curve: "smooth",
    width: 3,
  },

  grid: {
    padding: {
      left: 0,
      right: 0,
      top: -10,
      bottom: 0,
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
};

export function SellerCard({
  name,
  sales,
  impression,
  chartData,
}: Seller) {
  return (
    <Box className="px-4">
      <div className="flex flex-col items-center space-y-3 pt-4 text-center">
        <div>
          <p className="dark:text-dark-100 text-base font-medium text-gray-800">
            {name}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <div className="dark:bg-surface-3 rounded-xl bg-slate-100 p-4">
          <p>Sales</p>
          <div className="mt-0.5 flex gap-2">
            <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
              {sales}
            </p>
            <p
              className={clsx(
                `this:${impression > 0 ? "success" : "error"}`,
                "this:success text-this dark:text-this-lighter flex items-center space-x-0.5 text-xs",
              )}
            >
              {impression > 0 ? (
                <ArrowUpIcon className="size-4" />
              ) : (
                <ArrowDownIcon className="size-4" />
              )}
              <span>{Math.abs(impression).toFixed(2)}%</span>
            </p>
          </div>
          <div className="ax-transparent-gridline">
            <Chart
              type="line"
              height="120"
              options={chartConfig}
              series={[
                {
                  name: "Income",
                  data: chartData,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="h-12"></div>
    </Box>
  );
}
