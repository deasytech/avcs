import transactionsData from '@/data/transactions.json';
import businessesData from '@/data/businesses.json';
import branchesData from '@/data/branches.json';
import transactionTypesData from '@/data/transaction_types.json';

export interface BankingTransactionActivity {
  activity_id: number;
  activity_type: { key: string; title: string };
  activity_name: string;
  account_name: string;
  transaction_date: string;
  amount: number;
}

// Filter only banking transactions (sector_id: 1) and map to activity format
export const bankingTransactionActivities: BankingTransactionActivity[] = transactionsData
  .filter(transaction => transaction.sector_id === 1)
  .map((transaction) => {
    // Find related data
    const business = businessesData.find(b => b.id === transaction.business_id);
    const branch = branchesData.find(b => b.id === transaction.branch_id);
    const transactionType = transactionTypesData.find(t => t.id === transaction.transaction_type_id);

    // Parse amount from string format "₦39151.54" to number
    const amountStr = transaction.transaction_amount.replace('₦', '').replace(',', '');
    const amount = parseFloat(amountStr);

    // Parse chargeable amount for negative transactions (fees/charges)
    const chargeableStr = transaction.transaction_amount_chargeable.replace('₦', '').replace(',', '');
    const chargeableAmount = parseFloat(chargeableStr);

    // Determine if this is a charge/fee (negative) or credit (positive)
    // Account maintenance, SMS, card transactions are typically charges
    const isCharge = transactionType?.name === 'Account Maintenance' ||
      transactionType?.name === 'SMS' ||
      transactionType?.name === 'Card Transaction' ||
      transactionType?.name === 'Bill Payment';

    return {
      activity_id: transaction.transaction_id,
      activity_type: {
        key: transactionType?.slug || 'unknown',
        title: transactionType?.name || 'Unknown Transaction'
      },
      activity_name: branch?.name || business?.name || 'Unknown Branch',
      account_name: business?.name || 'Unknown Account',
      transaction_date: new Date(transaction.transaction_date).getTime().toString(),
      amount: isCharge ? -Math.abs(chargeableAmount) : Math.abs(amount)
    };
  })
  .slice(0, 100); // Limit to first 100 banking transactions for performance

// Helper function to get more banking transactions if needed
export const getBankingTransactions = (limit: number = 100) => {
  return transactionsData
    .filter(transaction => transaction.sector_id === 1)
    .slice(0, limit)
    .map((transaction) => {
      const business = businessesData.find(b => b.id === transaction.business_id);
      const branch = branchesData.find(b => b.id === transaction.branch_id);
      const transactionType = transactionTypesData.find(t => t.id === transaction.transaction_type_id);

      const amountStr = transaction.transaction_amount.replace('₦', '').replace(',', '');
      const amount = parseFloat(amountStr);

      const chargeableStr = transaction.transaction_amount_chargeable.replace('₦', '').replace(',', '');
      const chargeableAmount = parseFloat(chargeableStr);

      const isCharge = transactionType?.name === 'Account Maintenance' ||
        transactionType?.name === 'SMS' ||
        transactionType?.name === 'Card Transaction' ||
        transactionType?.name === 'Bill Payment';

      return {
        activity_id: transaction.transaction_id,
        activity_type: {
          key: transactionType?.slug || 'unknown',
          title: transactionType?.name || 'Unknown Transaction'
        },
        activity_name: branch?.name || business?.name || 'Unknown Branch',
        account_name: business?.name || 'Unknown Account',
        transaction_date: new Date(transaction.transaction_date).getTime().toString(),
        amount: isCharge ? -Math.abs(chargeableAmount) : Math.abs(amount)
      };
    });
};
