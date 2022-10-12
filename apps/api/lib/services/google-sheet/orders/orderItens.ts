import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { OrderItem } from ".prisma/client";

import { sheets, settings } from "../gsconfig";

function getOrderItens() {
  var orderItems = <any>[];
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: settings.orderItens.spreadsheetId,
        range: settings.orderItens.range,
      },
      (err: any, result: any) => {
        if (err) {
          // Handle error
          reject(err);
        } else {
          result.data.values.forEach((p: any, index: number) => {
            if (index > 0) {
              orderItems.push({
                order_id: p[0],
                sku: p[1],
                qty: p[2],
                unit_price: p[3],
                discount_rate: p[4],
                price_w_discount: p[5],
                vat: p[6],
                price_w_vat: p[6],
                total: p[25],
                gross_sales: p[12],
                product_name: p[18],
              });
            }
          });
          resolve(orderItems);
        }
      }
    );
  });
}

export async function syncOrderItens(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<OrderItem> | (OrderItem | null)>> {
  let orderItens: any = [];

  // Get all orders itens in Google Sheet
  await getOrderItens().then(async (o: any) => {
    orderItens = o;
  });

  // Save all orders itens in the database
  try {
    await prisma.orderItem.deleteMany({});

    await prisma.orderItem.createMany({
      data: orderItens,
    });
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }

  await res.status(200).json({ orderItens: orderItens });
}
