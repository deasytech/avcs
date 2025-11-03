// Import Dependencies
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Card } from "@/components/ui";
import transactionsData from "@/data/transactions.json";

// ----------------------------------------------------------------------

// Filter transactions for Power sector (sector_id: 3)
const powerTransactions = transactionsData.filter(
  (transaction) => transaction.sector_id === 3
);

// Calculate totals for chargeable and VAT amounts
const totalChargeable = powerTransactions.reduce((sum, transaction) => {
  const chargeableAmount = parseFloat(
    transaction.transaction_amount_chargeable.replace("₦", "").replace(",", "")
  );
  return sum + chargeableAmount;
}, 0);

const totalVAT = powerTransactions.reduce((sum, transaction) => {
  const vatAmount = parseFloat(
    transaction.transaction_amount_vat.replace("₦", "").replace(",", "")
  );
  return sum + vatAmount;
}, 0);

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Create series data for chart (using monthly breakdown)
const monthlyData = powerTransactions.reduce((acc, transaction) => {
  const date = new Date(transaction.transaction_date);
  const month = date.toLocaleString("default", { month: "short" });

  if (!acc[month]) {
    acc[month] = { chargeable: 0, vat: 0 };
  }

  const chargeableAmount = parseFloat(
    transaction.transaction_amount_chargeable.replace("₦", "").replace(",", "")
  );
  const vatAmount = parseFloat(
    transaction.transaction_amount_vat.replace("₦", "").replace(",", "")
  );

  acc[month].chargeable += chargeableAmount;
  acc[month].vat += vatAmount;

  return acc;
}, {} as Record<string, { chargeable: number; vat: number }>);

const months = Object.keys(monthlyData).sort();
const series = [
  {
    name: "Chargeable",
    data: months.map(month => monthlyData[month].chargeable),
  },
  {
    name: "VAT",
    data: months.map(month => monthlyData[month].vat),
  },
];

const chartConfig: ApexOptions = {
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 10,
      bottom: -12,
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
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
    stacked: true,
    stackType: "100%",
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    colors: ["#0EA5E9", "#e2e8f0"],
  },
  plotOptions: {
    bar: {
      borderRadius: 2,
      horizontal: false,
      columnWidth: 30,
    },
  },
  legend: {
    show: false,
  },
};

export function Budget() {
  return (
    <Card className="col-span-2 px-4 pb-5 sm:px-5">
      <div className="flex min-w-0 items-center justify-between py-3">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Total Revenue
        </h2>
      </div>
      <div className="flex grow gap-5">
        <div className="flex w-1/2 flex-col">
          <div className="grow">
            <p className="dark:text-dark-100 text-2xl font-semibold text-gray-800">
              {formatCurrency(totalVAT)}
            </p>
            <a
              href="##"
              className="text-tiny text-primary-600 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400 dark:focus:text-primary-400/70 border-b border-dotted border-current pb-0.5 font-medium uppercase outline-hidden transition-colors duration-300"
            >
              Power VAT Revenue
            </a>
          </div>
          <p className="mt-2 line-clamp-3 text-xs leading-normal">
            Total chargeable: {formatCurrency(totalChargeable)}. Represent VAT from chargeable transaction volume for Power sector.
          </p>
        </div>
        <div className="ax-transparent-gridline flex w-1/2 items-end">
          <div className="min-w-0">
            <Chart
              type="bar"
              height="120"
              options={chartConfig}
              series={series}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
