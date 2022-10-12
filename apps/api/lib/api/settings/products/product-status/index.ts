import type { NextApiRequest, NextApiResponse } from "next";

import types_relationship from "@/lib/json/product-status.json";

export async function getProductStatus(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<any> | (any | null)>> {
  try {
    return res.status(200).json({
      data: types_relationship,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
