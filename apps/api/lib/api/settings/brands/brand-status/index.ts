import type { NextApiRequest, NextApiResponse } from "next";

import brand_status from "@/lib/json/brand-status.json";

export async function getBrandStatus(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<any> | (any | null)>> {
  try {
    return res.status(200).json({
      data: brand_status,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
