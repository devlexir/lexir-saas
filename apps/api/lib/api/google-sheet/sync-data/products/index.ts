import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

import type { Product } from ".prisma/client";

import { sheets } from "@/lib/api/google-sheet/auth";

const sheetInfo = {
  spreadsheetId: "1bSb5B6BH4D0jXJGB8eeCK2G9IYwZQ6UkIUFFlaexA_E",
  range: "Products!A:Z",
};

function getProducts() {
  var products = <any>[];
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
          var falsy = /^(?:f(?:alse)?|no?|0+)$/i;
          result.data.values.forEach((p: any, index: number) => {
            if (index > 0) {
              products.push({
                subdomain: p[0],
                sku: p[1],
                name: p[2],
                brand: p[3],
                size: p[4],
                abv: p[5],
                category: p[7],
                b2bprice: p[10]?.replace("€", ""),
                b2cprice: p[11]?.replace("€", ""),
                price: p[10]?.replace("€", ""),
                quantity: p[15],
                imageSRC: `https://cdn-lexir.s3.eu-west-3.amazonaws.com/images/product_packshoots/${p[14]}`,
                published: !falsy.test(p[23]) && !!p[23],
              });
            }
          });
          resolve(products);
        }
      }
    );
  });
}

export async function syncProducts(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Product> | (Product | null)>> {
  await getProducts()
    .then(async (products: any) => {
      try {
        await prisma.product.deleteMany({});
        await prisma.product.createMany({
          data: products,
        });
        return products;
      } catch (error) {
        console.error(error);
      }
    })
    .then(() => {
      res.status(200).json({ message: "All products added" });
    });
}

// .then(async (products: any) => {
//   // products.sort((a: any, b: any) =>
//   //   a?.name?.toLowerCase() > b?.name?.toLowerCase() ? 1 : -1
//   // );
//   // let productAux: any = [];
//   // await products.map((product: any) => {
//   //   productAux = productsJSON.allProducts.filter(
//   //     (p) => p.name === product.name
//   //   );
//   //   if (productAux.length > 0) {
//   //     product.imageSRC = productAux[0].photos[0].url;
//   //   } else {
//   //     product.imageSRC =
//   //       "https://www.datocms-assets.com/30257/1605227060-packshot-erika-navy-strength.png";
//   //   }
//   // });
//   // return products;
// })
