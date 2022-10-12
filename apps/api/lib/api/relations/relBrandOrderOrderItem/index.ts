import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

import type { Brand } from ".prisma/client";

export async function getRelBrandOrderOrderItem(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Brand> | (Brand | null)>> {
  try {
    let relsBrandOrderOrderItem = [];
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      relsBrandOrderOrderItem = await prisma.relBrandOrderOrderItem.findMany({
        orderBy: {
          id: "desc",
        },
      });
    } else {
      relsBrandOrderOrderItem = await prisma.brand.findMany({
        where: {
          subdomain: req.query.subdomain.toString(),
        },
      });
    }

    return res.status(200).json({
      data: relsBrandOrderOrderItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
