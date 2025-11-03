// Import Dependencies
import { UserIcon } from "@heroicons/react/20/solid";
import {
  ArrowsRightLeftIcon,
  BoltIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import dayjs from "dayjs";
import { Getter, Row } from "@tanstack/react-table";

// Local Imports
import { useLocaleContext } from "@/app/contexts/locale/context";
import { Avatar } from "@/components/ui";
import { ColorType } from "@/constants/app";
import { BankingTransactionActivity } from "./bankingTransactionData";

// ----------------------------------------------------------------------

type ActivityType = "atm_withdrawal" | "cash_deposit_atm" | "cash_deposit_corporate" | "cash_deposit_individual" | "wire_transfer" | "electronic_transfer" | "sms" | "bill_payment" | "account_maint" | "card" | "unknown";

const activityColor: Record<ActivityType, ColorType> = {
  "atm_withdrawal": "info",
  "cash_deposit_atm": "success",
  "cash_deposit_corporate": "success",
  "cash_deposit_individual": "success",
  "wire_transfer": "primary",
  "electronic_transfer": "primary",
  "sms": "warning",
  "bill_payment": "error",
  "account_maint": "warning",
  "card": "info",
  "unknown": "neutral",
};

function getActivityIcon(type: ActivityType) {
  if (type === "bill_payment" || type === "account_maint") return ShieldExclamationIcon;
  if (type === "sms") return BoltIcon;
  if (type === "atm_withdrawal" || type === "card") return ArrowsRightLeftIcon;
  return UserIcon;
}

export function ActivityCell({
  row,
  getValue,
}: {
  row: Row<BankingTransactionActivity>;
  getValue: Getter<any>;
}) {
  const Icon = getActivityIcon(row.original.activity_type.key as ActivityType);

  return (
    <div className="flex items-center space-x-4">
      <Avatar
        classNames={{ display: "rounded-lg" }}
        initialColor={
          activityColor[row.original.activity_type.key as ActivityType]
        }
        size={9}
      >
        <Icon className="size-5" />
      </Avatar>

      <div>
        <p className="dark:text-dark-100 truncate font-medium text-gray-800">
          {getValue()}
        </p>
        <p className="dark:text-dark-300 mt-0.5 text-xs text-gray-400">
          {row.original.activity_type.title}
        </p>
      </div>
    </div>
  );
}

export function AccountNameCell({ getValue }: { getValue: Getter<any> }) {
  return (
    <span className="dark:text-dark-100 font-medium text-gray-800">
      {getValue()}
    </span>
  );
}

export function TransactionDateCell({ getValue }: { getValue: Getter<any> }) {
  const { locale } = useLocaleContext();
  return (
    <span>
      {dayjs(getValue()).locale(locale).format("ddd, DD MMM - HH:mm")}
    </span>
  );
}

export function AmountCell({
  getValue,
}: {
  getValue: Getter<any>;
}) {
  const val = getValue();
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(val));

  return (
    <span
      className={clsx(
        "font-semibold",
        val > 0
          ? "text-success dark:text-success-light"
          : "text-error dark:text-error-light",
      )}
    >
      {val > 0 ? '+' : ''}{formattedAmount}
    </span>
  );
}
