// Import Dependencies
import { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Local Imports
import { Card } from "@/components/ui";
import transactionsData from "@/data/transactions.json";

// ----------------------------------------------------------------------

// Helper function to parse Naira amount string to number
const parseNairaAmount = (amountStr: string): number => {
  return parseFloat(amountStr.replace(/[₦,]/g, ""));
};

// Helper function to get month name from date string
const getMonthName = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleString('default', { month: 'short' });
};

export function Income() {
  // Process transactions data for Telecoms sector (sector_id: 2)
  const telecomsData = useMemo(() => {
    // Filter transactions for Telecoms sector
    const telecomsTransactions = transactionsData.filter(
      (transaction) => transaction.sector_id === 2
    );

    // Group by month to show VAT income trend
    const monthlyVatData: Record<string, number> = {};

    telecomsTransactions.forEach((transaction) => {
      const monthName = getMonthName(transaction.transaction_date);
      const vatAmount = parseNairaAmount(transaction.transaction_amount_vat);

      if (!monthlyVatData[monthName]) {
        monthlyVatData[monthName] = 0;
      }

      monthlyVatData[monthName] += vatAmount;
    });

    // Get months in chronological order
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    // Create series data showing VAT income trend
    const series = [{
      name: 'VAT Income',
      data: months.map(month => monthlyVatData[month] || 0)
    }];

    // Calculate total VAT income
    const totalVatIncome = telecomsTransactions.reduce((total, transaction) => {
      return total + parseNairaAmount(transaction.transaction_amount_vat);
    }, 0);

    // Calculate month-over-month change for the trend
    const monthlyChanges = series[0].data.map((current, index) => {
      if (index === 0) return 0;
      const previous = series[0].data[index - 1];
      return previous === 0 ? 0 : ((current - previous) / previous) * 100;
    });

    return {
      series,
      months,
      totalVatIncome,
      monthlyChanges
    };
  }, []);

  const chartConfig: ApexOptions = {
    colors: ["#10b981"],
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
      y: {
        formatter: function (value: number) {
          return formatCurrency(value);
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
      categories: telecomsData.months,
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

  const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex min-w-0 items-center justify-between px-4 pt-3 sm:px-5">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          VAT Income Trend
        </h2>
      </div>
      <div className="px-4 sm:px-5">
        <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
          {formatCurrency(telecomsData.totalVatIncome)}
        </p>
      </div>
      <div className="ax-transparent-gridline">
        <Chart
          options={chartConfig}
          series={telecomsData.series}
          type="area"
          height={150}
        />
      </div>
    </Card>
  );
}
