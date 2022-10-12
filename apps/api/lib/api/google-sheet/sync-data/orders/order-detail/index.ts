import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { OrderDetail } from ".prisma/client";

import { sheets } from "@/lib/api/google-sheet/auth";

const sheetInfo = {
  spreadsheetId: "1bSb5B6BH4D0jXJGB8eeCK2G9IYwZQ6UkIUFFlaexA_E",
  range: "OrderDetail!A:ZZ",
};

function getOrderDetail() {
  var orders = <any>[];
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
              orders.push({
                order_id: p[0],
              });
            }
          });
          resolve(orders);
        }
      }
    );
  });
}

export async function syncOrderDetail(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<OrderDetail> | (OrderDetail | null)>> {
  return res.status(500).end("Dont exist");
}
