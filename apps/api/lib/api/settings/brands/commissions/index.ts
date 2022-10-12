import type { NextApiRequest, NextApiResponse } from "next";

import commissions from "@/lib/json/commissions.json";

export async function getCommissions(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<any> | (any | null)>> {
  try {
    return res.status(200).json({
      data: commissions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
