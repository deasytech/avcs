// Local Imports
import { TransactionCard, type Transaction } from "./TransactionCard";
import transactionsData from "@/data/transactions.json";
import businessesData from "@/data/businesses.json";
import transactionTypesData from "@/data/transaction_types.json";

// ----------------------------------------------------------------------

// Helper function to parse Naira amount to number
const parseNairaAmount = (nairaString: string): number => {
  return parseFloat(nairaString.replace(/[₦,]/g, ''));
};

// Helper function to round to 2 decimal places
const roundToTwoDecimals = (num: number): number => {
  return Math.round(num * 100) / 100;
};

// Helper function to format date
const formatTransactionDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Transform transaction data to match Transaction interface
const transformTransactionData = (): Transaction[] => {
  return transactionsData.slice(0, 7).map((transaction) => {
    const business = businessesData.find(b => b.id === transaction.business_id);
    const transactionType = transactionTypesData.find(tt => tt.id === transaction.transaction_type_id);

    const businessName = business?.name || 'Unknown Business';
    const transactionTypeName = transactionType?.name || 'Unknown Transaction';

    return {
      id: transaction.transaction_id.toString(),
      name: `${businessName} - ${transactionTypeName}`,
      time: formatTransactionDate(transaction.transaction_date),
      amount: roundToTwoDecimals(parseNairaAmount(transaction.transaction_amount)),
    };
  });
};

const payments: Transaction[] = transformTransactionData();

export function Transactions() {
  return (
    <div className="col-span-12 flex flex-col sm:col-span-6 lg:col-span-4">
      <div className="flex min-w-0 items-center justify-between">
        <h2 className="dark:text-dark-100 font-medium tracking-wide text-gray-800">
          Transactions
        </h2>
        <a
          href="##"
          className="text-xs-plus text-primary-600 hover:text-primary-600/70 focus:text-primary-600/70 dark:text-primary-400 dark:hover:text-primary-400/70 dark:focus:text-primary-400/70 border-b border-dotted border-current pb-0.5 font-medium outline-hidden transition-colors duration-300"
        >
          View All
        </a>
      </div>
      <div className="mt-3 flex flex-1 flex-col justify-between space-y-4">
        {payments.map((payment) => (
          <TransactionCard key={payment.id} {...payment} />
        ))}
      </div>
    </div>
  );
}
