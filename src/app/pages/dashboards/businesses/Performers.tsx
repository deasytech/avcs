// Import Dependencies
import { useMemo } from "react";

// Local Imports
import { Avatar } from "@/components/ui";

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

interface PerformersProps {
  transactions: Transaction[];
}

// Helper function to parse currency string to number
const parseCurrency = (amount: string): number => {
  return parseFloat(amount.replace(/[₦,]/g, ''));
};

// Transaction type names (you can expand this based on your transaction_types.json)
const transactionTypeNames: Record<number, string> = {
  1: "Deposit",
  2: "Withdrawal",
  3: "Transfer",
  4: "Payment",
  5: "Purchase",
  6: "Refund",
  7: "Fee",
  8: "Commission",
  9: "Interest",
  10: "Penalty",
  11: "Service Charge",
  12: "Subscription",
  13: "Donation",
  14: "Utility Bill",
  15: "Airtime",
  16: "Data",
  17: "Hotel Booking",
  18: "Event Ticket",
  19: "Restaurant",
};

// ----------------------------------------------------------------------

export function Performers({ transactions }: PerformersProps) {
  // Calculate top transaction types by volume
  const topTransactionTypes = useMemo(() => {
    if (transactions.length === 0) return [];

    // Group by transaction type and sum amounts
    const typeTotals = transactions.reduce((acc, transaction) => {
      const typeId = transaction.transaction_type_id;
      const amount = parseCurrency(transaction.transaction_amount);
      acc[typeId] = (acc[typeId] || 0) + amount;
      return acc;
    }, {} as Record<number, number>);

    // Convert to array and sort by amount
    return Object.entries(typeTotals)
      .map(([typeId, total]) => ({
        typeId: parseInt(typeId),
        name: transactionTypeNames[parseInt(typeId)] || `Type ${typeId}`,
        total,
        count: transactions.filter(t => t.transaction_type_id === parseInt(typeId)).length
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [transactions]);
  return (
    <div>
      <div className="flex h-8 min-w-0 items-center justify-between">
        <h2 className="truncate font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Top Transaction Types
        </h2>

        <a
          href="##"
          className="border-b border-dotted border-current pb-0.5 text-xs-plus font-medium text-primary-600 outline-hidden transition-colors duration-300 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400/70 dark:focus:text-primary-400/70"
        >
          View All
        </a>
      </div>
      <table className="w-full">
        <tbody>
          {topTransactionTypes.map((transactionType) => (
            <tr key={transactionType.typeId}>
              <td className="pt-4">
                <div className="flex items-center space-x-3 ">
                  <Avatar
                    size={9}
                    name={transactionType.name}
                    initialColor="auto"
                  />
                  <h3 className="truncate font-medium text-gray-800 dark:text-dark-100">
                    {transactionType.name}
                  </h3>
                </div>
              </td>
              <td className="px-2 pt-4">
                <span className="tracking-wide text-gray-400 dark:text-dark-300">
                  {transactionType.count} transactions
                </span>
              </td>
              <td className="pt-4">
                <p className="text-end font-medium text-gray-800 dark:text-dark-100">
                  ₦{parseCurrency(transactionType.total.toString()).toLocaleString()}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
