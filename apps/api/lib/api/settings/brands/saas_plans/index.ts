import type { NextApiRequest, NextApiResponse } from "next";

import saas_plans from "@/lib/json/saas_plans.json";

export async function getSaasPlans(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<any> | (any | null)>> {
  try {
    return res.status(200).json({
      data: saas_plans,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
