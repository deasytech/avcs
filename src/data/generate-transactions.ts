import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Import existing data
const sectors = [
  { id: 1, name: "Banking", slug: "banking" },
  { id: 2, name: "Telecoms", slug: "telecoms" },
  { id: 3, name: "Power", slug: "power" },
  { id: 4, name: "Hotel", slug: "hotel" }
];

const businesses = [
  { id: 1, sector_id: 1, name: "GTBank", slug: "gtbank" },
  { id: 2, sector_id: 1, name: "Access Bank", slug: "access-bank" },
  { id: 3, sector_id: 1, name: "First Bank", slug: "first-bank" },
  { id: 4, sector_id: 2, name: "MTN", slug: "mtn" },
  { id: 5, sector_id: 2, name: "Airtel", slug: "airtel" },
  { id: 6, sector_id: 2, name: "Glo", slug: "glo" },
  { id: 7, sector_id: 3, name: "Ikeja Electric", slug: "ikeja-electric" },
  { id: 8, sector_id: 3, name: "Benin Electric", slug: "benin-electric" },
  { id: 9, sector_id: 3, name: "Abuja Electric", slug: "abuja-electric" },
  { id: 10, sector_id: 4, name: "Eko Hotel", slug: "eko-hotel" },
  { id: 11, sector_id: 4, name: "Transcorp", slug: "transcorp" },
  { id: 12, sector_id: 4, name: "Grand Hotel", slug: "grand-hotel" }
];

const branches = [
  { id: 1, business_id: 1, sector_id: 1, name: "GTBank Victoria Island Branch", slug: "gtbank-victoria-island-branch" },
  { id: 2, business_id: 1, sector_id: 1, name: "GTBank Ikeja Branch", slug: "gtbank-ikeja-branch" },
  { id: 3, business_id: 2, sector_id: 1, name: "Access Bank Marina Branch", slug: "access-bank-marina-branch" },
  { id: 4, business_id: 3, sector_id: 1, name: "First Bank Lekki Branch", slug: "first-bank-lekki-branch" },
  { id: 5, business_id: 4, sector_id: 2, name: "MTN Ikeja Service Center", slug: "mtn-ikeja-service-center" },
  { id: 6, business_id: 4, sector_id: 2, name: "MTN Abuja Service Center", slug: "mtn-abuja-service-center" },
  { id: 7, business_id: 5, sector_id: 2, name: "Airtel Lagos Headquarters", slug: "airtel-lagos-headquarters" },
  { id: 8, business_id: 6, sector_id: 2, name: "Glo Ibadan Office", slug: "glo-ibadan-office" },
  { id: 9, business_id: 7, sector_id: 3, name: "Ikeja Electric Mainland Office", slug: "ikeja-electric-mainland-office" },
  { id: 10, business_id: 8, sector_id: 3, name: "Benin Electric Central Office", slug: "benin-electric-central-office" },
  { id: 11, business_id: 9, sector_id: 3, name: "Abuja Electric Maitama Branch", slug: "abuja-electric-maitama-branch" },
  { id: 12, business_id: 10, sector_id: 4, name: "Eko Hotel VI Branch", slug: "eko-hotel-vi-branch" },
  { id: 13, business_id: 11, sector_id: 4, name: "Transcorp Hilton Abuja", slug: "transcorp-hilton-abuja" },
  { id: 14, business_id: 12, sector_id: 4, name: "Grand Hotel Asaba", slug: "grand-hotel-asaba" }
];

const transactionTypes = [
  { id: 1, sector_id: 1, name: "ATM Withdrawal", slug: "atm_withdrawal", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 2, sector_id: 1, name: "Cash Deposit (ATM)", slug: "cash_deposit_atm", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 3, sector_id: 1, name: "Cash Deposit (Corporate)", slug: "cash_deposit_corporate", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 4, sector_id: 1, name: "Cash Deposit (Individual)", slug: "cash_deposit_individual", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 5, sector_id: 1, name: "Wire Transfer", slug: "wire_transfer", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 6, sector_id: 1, name: "Electronic Transfer", slug: "electronic_transfer", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 7, sector_id: 1, name: "SMS", slug: "sms", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 8, sector_id: 1, name: "Bill Payment", slug: "bill_payment", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 9, sector_id: 1, name: "Account Maintenance", slug: "account_maint", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 10, sector_id: 1, name: "Card Transaction", slug: "card", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 11, sector_id: 2, name: "Product Sale", slug: "product_sale", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 12, sector_id: 2, name: "Other Sale", slug: "other_sale", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 13, sector_id: 2, name: "Service", slug: "services", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 14, sector_id: 3, name: "Product Sale", slug: "product_sale", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 15, sector_id: 3, name: "Other Sale", slug: "other_sale", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 16, sector_id: 3, name: "Service", slug: "services", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 17, sector_id: 4, name: "Product Sale", slug: "product_sale", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 18, sector_id: 4, name: "Other Sale", slug: "other_sale", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 },
  { id: 19, sector_id: 4, name: "Service", slug: "services", use_percent: true, number: 20, has_trigger: false, trigger_limit: 500000 }
];

// Utility functions
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function formatNaira(amount: number): string {
  return `₦${amount.toFixed(2)}`;
}

function generateTransactionId(): number {
  return randomInt(502000000, 502999999);
}

function generateRandomDate(): string {
  const start = new Date('2025-01-01T00:00:00Z');
  const end = new Date('2025-06-30T23:59:59Z');
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString();
}

// Transaction amount generators by sector and type
function getTransactionAmount(sectorId: number, transactionTypeSlug: string): number {
  switch (sectorId) {
    case 1: // Banking
      switch (transactionTypeSlug) {
        case 'atm_withdrawal':
          return randomFloat(1000, 100000);
        case 'cash_deposit_atm':
        case 'cash_deposit_corporate':
        case 'cash_deposit_individual':
          return randomFloat(1000, 1000000);
        case 'wire_transfer':
        case 'electronic_transfer':
          return randomFloat(5000, 10000000);
        case 'sms':
        case 'bill_payment':
        case 'account_maint':
        case 'card':
          return randomFloat(100, 5000);
        default:
          return randomFloat(1000, 100000);
      }

    case 2: // Telecoms
      switch (transactionTypeSlug) {
        case 'product_sale':
          return randomFloat(5000, 500000);
        case 'services':
          return randomFloat(500, 50000);
        case 'other_sale':
          return randomFloat(1000, 100000);
        default:
          return randomFloat(1000, 100000);
      }

    case 3: // Power
      switch (transactionTypeSlug) {
        case 'other_sale':
          return randomFloat(1000, 100000);
        case 'product_sale':
          return randomFloat(100000, 5000000);
        case 'services':
          return randomFloat(1000, 100000);
        default:
          return randomFloat(1000, 100000);
      }

    case 4: // Hotels
      switch (transactionTypeSlug) {
        case 'services':
          return randomFloat(10000, 2000000);
        case 'product_sale':
          return randomFloat(1000, 200000);
        case 'other_sale':
          return randomFloat(5000, 500000);
        default:
          return randomFloat(1000, 100000);
      }

    default:
      return randomFloat(1000, 100000);
  }
}

// Chargeable amount calculation (0.1% - 2% of transaction amount)
function getChargeableAmount(transactionAmount: number, transactionTypeSlug: string): number {
  let percentage: number;

  // Different charge rates based on transaction type
  switch (transactionTypeSlug) {
    case 'atm_withdrawal':
      percentage = randomFloat(0.005, 0.02); // 0.5% - 2%
      break;
    case 'cash_deposit_atm':
    case 'cash_deposit_corporate':
    case 'cash_deposit_individual':
      percentage = randomFloat(0.001, 0.01); // 0.1% - 1%
      break;
    case 'wire_transfer':
    case 'electronic_transfer':
      percentage = randomFloat(0.0005, 0.005); // 0.05% - 0.5%
      break;
    case 'sms':
    case 'bill_payment':
    case 'account_maint':
    case 'card':
      percentage = randomFloat(0.01, 0.05); // 1% - 5% (fixed fees are higher for small amounts)
      break;
    default:
      percentage = randomFloat(0.001, 0.02); // 0.1% - 2%
  }

  const chargeable = transactionAmount * percentage;

  // For small amounts, ensure minimum charge
  if (chargeable < 10 && transactionAmount > 1000) {
    return randomFloat(10, 50);
  }

  return Math.max(chargeable, 1); // Minimum ₦1
}

// Main transaction generator
function generateTransactions(): any[] {
  const transactions: any[] = [];
  const transactionsPerSector = 50;

  for (const sector of sectors) {
    const sectorBusinesses = businesses.filter(b => b.sector_id === sector.id);
    const sectorBranches = branches.filter(b => b.sector_id === sector.id);
    const sectorTransactionTypes = transactionTypes.filter(tt => tt.sector_id === sector.id);

    for (let i = 0; i < transactionsPerSector; i++) {
      const business = sectorBusinesses[randomInt(0, sectorBusinesses.length - 1)];
      const branch = sectorBranches.filter(b => b.business_id === business.id)[randomInt(0, sectorBranches.filter(b => b.business_id === business.id).length - 1)];
      const transactionType = sectorTransactionTypes[randomInt(0, sectorTransactionTypes.length - 1)];

      const transactionAmount = getTransactionAmount(sector.id, transactionType.slug);
      const chargeableAmount = getChargeableAmount(transactionAmount, transactionType.slug);
      const vatAmount = chargeableAmount * 0.075; // 7.5% VAT

      const transaction = {
        transaction_id: generateTransactionId(),
        sector_id: sector.id,
        business_id: business.id,
        branch_id: branch.id,
        transaction_type_id: transactionType.id,
        transaction_date: generateRandomDate(),
        transaction_amount: formatNaira(transactionAmount),
        transaction_amount_chargeable: formatNaira(chargeableAmount),
        transaction_amount_vat: formatNaira(vatAmount)
      };

      transactions.push(transaction);
    }
  }

  return transactions;
}

// Generate and save transactions
const transactions = generateTransactions();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Save to file
const outputPath = join(__dirname, 'transactions.json');
writeFileSync(outputPath, JSON.stringify(transactions, null, 2));

console.log(`Generated ${transactions.length} transactions`);
console.log(`Transactions saved to: ${outputPath}`);

// Display summary statistics
const sectorCounts = transactions.reduce((acc, t) => {
  acc[t.sector_id] = (acc[t.sector_id] || 0) + 1;
  return acc;
}, {});

console.log('\nTransactions by sector:');
sectors.forEach(sector => {
  console.log(`${sector.name}: ${sectorCounts[sector.id] || 0} transactions`);
});
