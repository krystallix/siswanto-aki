"use client"
import * as React from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  SortingState,
  useReactTable,
  getSortedRowModel,
  VisibilityState,
  getFilteredRowModel,
  Row,
  getPaginationRowModel,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pagination } from "./pagination"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { IconChevronDown, IconLayoutColumns } from "@tabler/icons-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: string
}


function createFuzzyFilter<T>(page: string) {
  return function fuzzyFilter(row: Row<T>, columnId: string, value: string) {
    const search = value.toLowerCase()
    const original = row.original as any

    const targets =
      page === "Battery"
        ? [
          original?.Name,
          original?.Brand,
          original?.Ampere?.toString(),
          original?.Type,
        ]
        : page === "vehicles"
          ? [original?.Brand, original?.Type]
          : []

    return targets.some((field) =>
      (field ?? "").toString().toLowerCase().includes(search)
    )
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const fuzzy = React.useMemo(() => createFuzzyFilter<TData>(page), [page])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzy,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    manualPagination: false,
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="relative max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="w-4 h-4" />
          </span>
          <Input
            placeholder={`Search ${page}`}
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-9" // padding kiri agar teks tidak numpuk ikon
          />
        </div>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mb-2 px-2">
          <Pagination table={table} />
        </div>
      </div>
    </>
  )
}