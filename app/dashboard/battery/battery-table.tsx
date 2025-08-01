"use client";

import { DataTable } from "@/components/data-table/data-table";
import { batteries as batteryColumns } from "@/data/columns";
import { z } from "zod";
import { Battery } from "@/data/schema";

type BatteryType = z.infer<typeof Battery>;

export function BatteryTable({ data }: { data: BatteryType[] }) {
  return <DataTable columns={batteryColumns} data={data} page="Battery" />;
}