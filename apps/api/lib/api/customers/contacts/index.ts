import type { Customer } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// ==========================================================================
// JPCARVALHO | 20-09-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function getContact(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  try {
    const billingAddress = await prisma.billingAddress.findFirst({
      where: {
        id: parseInt(req.query.billingAddressID),
      },
    });
    return res.status(200).json(billingAddress);
  } catch (error) {
    return res.status(500).end(error);
  }
}

// ==========================================================================
// JPCARVALHO | 20-09-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function getContacts(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  try {
    let contacts = [];
    // contacts = await prisma.customer.findMany({
    //   where: {
    //
    //     id: parseInt(req.query.customerID),
    //   },
    //   select: {
    //     id: true,
    //     billingAddress: true,
    //   },
    // });

    return res.status(200).json({
      data: [
        {
          first_name: "A. ",
          last_name: "CCC",
          number: "+351914997132",
          primary: true,
        },
        {
          first_name: "L. ",
          last_name: "CCC",
          number: "+351914997135",
          primary: false,
        },
        {
          first_name: "P. ",
          last_name: "CCC",
          number: "+351914997131",
          primary: false,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// ==========================================================================
// JPCARVALHO | 20-09-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function createContact(
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
        contacts: {
          create: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            number: req.body.number,
            primary: false,
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
// JPCARVALHO | 20-09-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function updateContact(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Customer>> {
  try {
    const customer = await prisma.billingAddress.update({
      where: {
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
// JPCARVALHO | 20-09-2022 | Solved ✅ | Tested ✅
// ==========================================================================

export async function deleteContact(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.billingAddress.delete({
        where: {
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
