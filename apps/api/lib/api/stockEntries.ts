import type { StockEntry } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getStockEntries(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<StockEntry> | (StockEntry | null)>> {
  return res.status(200).json({
    data: [
      {
        id: 1,
        subdomain: "erika",
        product_id: 1,
        product_name: "Erika",
        available_stock: 120,
        qty_last_top_up_amount: 20,
        date_last_top_up_amount: "26-05-2022",
        status: "Plenty of Stock",
      },
      {
        id: 2,
        subdomain: "erika",
        product_id: 2,
        product_name: "Erika",
        available_stock: 90,
        qty_last_top_up_amount: 20,
        date_last_top_up_amount: "26-05-2022",
        status: "Running Low",
      },
      {
        id: 3,
        subdomain: "baldoria",
        product_id: 3,
        product_name: "Baldoria",
        available_stock: 15,
        qty_last_top_up_amount: 20,
        date_last_top_up_amount: "26-05-2022",
        status: "Low",
      },
    ],
  });
}

export async function createStockEntry(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  StockEntryID: string;
}>> {
  return res.status(200).json({ message: "Create a stock entriy" });
}
