// Import Dependencies
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { Fragment, useRef, useState, useMemo } from "react";

// Local Imports
import { TableSortIcon } from "@/components/shared/table/TableSortIcon";
import { PaginationSection } from "@/components/shared/table/PaginationSection";
import { Card, Table, THead, TBody, Th, Tr, Td } from "@/components/ui";
import {
  useBoxSize,
  useLockScrollbar,
  useLocalStorage,
  useDidUpdate,
} from "@/hooks";
import { fuzzyFilter } from "@/utils/react-table/fuzzyFilter";
import { useSkipper } from "@/utils/react-table/useSkipper";
import { SelectedRowsActions } from "./SelectedRowsActions";
import { SubRowComponent } from "./SubRowComponent";
import { columns } from "./columns";
import { RegionalTransaction } from "./data";
import { Toolbar } from "./Toolbar";
import { useThemeContext } from "@/app/contexts/theme/context";
import { getUserAgentBrowser } from "@/utils/dom/getUserAgentBrowser";
import { TableSettings } from "@/components/shared/table/TableSettings";

// Import data
import transactionsData from "@/data/transactions.json";
import businessesData from "@/data/businesses.json";
import branchesData from "@/data/branches.json";

// ----------------------------------------------------------------------

// Function to parse currency values
function parseCurrency(amount: string): number {
  return parseFloat(amount.replace(/[₦,]/g, ''));
}

// Function to determine region from branch name
function getRegionFromBranchName(branchName: string): string {
  const name = branchName.toLowerCase();

  // Lagos locations
  if (name.includes('ikeja') || name.includes('victoria island') || name.includes('vi') || name.includes('lagos') || name.includes('marina') || name.includes('lekki')) {
    return 'South West';
  }

  // Abuja/FCT
  if (name.includes('abuja') || name.includes('maitama')) {
    return 'North Central';
  }

  // Benin/Edo
  if (name.includes('benin')) {
    return 'South South';
  }

  // Ibadan/Oyo
  if (name.includes('ibadan')) {
    return 'South West';
  }

  // Asaba/Delta
  if (name.includes('asaba')) {
    return 'South South';
  }

  // Default to South West for Lagos-based businesses
  if (name.includes('gtbank') || name.includes('access bank') || name.includes('first bank') || name.includes('mtn') || name.includes('airtel') || name.includes('glo')) {
    return 'South West';
  }

  // Default to North Central for Abuja-based businesses
  if (name.includes('transcorp') || name.includes('hilton')) {
    return 'North Central';
  }

  // Default to South South for Benin-based businesses
  if (name.includes('benin electric')) {
    return 'South South';
  }

  return 'South West'; // Default fallback
}

// Function to aggregate transactions by region
function aggregateTransactionsByRegion(
  transactions: any[],
  businesses: any[],
  branches: any[]
): RegionalTransaction[] {
  const regionMap = new Map<string, {
    totalTransactions: number;
    vatChargeable: number;
    vatIncome: number;
    totalVolume: number;
    businesses: Map<string, {
      name: string;
      branches: Set<string>;
      transactions: number;
    }>;
  }>();

  // Create business ID to name mapping
  const businessIdToName = new Map<number, string>();
  businesses.forEach(business => {
    businessIdToName.set(business.id, business.name);
  });

  // Create branch ID to name mapping
  const branchIdToName = new Map<number, string>();
  branches.forEach(branch => {
    branchIdToName.set(branch.id, branch.name);
  });

  // Process transactions
  transactions.forEach(transaction => {
    const branchName = branchIdToName.get(transaction.branch_id) || `Branch ${transaction.branch_id}`;
    const region = getRegionFromBranchName(branchName);

    const businessName = businessIdToName.get(transaction.business_id) || `Business ${transaction.business_id}`;

    const amount = parseCurrency(transaction.transaction_amount);
    const chargeable = parseCurrency(transaction.transaction_amount_chargeable);
    const vat = parseCurrency(transaction.transaction_amount_vat);

    // Initialize region if not exists
    if (!regionMap.has(region)) {
      regionMap.set(region, {
        totalTransactions: 0,
        vatChargeable: 0,
        vatIncome: 0,
        totalVolume: 0,
        businesses: new Map()
      });
    }

    const regionData = regionMap.get(region)!;

    // Update region totals
    regionData.totalTransactions += 1;
    regionData.vatChargeable += chargeable;
    regionData.vatIncome += vat;
    regionData.totalVolume += amount;

    // Update business data
    if (!regionData.businesses.has(businessName)) {
      regionData.businesses.set(businessName, {
        name: businessName,
        branches: new Set(),
        transactions: 0
      });
    }

    const businessData = regionData.businesses.get(businessName)!;
    businessData.branches.add(branchName);
    businessData.transactions += 1;
  });

  // Convert to array format
  const result: RegionalTransaction[] = [];

  regionMap.forEach((data, region) => {
    data.businesses.forEach((businessData, businessName) => {
      const branchesArray = Array.from(businessData.branches);
      const businessBranch = branchesArray.length === 1
        ? `${businessName} - ${branchesArray[0]}`
        : `${businessName} (${branchesArray.length} branches)`;

      result.push({
        region,
        businessBranch,
        totalTransactions: businessData.transactions,
        vatChargeable: data.vatChargeable * (businessData.transactions / data.totalTransactions),
        vatIncome: data.vatIncome * (businessData.transactions / data.totalTransactions),
        totalVolume: data.totalVolume * (businessData.transactions / data.totalTransactions),
      });
    });
  });

  return result.sort((a, b) => a.region.localeCompare(b.region));
}

const isSafari = getUserAgentBrowser() === "Safari";

export default function RegionalTransactionsTable() {
  const { cardSkin } = useThemeContext();

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // Use useMemo to efficiently compute regional data
  const regionalData = useMemo(() =>
    aggregateTransactionsByRegion(
      transactionsData,
      businessesData,
      branchesData
    ), [transactionsData, businessesData, branchesData]
  );

  const [data, setData] = useState<RegionalTransaction[]>(regionalData);

  const [tableSettings, setTableSettings] = useState<TableSettings>({
    enableSorting: true,
    enableColumnFilters: true,
    enableFullScreen: false,
    enableRowDense: false,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnVisibility, setColumnVisibility] = useLocalStorage(
    "column-visibility-regional-transactions",
    {},
  );

  const [columnPinning, setColumnPinning] = useLocalStorage(
    "column-pinning-regional-transactions",
    {},
  );

  const cardRef = useRef<HTMLDivElement>(null);

  const { width: cardWidth } = useBoxSize({ ref: cardRef });

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      columnVisibility,
      columnPinning,
      tableSettings,
    },
    meta: {
      setTableSettings,
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
      deleteRow: (row) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.filter((oldRow) => oldRow.region !== row.original.region || oldRow.businessBranch !== row.original.businessBranch),
        );
      },
      deleteRows: (rows) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        const rowIds = rows.map((row) => `${row.original.region}-${row.original.businessBranch}`);
        setData((old) => old.filter((row) => !rowIds.includes(`${row.region}-${row.businessBranch}`)));
      },
    },

    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableSorting: tableSettings.enableSorting,
    enableColumnFilters: tableSettings.enableColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,

    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,

    autoResetPageIndex,
  });

  useDidUpdate(() => table.resetRowSelection(), [data]);

  useLockScrollbar(tableSettings.enableFullScreen);

  return (
    <div className="col-span-12 mt-4">
      <div
        className={clsx(
          "flex flex-col",
          tableSettings.enableFullScreen &&
          "dark:bg-dark-900 fixed inset-0 z-61 h-full w-full bg-white pt-3",
        )}
      >
        <Toolbar table={table} />
        <Card
          className={clsx(
            "relative mt-3 flex grow flex-col",
            tableSettings.enableFullScreen && "overflow-hidden",
          )}
          ref={cardRef}
        >
          <div className="table-wrapper min-w-full grow overflow-x-auto">
            <Table
              hoverable
              dense={tableSettings.enableRowDense}
              sticky={tableSettings.enableFullScreen}
              className="w-full text-left rtl:text-right"
            >
              <THead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th
                        key={header.id}
                        className={clsx(
                          "dark:bg-dark-800 dark:text-dark-100 bg-gray-200 font-semibold text-gray-800 uppercase first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg first:rtl:rounded-tr-lg last:rtl:rounded-tl-lg",
                          header.column.getCanPin() && [
                            header.column.getIsPinned() === "left" &&
                            "sticky z-2 ltr:left-0 rtl:right-0",
                            header.column.getIsPinned() === "right" &&
                            "sticky z-2 ltr:right-0 rtl:left-0",
                          ],
                        )}
                      >
                        {header.column.getCanSort() ? (
                          <div
                            className="flex cursor-pointer items-center space-x-3 select-none"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span className="flex-1">
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            </span>
                            <TableSortIcon
                              sorted={header.column.getIsSorted()}
                            />
                          </div>
                        ) : header.isPlaceholder ? null : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )
                        )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </THead>
              <TBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <Fragment key={row.id}>
                      <Tr
                        className={clsx(
                          "dark:border-b-dark-500 relative border-y border-transparent border-b-gray-200",
                          row.getIsExpanded() && "border-dashed",
                          row.getIsSelected() &&
                          !isSafari &&
                          "row-selected after:bg-primary-500/10 ltr:after:border-l-primary-500 rtl:after:border-r-primary-500 after:pointer-events-none after:absolute after:inset-0 after:z-2 after:h-full after:w-full after:border-3 after:border-transparent",
                        )}
                      >
                        {/* first row is a normal row */}
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <Td
                              key={cell.id}
                              className={clsx(
                                "relative",
                                cardSkin === "shadow"
                                  ? "dark:bg-dark-700"
                                  : "dark:bg-dark-900",

                                cell.column.getCanPin() && [
                                  cell.column.getIsPinned() === "left" &&
                                  "sticky z-2 ltr:left-0 rtl:right-0",
                                  cell.column.getIsPinned() === "right" &&
                                  "sticky z-2 ltr:right-0 rtl:left-0",
                                ],
                              )}
                            >
                              {cell.column.getIsPinned() && (
                                <div
                                  className={clsx(
                                    "dark:border-dark-500 pointer-events-none absolute inset-0 border-gray-200",
                                    cell.column.getIsPinned() === "left"
                                      ? "ltr:border-r rtl:border-l"
                                      : "ltr:border-l rtl:border-r",
                                  )}
                                ></div>
                              )}
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </Td>
                          );
                        })}
                      </Tr>
                      {row.getIsExpanded() && (
                        <tr>
                          {/* 2nd row is a custom 1 cell row */}
                          <td
                            colSpan={row.getVisibleCells().length}
                            className="p-0"
                          >
                            <SubRowComponent row={row} cardWidth={cardWidth} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </TBody>
            </Table>
          </div>
          <SelectedRowsActions table={table} />
          {table.getCoreRowModel().rows.length && (
            <div
              className={clsx(
                "px-4 pb-4 sm:px-5 sm:pt-4",
                tableSettings.enableFullScreen && "dark:bg-dark-800 bg-gray-50",
                !(
                  table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()
                ) && "pt-4",
              )}
            >
              <PaginationSection table={table} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
