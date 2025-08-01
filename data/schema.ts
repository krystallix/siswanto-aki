import { z } from "zod"

export const Battery = z.object({
  ID: z.number(),
  Name: z.string(),
  Brand: z.string(),
  Series: z.string(),
  Type: z.string(),
  Ampere: z.number(),
  Price: z.number(),
  OriginalPrice: z.number().nullable().optional(),
  Stock: z.number(),
  ImageURL: z.string().url().nullable().optional(),
  Badge: z.string().nullable().optional(),
  Description: z.string().nullable().optional(),
  CompatibleVehicles: z.array(
    z.object({
      ID: z.number(),
      Name: z.string(),
      BatteryCodes: z.string(), // or z.string().regex(...) if you want to validate the format like `{NS40Z,NS40}`
      CompatibleBatteries: z.any().nullable().optional(), // kamu bisa definisikan lebih rinci kalau tahu strukturnya
    })
  ).optional(),
})