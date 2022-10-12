import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { OrderCustomer } from ".prisma/client";

import { sheets, settings } from "../gsconfig";

function getOrderCustomers() {
  var orderCustomers = <any>[];
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: settings.orderCustomers.spreadsheetId,
        range: settings.orderCustomers.range,
      },
      (err: any, result: any) => {
        if (err) {
          // Handle error
          reject(err);
        } else {
          result.data.values.forEach((p: any, index: number) => {
            if (index > 0) {
              orderCustomers.push({
                customer_id: p[6],
                customer_type: p[7],
                account_name: p[8],
                first_name: p[9],
                last_name: p[10],
                email: p[11],
                phone_number: p[12],
                city: "",
              });
            }
          });
          resolve(orderCustomers);
        }
      }
    );
  });
}

export async function syncOrderCustomers(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<
  Array<OrderCustomer> | (OrderCustomer | null)
>> {
  let orderCustomer: any = [];

  // Get all orders itens in Google Sheet
  await getOrderCustomers().then(async (o: any) => {
    orderCustomer = o;
  });

  // Save all orders itens in the database
  try {
    await prisma.orderCustomer.deleteMany({});

    await prisma.orderCustomer.createMany({
      data: orderCustomer,
    });
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }

  await res.status(200).json({ orderCustomer: orderCustomer });
}
