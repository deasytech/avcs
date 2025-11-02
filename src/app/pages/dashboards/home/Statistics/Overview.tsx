// Import Dependencies
import {
  ArrowUpIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Avatar, Card } from "@/components/ui";

// Sector data with proper typing
interface Sector {
  id: number;
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "info" | "warning" | "success" | "secondary";
}

interface SectorStats {
  transactions: string;
  growth: string;
  revenue: string;
}

// Sector configuration
const sectors: Sector[] = [
  { id: 1, name: "Banking", slug: "banking", icon: BanknotesIcon, color: "info" },
  { id: 2, name: "Telecoms", slug: "telecoms", icon: SignalIcon, color: "warning" },
  { id: 3, name: "Power", slug: "power", icon: ChartBarIcon, color: "success" },
  { id: 4, name: "Hotel", slug: "hotel", icon: BuildingOfficeIcon, color: "secondary" },
];

// Calculate sector statistics from transaction data
function calculateSectorStats(): Record<string, SectorStats> {
  try {
    // In a real application, this would fetch from API or props
    // For demonstration, using calculated mock data based on transaction patterns
    const stats = {
      banking: {
        transactions: "2.8k",
        growth: "5.2%",
        revenue: "₦45.2M",
        // Additional calculated metrics
        avgTransaction: "₦16,142",
        businesses: 3
      },
      telecoms: {
        transactions: "4.1k",
        growth: "8.7%",
        revenue: "₦32.8M",
        avgTransaction: "₦8,000",
        businesses: 3
      },
      power: {
        transactions: "1.9k",
        growth: "3.1%",
        revenue: "₦28.5M",
        avgTransaction: "₦15,000",
        businesses: 3
      },
      hotel: {
        transactions: "3.3k",
        growth: "6.4%",
        revenue: "₦38.9M",
        avgTransaction: "₦11,788",
        businesses: 3
      },
    };
    return stats;
  } catch (error) {
    console.error("Error calculating sector stats:", error);
    // Fallback mock data
    return {
      banking: { transactions: "2.8k", growth: "5.2%", revenue: "₦45.2M" },
      telecoms: { transactions: "4.1k", growth: "8.7%", revenue: "₦32.8M" },
      power: { transactions: "1.9k", growth: "3.1%", revenue: "₦28.5M" },
      hotel: { transactions: "3.3k", growth: "6.4%", revenue: "₦38.9M" },
    };
  }
}

// ----------------------------------------------------------------------

export function Overview() {
  const sectorStats = calculateSectorStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {sectors.map((sector) => {
        const IconComponent = sector.icon;
        const stats = sectorStats[sector.slug];

        return (
          <Card key={sector.id} className="flex justify-between p-5">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {sector.name}
              </p>
              <p className={`this:${sector.color} text-this dark:text-this-lighter mt-1 text-2xl font-bold`}>
                {stats.transactions}
              </p>
              <p className="this:success text-this dark:text-this-lighter mt-2 flex items-center gap-1 text-sm">
                <ArrowUpIcon className="size-4" />
                <span>{stats.growth}</span>
              </p>
            </div>
            <Avatar
              size={12}
              classNames={{
                display: "mask is-squircle rounded-none",
              }}
              initialVariant="soft"
              initialColor={sector.color}
            >
              <IconComponent className="size-6" />
            </Avatar>
          </Card>
        );
      })}
    </div>
  );
}
