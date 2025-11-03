import { useMemo } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import transactionsData from "@/data/transactions.json";
import branchesData from "@/data/branches.json";

// Helper function to parse Nigerian currency strings
const parseNigerianCurrency = (amountStr: string): number => {
  if (!amountStr) return 0;
  // Remove currency symbol (₦) and commas, then convert to number
  const cleanAmount = amountStr.replace(/[₦,]/g, '');
  return parseFloat(cleanAmount) || 0;
};

// Infer region from branch name
const inferRegionFromBranch = (branchName: string): string => {
  const name = branchName.toLowerCase();

  // South West
  if (name.includes('lagos') || name.includes('ikeja') || name.includes('victoria island') || name.includes('lekki')) {
    return 'South West';
  }
  if (name.includes('ibadan') || name.includes('ondo') || name.includes('osun') || name.includes('ogun') || name.includes('oyo')) {
    return 'South West';
  }

  // South South
  if (name.includes('benin') || name.includes('delta') || name.includes('edo') || name.includes('asaba')) {
    return 'South South';
  }
  if (name.includes('port harcourt') || name.includes('rivers') || name.includes('bayelsa')) {
    return 'South South';
  }
  if (name.includes('calabar') || name.includes('cross river') || name.includes('akwa ibom')) {
    return 'South South';
  }

  // South East
  if (name.includes('enugu') || name.includes('anambra') || name.includes('imo') || name.includes('abia') || name.includes('ebonyi')) {
    return 'South East';
  }

  // North Central
  if (name.includes('abuja') || name.includes('fct') || name.includes('maitama')) {
    return 'North Central';
  }
  if (name.includes('benue') || name.includes('kogi') || name.includes('kwara') || name.includes('nasarawa') || name.includes('niger') || name.includes('plateau')) {
    return 'North Central';
  }

  // North West
  if (name.includes('kano') || name.includes('kaduna') || name.includes('katsina') || name.includes('kebbi') || name.includes('sokoto') || name.includes('zamfara') || name.includes('jigawa')) {
    return 'North West';
  }

  // North East
  if (name.includes('adamawa') || name.includes('bauchi') || name.includes('borno') || name.includes('gombe') || name.includes('taraba') || name.includes('yobe')) {
    return 'North East';
  }

  // Default to South West (Lagos area) for unknown branches
  return 'South West';
};

const ViewChart = () => {
  const { series, categories } = useMemo(() => {
    // Define all Nigerian regions
    const allRegions = [
      'North Central',
      'North East',
      'North West',
      'South East',
      'South South',
      'South West'
    ];

    // Create branch to region mapping
    const branchToRegionMap = new Map<number, string>();
    branchesData.forEach(branch => {
      branchToRegionMap.set(branch.id, inferRegionFromBranch(branch.name));
    });

    // Initialize all regions with zero values
    const regionData = new Map<string, { chargeable: number; vat: number }>();
    allRegions.forEach(region => {
      regionData.set(region, { chargeable: 0, vat: 0 });
    });

    // Aggregate data by region
    transactionsData.forEach(transaction => {
      const region = branchToRegionMap.get(transaction.branch_id) || 'South West';

      if (regionData.has(region)) {
        const current = regionData.get(region)!;
        current.chargeable += parseNigerianCurrency(transaction.transaction_amount_chargeable);
        current.vat += parseNigerianCurrency(transaction.transaction_amount_vat);
      }
    });

    // Sort regions alphabetically
    const sortedRegions = allRegions.sort();

    const chargeableData = sortedRegions.map(region => regionData.get(region)!.chargeable);
    const vatData = sortedRegions.map(region => regionData.get(region)!.vat);

    return {
      series: [
        {
          name: "Chargeable",
          data: chargeableData,
        },
        {
          name: "VAT Income",
          data: vatData,
        },
      ],
      categories: sortedRegions,
    };
  }, []);

  const chartConfig: ApexOptions = {
    colors: ["#FF9800", "#4C4EE7"],

    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      show: true,
      width: 3,
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: "90%",
        columnWidth: "45%",
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: "#64748b",
      },
      markers: {
        size: 8,
        strokeWidth: 0,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        hideOverlappingLabels: true,
        style: {
          fontSize: "11px",
          fontFamily: "Inter, sans-serif",
          colors: "#64748b",
        },
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
        bottom: -10,
      },
      borderColor: "#e2e8f0",
      strokeDashArray: 3,
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
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (value: number) {
          return "₦" + value.toLocaleString();
        },
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "55%",
            },
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "65%",
              borderRadius: 6,
            },
          },
          legend: {
            fontSize: "10px",
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "75%",
              borderRadius: 4,
            },
          },
          legend: {
            fontSize: "9px",
          },
          xaxis: {
            labels: {
              style: {
                fontSize: "9px",
              },
            },
          },
        },
      },
    ],
  };

  return (
    <div className="ax-transparent-gridline col-span-12 px-2 sm:col-span-6 lg:col-span-8">
      <Chart options={chartConfig} series={series} type="bar" height={280} />
    </div>
  );
};

export { ViewChart };
