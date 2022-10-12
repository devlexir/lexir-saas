import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { OrderDetail } from ".prisma/client";

import { sheets, settings } from "../gsconfig";

function getOrderDetails() {
  var orderDetails = <any>[];
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: settings.orderDetails.spreadsheetId,
        range: settings.orderDetails.range,
      },
      (err: any, result: any) => {
        if (err) {
          reject(err);
        } else {
          result.data.values.forEach((p: any, index: number) => {
            if (index > 0) {
              orderDetails.push({
                order_id: p[0],
                order_date: new Date(p[1]),
                subtotal: 0,
                total: parseFloat(p[28]),
                tax: 0,
                qty: p[3] ? parseInt(p[3]) : 0,
              });
            }
          });
          resolve(orderDetails);
        }
      }
    );
  });
}

export async function syncOrderDetails(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<OrderDetail> | (OrderDetail | null)>> {
  let OrderDetails: any = [];

  await getOrderDetails().then(async (o: any) => {
    OrderDetails = o;
  });

  try {
    await prisma.orderDetail.deleteMany({});

    await prisma.orderDetail.createMany({
      data: OrderDetails,
    });
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }

  await res.status(200).json({ OrderDetails: OrderDetails });
}
