import data from "./data.json";
import { BatteryTable } from "./battery-table";
import { Battery } from "@/data/schema";
import { z } from "zod";

type BatteryType = z.infer<typeof Battery>;

export default function BatteryPage() {
  const batteriesData = data as BatteryType[];

  return (
    <div className="space-y-4">
      <BatteryTable data={batteriesData} />
    </div>
  );
}