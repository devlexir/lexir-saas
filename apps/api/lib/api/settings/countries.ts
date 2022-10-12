import type { NextApiRequest, NextApiResponse } from "next";

import countries from "@/lib/json/countries.json";

export async function getCountries(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<any> | (any | null)>> {
  try {
    return res.status(200).json({
      data: countries,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
