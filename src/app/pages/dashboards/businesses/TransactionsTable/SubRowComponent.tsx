// Import Dependencies
import { Row } from "@tanstack/react-table";

// Local Imports
import { Table, Tag, THead, TBody, Th, Tr, Td } from "@/components/ui";
import { RegionalTransaction } from "./data";

// ----------------------------------------------------------------------

export function SubRowComponent({
  row,
  cardWidth,
}: {
  row: Row<RegionalTransaction>;
  cardWidth?: number;
}) {
  const data = row.original;

  return (
    <div
      className="dark:border-b-dark-500 dark:bg-dark-750 sticky border-b border-b-gray-200 bg-gray-50 pt-3 pb-4 ltr:left-0 rtl:right-0"
      style={{ maxWidth: cardWidth }}
    >
      <p className="dark:text-dark-100 mt-1 px-4 font-medium text-gray-800 sm:px-5 lg:ltr:ml-14 rtl:rtl:mr-14">
        Regional Transaction Details:
      </p>

      <div className="mt-1 overflow-x-auto overscroll-x-contain px-4 sm:px-5 lg:ltr:ml-14 rtl:rtl:mr-14">
        <Table
          hoverable
          className="text-xs-plus w-full text-left rtl:text-right [&_.table-td]:py-2"
        >
          <THead>
            <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
              <Th className="dark:text-dark-100 py-2 font-semibold text-gray-800 uppercase">
                Metric
              </Th>
              <Th className="dark:text-dark-100 py-2 font-semibold text-gray-800 uppercase">
                Value
              </Th>
            </Tr>
          </THead>
          <TBody>
            <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
              <Td className="font-medium">Region:</Td>
              <Td className="dark:text-dark-100 font-medium text-gray-800">
                {data.region}
              </Td>
            </Tr>
            <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
              <Td className="font-medium">Business/Branch:</Td>
              <Td className="dark:text-dark-100 font-medium text-gray-800">
                {data.businessBranch}
              </Td>
            </Tr>
            <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
              <Td className="font-medium">Total Transactions:</Td>
              <Td className="dark:text-dark-100 font-medium text-gray-800">
                {data.totalTransactions.toLocaleString()}
              </Td>
            </Tr>
            <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
              <Td className="font-medium">VAT Chargeable:</Td>
              <Td className="dark:text-dark-100 font-medium text-gray-800">
                ₦{data.vatChargeable.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Td>
            </Tr>
            <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
              <Td className="font-medium">VAT Income:</Td>
              <Td className="dark:text-dark-100 font-medium text-gray-800">
                ₦{data.vatIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Td>
            </Tr>
            <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
              <Td className="font-medium">Total Volume:</Td>
              <Td className="dark:text-dark-100 font-medium text-gray-800">
                ₦{data.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Td>
            </Tr>
          </TBody>
        </Table>
      </div>

      <div className="flex justify-end px-4 sm:px-5">
        <div className="mt-4 flex justify-end space-x-1.5">
          <Tag component="button" className="min-w-[4rem]">
            Export
          </Tag>
          <Tag component="button" color="primary" className="min-w-[4rem]">
            Details
          </Tag>
        </div>
      </div>
    </div>
  );
}
