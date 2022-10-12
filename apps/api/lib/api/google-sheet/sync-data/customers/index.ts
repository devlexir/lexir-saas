import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

import type { Customer } from ".prisma/client";

import { sheets } from "@/lib/api/google-sheet/auth";

const sheetInfo = {
  spreadsheetId: "1bSb5B6BH4D0jXJGB8eeCK2G9IYwZQ6UkIUFFlaexA_E",
  range: "Customers!A:AA",
};

function getCustomers() {
  var customers = <any>[];
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: sheetInfo.spreadsheetId,
        range: sheetInfo.range,
      },
      (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          result.data.values.forEach((p: any, index: number) => {
            if (index > 0) {
              customers.push({
                customer_id: parseInt(p[0]),
                customer_type: p[1],
                account_name: p[2],
                email: p[3],
                first_name: p[4],
                last_name: p[5],
                city: p[11],
                phone_number: p[11],
                customer_status: "Validated",
              });
            }
          });
          resolve(customers);
        }
      }
    );
  });
}

export async function syncCustomers(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  await getCustomers()
    .then(async (customers: any) => {
      try {
        await prisma.billingAddress.deleteMany({});
        await prisma.shippingAddress.deleteMany({});
        await prisma.customer.deleteMany({});
        await prisma.customer.createMany({
          data: customers,
        });
        return customers;
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error | ${error}` });
      }
    })
    .then((customers) => {
      res
        .status(200)
        .json({ message: `Success | ${customers.length} customers added` });
    });
}
