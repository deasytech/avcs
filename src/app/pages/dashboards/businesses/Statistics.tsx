// Import Dependencies
import { FaBug, FaEye, FaThumbsUp, FaUser } from "react-icons/fa";

// Local Imports
import { Avatar, Card } from "@/components/ui";

// Types
interface Transaction {
  transaction_id: number;
  sector_id: number;
  business_id: number;
  branch_id: number;
  transaction_type_id: number;
  transaction_date: string;
  transaction_amount: string;
  transaction_amount_chargeable: string;
  transaction_amount_vat: string;
}

interface StatisticsProps {
  transactions: Transaction[];
}

// Helper function to parse currency string to number
const parseCurrency = (amount: string): number => {
  return parseFloat(amount.replace(/[₦,]/g, ''));
};

// ----------------------------------------------------------------------

export function Statistics({ transactions }: StatisticsProps) {
  // Calculate statistics from transactions
  const totalTransactions = transactions.length;
  const totalVatChargeable = transactions.reduce((sum, transaction) => {
    return sum + parseCurrency(transaction.transaction_amount_chargeable);
  }, 0);
  const totalVatIncome = transactions.reduce((sum, transaction) => {
    return sum + parseCurrency(transaction.transaction_amount_vat);
  }, 0);
  const totalVolume = transactions.reduce((sum, transaction) => {
    return sum + parseCurrency(transaction.transaction_amount);
  }, 0);

  // Format numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}m`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    } else {
      return num.toFixed(0);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      <Card className="flex justify-between p-4">
        <div>
          <p className="text-xs-plus uppercase">All Transactions</p>
          <div className="mt-8 flex items-baseline gap-1">
            <p className="text-2xl font-semibold text-gray-800 dark:text-dark-100">
              {totalTransactions}
            </p>
            <p className="text-xs text-success dark:text-success-lighter">
              +21%
            </p>
          </div>
        </div>
        <Avatar
          size={10}
          classNames={{ display: "mask is-squircle rounded-none" }}
          initialColor="warning"
          initialVariant="soft"
        >
          <FaUser className="size-5" />
        </Avatar>
        <div className="absolute bottom-0 right-0 overflow-hidden rounded-lg">
          <FaUser className="size-12 translate-x-1/4 translate-y-1/4 opacity-20" />
        </div>
      </Card>

      <Card className="flex justify-between p-4">
        <div>
          <p className="text-xs-plus uppercase">VAT Chargeable</p>
          <div className="mt-8 flex items-baseline gap-1">
            <p className="text-2xl font-semibold text-gray-800 dark:text-dark-100">
              ₦{formatNumber(totalVatChargeable)}
            </p>
            <p className="text-xs text-success dark:text-success-lighter">
              +4%
            </p>
          </div>
        </div>
        <Avatar
          size={10}
          initialColor="info"
          initialVariant="soft"
          classNames={{
            display: "mask is-squircle rounded-none",
          }}
        >
          <FaEye className="size-5" />
        </Avatar>
        <div className="absolute bottom-0 right-0 overflow-hidden rounded-lg">
          <FaEye className="size-12 translate-x-1/4 translate-y-1/4 opacity-20" />
        </div>
      </Card>

      <Card className="flex justify-between p-4">
        <div>
          <p className="text-xs-plus uppercase">VAT Income</p>
          <div className="mt-8 flex items-baseline gap-1">
            <p className="text-2xl font-semibold text-gray-800 dark:text-dark-100">
              ₦{formatNumber(totalVatIncome)}
            </p>
            <p className="text-xs text-success dark:text-success-lighter">
              +8%
            </p>
          </div>
        </div>
        <Avatar
          size={10}
          initialColor="success"
          initialVariant="soft"
          classNames={{
            display: "mask is-squircle rounded-none",
          }}
        >
          <FaThumbsUp className="size-5" />
        </Avatar>
        <div className="absolute bottom-0 right-0 overflow-hidden rounded-lg">
          <FaThumbsUp className="size-12 translate-x-1/4 translate-y-1/4 opacity-20" />
        </div>
      </Card>

      <Card className="flex justify-between p-4">
        <div>
          <p className="text-xs-plus uppercase">Total Volume</p>
          <div className="mt-8 flex items-baseline gap-1">
            <p className="text-2xl font-semibold text-gray-800 dark:text-dark-100">
              ₦{formatNumber(totalVolume)}
            </p>
            <p className="text-xs text-error dark:text-error-lighter">-2%</p>
          </div>
        </div>
        <Avatar
          size={10}
          initialColor="error"
          initialVariant="soft"
          classNames={{ display: "mask is-squircle rounded-none" }}
        >
          <FaBug className="size-5" />
        </Avatar>
        <div className="absolute bottom-0 right-0 overflow-hidden rounded-lg">
          <FaBug className="size-12 translate-x-1/4 translate-y-1/4 opacity-20" />
        </div>
      </Card>
    </div>
  );
}
