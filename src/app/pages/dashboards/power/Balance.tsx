// Import Dependencies
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

// Local Imports
import transactionsData from "@/data/transactions.json";

// ----------------------------------------------------------------------

// Filter banking transactions (sector_id: 1)
const bankingTransactions = transactionsData.filter(t => t.sector_id === 1);

// Calculate totals from real banking data
const calculateBankingTotals = () => {
  let totalDeposits = 0;
  let totalWithdrawals = 0;

  bankingTransactions.forEach(transaction => {
    const amount = parseFloat(transaction.transaction_amount.replace(/[₦,]/g, ''));

    // Determine if it's a deposit or withdrawal based on transaction type
    // Deposit types: Cash Deposit (ATM) - 2, Cash Deposit (Corporate) - 3, Cash Deposit (Individual) - 4, Wire Transfer - 5, Electronic Transfer - 6
    // Withdrawal types: ATM Withdrawal - 1, Card Transaction - 10
    // Other types: SMS - 7, Bill Payment - 8, Account Maintenance - 9

    const depositTypes = [2, 3, 4, 5, 6];
    const withdrawalTypes = [1, 10];

    if (depositTypes.includes(transaction.transaction_type_id)) {
      totalDeposits += amount;
    } else if (withdrawalTypes.includes(transaction.transaction_type_id)) {
      totalWithdrawals += amount;
    }
  });

  return {
    totalDeposits,
    totalWithdrawals,
    accountBalance: totalDeposits - totalWithdrawals
  };
};

// Format currency in Nigerian Naira
const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// ----------------------------------------------------------------------

export function Balance() {
  const { totalDeposits, totalWithdrawals } = calculateBankingTotals();

  return (
    <div className="rounded-lg bg-linear-to-br from-purple-500 to-indigo-600 px-4 pb-4 text-white sm:px-5">
      <div className="flex items-center justify-between py-3">
        <h2 className="text-sm-plus font-medium tracking-wide">Total Transactions</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
        <div>
          <div className="mt-3 text-3xl font-semibold">{formatCurrency(totalDeposits + totalWithdrawals)}</div>
          <p className="text-xs-plus mt-2 text-white/80">Total Transaction Volume</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          <div>
            <p className="text-white/90">Total Deposits</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black/20">
                <ArrowUpIcon className="size-4" />
              </div>
              <p className="text-base font-medium">{formatCurrency(totalDeposits)}</p>
            </div>
          </div>
          <div>
            <p className="text-white/90">Total Withdrawals</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black/20">
                <ArrowDownIcon className="size-4" />
              </div>
              <p className="text-base font-medium">{formatCurrency(totalWithdrawals)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
