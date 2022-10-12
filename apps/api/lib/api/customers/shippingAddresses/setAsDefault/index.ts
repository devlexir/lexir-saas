import type { Customer } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// ==========================================================================
// JPCARVALHO | 25-08-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function setAsDefaultShippingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Customer>> {
  try {
    const shippingAddress = await prisma.shippingAddress.findFirst({
      where: {
        //@ts-ignore
        id: parseInt(req.query.shippingAddressID),
      },
    });

    // Every addresses to default false
    await prisma.shippingAddress.updateMany({
      where: {
        //@ts-ignore
        customer_id: parseInt(shippingAddress?.customer_id),
      },
      data: {
        default: false,
      },
    });

    await prisma.shippingAddress.update({
      where: {
        //@ts-ignore
        id: parseInt(req.query.shippingAddressID),
      },
      data: {
        default: true,
      },
    });

    return res.status(200).json(shippingAddress);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
