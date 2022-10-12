import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

import type { Brand } from ".prisma/client";

export async function getRelBrandOrderCustomer(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Brand> | (Brand | null)>> {
  try {
    let relsBrandOrderCustomer = [];
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      relsBrandOrderCustomer = await prisma.relBrandOrderCustomer.findMany({
        orderBy: {
          id: "desc",
        },
      });
    } else {
      relsBrandOrderCustomer = await prisma.brand.findMany({
        where: {
          subdomain: req.query.subdomain.toString(),
        },
      });
    }

    return res.status(200).json({
      data: relsBrandOrderCustomer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
