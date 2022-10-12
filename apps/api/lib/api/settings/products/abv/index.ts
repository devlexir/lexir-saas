import type { NextApiRequest, NextApiResponse } from "next";

import types_relationship from "@/lib/json/abv.json";

export async function getAbv(
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
