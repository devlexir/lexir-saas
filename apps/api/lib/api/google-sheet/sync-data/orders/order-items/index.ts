import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { OrderItem } from ".prisma/client";

import { slugifyBrand } from "@/lib/utils/slugify";

import { sheets } from "@/lib/api/google-sheet/auth";

const sheetInfo = {
  spreadsheetId: "1bSb5B6BH4D0jXJGB8eeCK2G9IYwZQ6UkIUFFlaexA_E",
  range: "OrderItens!A:ZZ",
};
export async function getOrderItens() {
  var orderItems = <any>[];
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: sheetInfo.spreadsheetId,
        range: sheetInfo.range,
      },
      (err: any, result: any) => {
        if (err) {
          // Handle error
          reject(err);
        } else {
          result.data.values.forEach((p: any, index: number) => {
            if (index > 0) {
              orderItems.push({
                order_id: p[1],
                subdomain: slugifyBrand(p[20]),
                sku: p[2],
                qty: parseInt(p[12]),
                unit_price: parseFloat(p[4]),
                discount_rate: parseFloat(p[5]),
                price_w_discount: parseFloat(p[6]),
                vat: parseFloat(p[7]),
                price_w_vat: parseFloat(p[8]),
                total: parseFloat(p[27]),
                gross_sales: parseFloat(p[10]),
                product_name: p[19],
                year: parseInt(p[23]),
                month: parseInt(p[24]),
                imageSRC: p[32],
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
