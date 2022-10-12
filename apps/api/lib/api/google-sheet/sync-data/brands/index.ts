import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

import type { Brand } from ".prisma/client";

import { sheets } from "@/lib/api/google-sheet/auth";

import { slugifyBrand } from "@/lib/utils/slugify";

const sheetInfo = {
  spreadsheetId: "1bSb5B6BH4D0jXJGB8eeCK2G9IYwZQ6UkIUFFlaexA_E",
  range: "Brands!A:Z",
};

function getBrands() {
  var brands = <any>[];
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
              brands.push({
                subdomain: slugifyBrand(p[0]),
                brand_name: p[0],
                brand_id: parseInt(p[1]),
                country: p[2],
                commission: parseFloat(p[3]),
                type_relationship: p[4],
                plan: p[5],
                website: p[6],
                logo_src: p[7],
                brand_status: "Validated",
                published: true,
              });
            }
          });
          resolve(brands);
        }
      }
    );
  });
}

export async function syncBrands(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Brand> | (Brand | null)>> {
  await getBrands()
    .then(async (brands: any) => {
      try {
        await prisma.brand.deleteMany({});
        await prisma.brand.createMany({
          data: brands,
        });
        return brands;
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error | ${error}` });
      }
    })
    .then((brands) => {
      res
        .status(200)
        .json({ message: `Success | ${brands.length} brands added` });
    });
}
