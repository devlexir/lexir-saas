import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { PayoutStatus } from ".prisma/client";

export async function getPayoutStatus(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<
  Array<PayoutStatus> | (PayoutStatus | null)
>> {
  try {
    let payout_status = await prisma.payoutStatus.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    });

    return res.status(200).json({
      data: payout_status,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
