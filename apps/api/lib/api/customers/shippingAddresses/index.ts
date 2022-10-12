import type { Lead } from ".prisma/client";
import type { Customer } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function getShippingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  try {
    const shippingAddress = await prisma.shippingAddress.findFirst({
      where: {
        id: parseInt(req.query.shippingAddressID),
      },
    });
    return res.status(200).json(shippingAddress);
  } catch (error) {
    return res.status(500).end(error);
  }
}

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function getShippingAddresses(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  try {
    let addresses = [];
    addresses = await prisma.customer.findMany({
      where: {
        id: parseInt(req.query.customerID),
      },
      select: {
        id: true,
        shippingAddress: true,
      },
    });

    return res.status(200).json({
      data: addresses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function createShippingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  CustomerID: string;
}>> {
  console.log(req.query);
  try {
    await prisma.customer.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        shippingAddress: {
          create: {
            address_nickname: req.body.address_nickname,
            shipping_address: req.body.shipping_address,
            shipping_address2: req.body.shipping_address2,
            shipping_zip: req.body.shipping_zip,
            shipping_state: req.body.shipping_state,
            shipping_country: req.body.shipping_country,
            shipping_city: req.body.shipping_city,
          },
        },
      },
    });
    return res.status(201).send("New Shipping Address Created");
  } catch (error) {
    console.log(error);
    return res.status(500).end(error);
  }
}

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function updateShippingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Customer>> {
  try {
    const customer = await prisma.shippingAddress.update({
      where: {
        id: parseInt(req.query.shippingAddressID),
      },
      data: {
        address_nickname: req.body.address_nickname,
        shipping_address: req.body.shipping_address,
        shipping_address2: req.body.shipping_address2,
        shipping_zip: req.body.shipping_zip,
        shipping_state: req.body.shipping_state,
        shipping_country: req.body.shipping_country,
        shipping_city: req.body.shipping_city,
      },
    });

    return res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function deleteShippingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.shippingAddress.delete({
        where: {
          id: parseInt(req.query.shippingAddressID),
        },
      }),
    ]);

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
