import type { Customer } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// ==========================================================================
// JPCARVALHO | 25-08-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function setAsDefaultBillingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Customer>> {
  console.log(req.query);
  try {
    const billingAddress = await prisma.billingAddress.findFirst({
      where: {
        id: parseInt(req.query.billingAddressID),
      },
    });

    // Every addresses to default false
    await prisma.billingAddress.updateMany({
      where: {
        customer_id: parseInt(billingAddress?.customer_id),
      },
      data: {
        default: false,
      },
    });

    await prisma.billingAddress.update({
      where: {
        id: parseInt(req.query.billingAddressID),
      },
      data: {
        default: true,
      },
    });

    return res.status(200).json(billingAddress);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
