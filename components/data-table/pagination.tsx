"use client"

import { Button } from "@/components/ui/button"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table } from "@tanstack/react-table"

interface PaginationProps<T> {
  table: Table<T>
}

export function Pagination<T>({ table }: PaginationProps<T>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const pageCount = table.getPageCount()

  return (
    <div className="flex w-full items-center justify-between gap-4 px-4 py-2 text-sm lg:px-6">
      <div className="hidden flex-1 text-muted-foreground lg:flex">
        {table.getFilteredRowModel().rows.length} row(s) total.
      </div>
      <div className="flex w-full flex-row items-center gap-4 md:flex-row sm:flex-row sm:justify-between lg:w-fit">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Rows per page</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[70px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}