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
import states from "@/data/states.json";

// ----------------------------------------------------------------------
// Helper functions

function parseCurrency(amount: string): number {
  return parseFloat(amount.replace(/[₦,]/g, "")) || 0;
}

// Get region from state ID using states.json
function getRegionFromStateId(stateId: number): string {
  const state = states.find((s) => s.id === stateId);
  return state ? state.region : "Unknown";
}

// Aggregate transactions (filtered by state if provided)
function aggregateTransactionsByRegion(
  transactions: any[],
  businesses: any[],
  branches: any[],
  currentState?: any
): RegionalTransaction[] {
  const regionMap = new Map<
    string,
    {
      totalTransactions: number;
      vatChargeable: number;
      vatIncome: number;
      totalVolume: number;
      businesses: Map<
        string,
        { name: string; branches: Set<string>; transactions: number }
      >;
    }
  >();

  // Business + branch maps
  const businessIdToName = new Map<number, string>();
  businesses.forEach((b) => businessIdToName.set(b.id, b.name));

  const branchIdToName = new Map<number, string>();
  branches.forEach((b) => branchIdToName.set(b.id, b.name));

  // Filter by currentState if selected
  const filtered = currentState
    ? transactions.filter((tx) => tx.state_id === currentState.id)
    : transactions;

  filtered.forEach((tx) => {
    const stateRegion = getRegionFromStateId(tx.state_id);
    const branchName = branchIdToName.get(tx.branch_id) || `Branch ${tx.branch_id}`;
    const businessName =
      businessIdToName.get(tx.business_id) || `Business ${tx.business_id}`;

    const amount = parseCurrency(tx.transaction_amount);
    const chargeable = parseCurrency(tx.transaction_amount_chargeable);
    const vat = parseCurrency(tx.transaction_amount_vat);

    if (!regionMap.has(stateRegion)) {
      regionMap.set(stateRegion, {
        totalTransactions: 0,
        vatChargeable: 0,
        vatIncome: 0,
        totalVolume: 0,
        businesses: new Map(),
      });
    }

    const regionData = regionMap.get(stateRegion)!;

    regionData.totalTransactions += 1;
    regionData.vatChargeable += chargeable;
    regionData.vatIncome += vat;
    regionData.totalVolume += amount;

    if (!regionData.businesses.has(businessName)) {
      regionData.businesses.set(businessName, {
        name: businessName,
        branches: new Set(),
        transactions: 0,
      });
    }

    const businessData = regionData.businesses.get(businessName)!;
    businessData.branches.add(branchName);
    businessData.transactions += 1;
  });

  // Convert map → array
  const result: RegionalTransaction[] = [];

  regionMap.forEach((data, region) => {
    data.businesses.forEach((bizData, bizName) => {
      const branchesArray = Array.from(bizData.branches);
      const label =
        branchesArray.length === 1
          ? `${bizName} - ${branchesArray[0]}`
          : `${bizName} (${branchesArray.length} branches)`;

      result.push({
        region,
        businessBranch: label,
        totalTransactions: bizData.transactions,
        vatChargeable:
          data.vatChargeable * (bizData.transactions / data.totalTransactions),
        vatIncome:
          data.vatIncome * (bizData.transactions / data.totalTransactions),
        totalVolume:
          data.totalVolume * (bizData.transactions / data.totalTransactions),
      });
    });
  });

  return result.sort((a, b) => a.region.localeCompare(b.region));
}

const isSafari = getUserAgentBrowser() === "Safari";

// ----------------------------------------------------------------------
// Main Component

export default function RegionalTransactionsTable({
  currentState,
}: {
  currentState: any;
}) {
  const { cardSkin } = useThemeContext();
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  // Compute regional data (filtered by currentState)
  const regionalData = useMemo(
    () =>
      aggregateTransactionsByRegion(
        transactionsData,
        businessesData,
        branchesData,
        currentState
      ),
    [transactionsData, businessesData, branchesData, currentState]
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
    {}
  );
  const [columnPinning, setColumnPinning] = useLocalStorage(
    "column-pinning-regional-transactions",
    {}
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
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        );
      },
      deleteRow: (row) => {
        skipAutoResetPageIndex();
        setData((old) =>
          old.filter(
            (oldRow) =>
              oldRow.region !== row.original.region ||
              oldRow.businessBranch !== row.original.businessBranch
          )
        );
      },
      deleteRows: (rows) => {
        skipAutoResetPageIndex();
        const rowIds = rows.map(
          (row) => `${row.original.region}-${row.original.businessBranch}`
        );
        setData((old) =>
          old.filter(
            (row) =>
              !rowIds.includes(`${row.region}-${row.businessBranch}`)
          )
        );
      },
    },
    filterFns: { fuzzy: fuzzyFilter },
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
          "dark:bg-dark-900 fixed inset-0 z-61 h-full w-full bg-white pt-3"
        )}
      >
        <Toolbar table={table} />
        <Card
          className={clsx(
            "relative mt-3 flex grow flex-col",
            tableSettings.enableFullScreen && "overflow-hidden"
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
                          ]
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
                                  header.getContext()
                                )}
                            </span>
                            <TableSortIcon
                              sorted={header.column.getIsSorted()}
                            />
                          </div>
                        ) : header.isPlaceholder ? null : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </THead>
              <TBody>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <Tr
                      className={clsx(
                        "dark:border-b-dark-500 relative border-y border-transparent border-b-gray-200",
                        row.getIsExpanded() && "border-dashed",
                        row.getIsSelected() &&
                        !isSafari &&
                        "row-selected after:bg-primary-500/10 ltr:after:border-l-primary-500 rtl:after:border-r-primary-500 after:pointer-events-none after:absolute after:inset-0 after:z-2 after:h-full after:w-full after:border-3 after:border-transparent"
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
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
                            ]
                          )}
                        >
                          {cell.column.getIsPinned() && (
                            <div
                              className={clsx(
                                "dark:border-dark-500 pointer-events-none absolute inset-0 border-gray-200",
                                cell.column.getIsPinned() === "left"
                                  ? "ltr:border-r rtl:border-l"
                                  : "ltr:border-l rtl:border-r"
                              )}
                            ></div>
                          )}
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      ))}
                    </Tr>
                    {row.getIsExpanded() && (
                      <tr>
                        <td
                          colSpan={row.getVisibleCells().length}
                          className="p-0"
                        >
                          <SubRowComponent
                            row={row}
                            cardWidth={cardWidth}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </TBody>
            </Table>
          </div>
          <SelectedRowsActions table={table} />
          {table.getCoreRowModel().rows.length > 0 && (
            <div
              className={clsx(
                "px-4 pb-4 sm:px-5 sm:pt-4",
                tableSettings.enableFullScreen &&
                "dark:bg-dark-800 bg-gray-50",
                !(
                  table.getIsSomeRowsSelected() ||
                  table.getIsAllRowsSelected()
                ) && "pt-4"
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
