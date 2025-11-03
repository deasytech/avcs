// Local Imports
import { Card } from "@/components/ui";
import { WalletCard } from "./WalletCard";

// ----------------------------------------------------------------------

export interface Wallet {
  uid: string;
  wallet: string;
  abbr: string;
  image: string;
  impession: number;
  amount: string;
  color: string;
  chartData: number[];
}

// Dynamic amount calculation based on transaction data
const calculateBankTotal = (businessId: number): string => {
  // Sample transaction amounts for each bank (in Naira)
  const bankTransactions = {
    1: [95900.04, 7153943.03, 4087.93, 1912.50, 414538.76, 3506.04, 4643.18, 7014732.40, 2687.80, 413609.68, 686246.46, 451582.06, 596342.61, 2687.80, 1962.31, 43537.79, 633261.05, 535537.79, 155414.93, 593069.46], // GTBank
    2: [3749785.70, 4097302.27, 9562935.14, 93180.28, 2944191.69, 502270.83, 4892.61, 1204.25, 934404.94, 2519952.95, 1285679.71, 2707627.22, 967188.29, 240600.03, 370001.65, 653282.33, 441911.47, 472341.95, 618422.26, 149722.83], // Access Bank
    3: [39151.54, 1510784.11, 606.33, 74569.40, 572613.99, 962829.96, 116992.92, 495949.95, 824159.45, 30972.31, 858214.93, 447737.17, 892026.41, 495949.95, 714399.21, 442996.99, 572613.99, 962829.96, 240689.73, 967188.29], // First Bank
    4: [35019.68, 90625.61, 281672.02, 93279.65, 86315.83, 32887.48, 48371.05, 13605.42, 318723.91, 463261.50, 71874.31, 50038.74, 84325.06, 394168.05, 21433.12, 294647.51, 120872.74, 35214.72, 37797.44, 18744.91] // Zenith Bank (using business_id 4 data)
  };

  const transactions = bankTransactions[businessId as keyof typeof bankTransactions] || [];
  const total = transactions.reduce((sum, amount) => sum + amount, 0);

  // Format as Naira with appropriate scale
  if (total >= 1000000000) {
    return `₦${(total / 1000000000).toFixed(1)}B`;
  } else if (total >= 1000000) {
    return `₦${(total / 1000000).toFixed(1)}M`;
  } else if (total >= 1000) {
    return `₦${(total / 1000).toFixed(1)}K`;
  } else {
    return `₦${total.toFixed(0)}`;
  }
};

const wallets: Wallet[] = [
  {
    uid: "1",
    wallet: "GTBank",
    abbr: "GTB",
    image: "/src/assets/nav-icons/bank-build.svg",
    impession: 4.2,
    amount: calculateBankTotal(1),
    color: "#E04403",
    chartData: [120, 420, 302, 540, 375, 614],
  },
  {
    uid: "2",
    wallet: "Access Bank",
    abbr: "ACCESS",
    image: "/src/assets/nav-icons/bank-build.svg",
    impession: 4.0,
    amount: calculateBankTotal(2),
    color: "#D32F2F",
    chartData: [254, 377, 243, 369, 212],
  },
  {
    uid: "3",
    wallet: "First Bank",
    abbr: "FBN",
    image: "/src/assets/nav-icons/bank-build.svg",
    impession: 3.8,
    amount: calculateBankTotal(3),
    color: "#1976D2",
    chartData: [454, 620, 302, 740, 354, 614],
  },
  {
    uid: "4",
    wallet: "Zenith Bank",
    abbr: "ZENITH",
    image: "/src/assets/nav-icons/bank-build.svg",
    impession: 4.1,
    amount: calculateBankTotal(4),
    color: "#388E3C",
    chartData: [100, 220, 180, 330, 280, 450],
  },
];

export function Watchlist() {
  return (
    <Card>
      <div className="flex items-center justify-between px-4 py-3 sm:px-5">
        <h2 className="dark:text-dark-100 truncate font-medium tracking-wide text-gray-800">
          Banking Sector Monitor
        </h2>
      </div>

      <div
        className="custom-scrollbar flex space-x-4 overflow-x-auto overflow-y-hidden px-4 pb-2 sm:px-5"
        style={{ "--margin-scroll": "1.25rem" } as React.CSSProperties}
      >
        {wallets.map((wallet) => (
          <WalletCard key={wallet.uid} {...wallet} />
        ))}
      </div>
    </Card>
  );
}