import type { Customer } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function getBillingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  try {
    const billingAddress = await prisma.billingAddress.findFirst({
      where: {
        //@ts-ignore
        id: parseInt(req.query.billingAddressID),
      },
    });
    return res.status(200).json(billingAddress);
  } catch (error) {
    return res.status(500).end(error);
  }
}

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Not Solved ✅ | Tested ✅
// ==========================================================================

export async function getBillingAddresses(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  try {
    let addresses = [];
    addresses = await prisma.customer.findMany({
      where: {
        //@ts-ignore
        id: parseInt(req.query.customerID),
      },
      select: {
        id: true,
        billingAddress: true,
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

export async function createBillingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  CustomerID: string;
}>> {
  try {
    await prisma.customer.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        billingAddress: {
          create: {
            billing_name: req.body.billing_name,
            billing_phone: req.body.billing_phone,
            billing_email: req.body.billing_email,
            billing_zip: req.body.billing_zip,
            billing_state: req.body.billing_state,
            billing_country: req.body.billing_country,
            billing_city: req.body.billing_city,
            billing_address2: req.body.billing_address2,
            billing_address: req.body.billing_address,
          },
        },
      },
    });
    return res.status(201).send("New Billing Address Created");
  } catch (error) {
    return res.status(500).end(error);
  }
}

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function updateBillingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Customer>> {
  try {
    const customer = await prisma.billingAddress.update({
      where: {
        //@ts-ignore
        id: parseInt(req.query.billingAddressID),
      },
      data: {
        billing_name: req.body.billing_name,
        billing_phone: req.body.billing_phone,
        billing_email: req.body.billing_email,
        billing_zip: req.body.billing_zip,
        billing_state: req.body.billing_state,
        billing_country: req.body.billing_country,
        billing_city: req.body.billing_city,
        billing_address2: req.body.billing_address2,
        billing_address: req.body.billing_address,
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

export async function deleteBillingAddress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.billingAddress.delete({
        where: {
          //@ts-ignore
          id: parseInt(req.query.billingAddressID),
        },
      }),
    ]);

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
