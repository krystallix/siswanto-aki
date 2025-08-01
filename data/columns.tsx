"use client "

import { ColumnDef } from "@tanstack/react-table"

import { Battery } from "./schema"
import z from "zod"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
type BatteryType = z.infer<typeof Battery>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconArrowsUpDown, IconCopy, IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react"
import { cn } from "@/lib/utils"


export const batteries: ColumnDef<BatteryType>[] =
  [
    {
      accessorKey: "Name",
      header: "Name",
      enableHiding: false,
    },
    {
      accessorKey: "Brand",
      header: "Brand",
    },
    {
      accessorKey: "Series",
      header: "Series",
    },
    {
      accessorKey: "Type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-muted-foreground uppercase px-1.5">
          {row.original.Type}
        </Badge>
      ),
    },
    {
      accessorKey: "Ampere",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ampere
            <IconArrowsUpDown
              className={cn(
                "ml-2 size-3 transition-transform duration-200",
                {
                  "rotate-180": column.getIsSorted() === "asc",
                  "rotate-0": column.getIsSorted() === "desc" || !column.getIsSorted(),
                }
              )}
            />        </Button>
        )
      },
      cell: ({ row }) => <div className="text-left">{row.original.Ampere} Ah</div>,
    },
    {
      accessorKey: "Price",
      header: () => <div className="text-left">Selling Price</div>,
      cell: ({ row }) => (
        <div className="text-left">Rp{row.original.Price.toLocaleString("id-ID")}</div>
      ),
    },
    {
      accessorKey: "OriginalPrice",
      header: () => <div className="text-left">Cost Price</div>,
      cell: ({ row }) => (
        <div className="text-left">Rp{row.original.OriginalPrice?.toLocaleString("id-ID")}</div>
      ),
    },
    {
      accessorKey: "Stock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <IconArrowsUpDown
              className={cn(
                "ml-2 size-3 transition-transform duration-200",
                {
                  "rotate-180": column.getIsSorted() === "asc",
                  "rotate-0": column.getIsSorted() === "desc" || !column.getIsSorted(),
                }
              )}
            />        </Button>
        )
      },
      cell: ({ row }) => {
        const stock = row.original.Stock;
        const isLowStock = stock <= 2;
        return (
          <div className="text-center">
            <Badge
              variant={isLowStock ? "destructive" : "outline"}
              className="px-1.5"
            >
              {stock}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "compatibleVehicles",
      header: "Compatible Vehicles",
      cell: ({ row }) => {
        const vehicles = row.original.CompatibleVehicles;
        const fullNames = vehicles?.map((v: any) => v.Name).join(", ") || "-";
        let displayNames = fullNames;
        if (displayNames.length > 50) {
          displayNames = displayNames.substring(0, 50) + "...";
        }
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                {displayNames}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{fullNames}</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem><IconEdit />Edit</DropdownMenuItem>
            <DropdownMenuItem><IconCopy />Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive"><IconTrash />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]