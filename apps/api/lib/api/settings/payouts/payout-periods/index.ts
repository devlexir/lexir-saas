import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { PayoutPeriod } from ".prisma/client";

export async function getPayoutPeriods(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<
  Array<PayoutPeriod> | (PayoutPeriod | null)
>> {
  try {
    let payout_period = await prisma.payoutPeriod.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    });

    return res.status(200).json({
      data: payout_period,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
