import type { Product } from ".prisma/client";
import prisma from "@/lib/prisma";
import { slugifyBrand } from "@/lib/utils/slugify";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getProduct(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Product> | (Product | null)>> {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: parseInt(req.query.id),
      },
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).end(error);
  }
}

export async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Product> | (Product | null)>> {
  console.log(req.body);
  try {
    let products = [];
    var falsy = /^(?:f(?:alse)?|no?|0+)$/i;
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      console.log(Boolean(req.query.published));
      products = await prisma.product.findMany({
        where: {
          brand: {
            contains:
              req.query.brandFilterProducts === ""
                ? undefined
                : req.query.brandFilterProducts,
          },
          category: {
            contains:
              req.query.categoryFilterProducts === ""
                ? undefined
                : req.query.categoryFilterProducts,
          },
          sku: {
            contains:
              req.query.skuFilterProducts === ""
                ? undefined
                : req.query.skuFilterProducts,
          },
          name: {
            contains:
              req.query.productNameFilterProducts === ""
                ? undefined
                : req.query.productNameFilterProducts,
          },
        },
        orderBy: [
          {
            updatedAt: "desc",
          },
        ],
      });
    } else {
      console.log(
        req.query.published === undefined
          ? null
          : !falsy.test(req.query.published) && !!req.query.published
      );
      products = await prisma.product.findMany({
        where: {
          subdomain: req.query.subdomain.toString(),
          published:
            req.query.published === undefined
              ? undefined
              : !falsy.test(req.query.published) && !!req.query.published,
        },
        orderBy: [
          {
            updatedAt: "desc",
          },
        ],
      });
    }

    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function createProduct(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  ProductId: string;
}>> {
  try {
    const response = await prisma.product.create({
      data: {
        subdomain: slugifyBrand(req.body.brand),
        sku: req.body.sku,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        brand: req.body.brand,
        category: req.body.category,
        size: req.body.size,
        abv: req.body.abv,
        b2bprice: req.body.b2bprice,
        b2cprice: req.body.b2cprice,
        status: req.body.status,
        imageSRC:
          "https://cdn-lexir.s3.eu-west-3.amazonaws.com/images/product_packshoots/placeholder-bottles.png",
        published: req.body.published,
      },
    });

    return res.status(201).json({
      ProductId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function updateProduct(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Product>> {
  try {
    const response = await prisma.product.update({
      where: {
        id: parseInt(req.query.id),
      },
      data: {
        subdomain: req.body.subdomain,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        brand: req.body.brand,
        category: req.body.category,
        size: req.body.size,
        abv: req.body.abv,
        b2bprice: req.body.b2bprice,
        b2cprice: req.body.b2cprice,
        status: req.body.status,
        published: req.body.published,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteProduct(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  console.log(req.body);
  try {
    await prisma.$transaction([
      prisma.product.delete({
        where: {
          id: parseInt(req.query.id),
        },
      }),
    ]);

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// total: 51,
// currentPage: 1,
// count: 20,
// lastPage: 3,
// firstItem: 0,
// lastItem: 19,
// perPage: "20",
// firstPageUrl:
//   "https://mock.lexir.io/api/products?search=&limit=20&page=1",
// lastPageUrl: "https://mock.lexir.io/api/products?search=&limit=20&page=3",
// nextPageUrl: "https://mock.lexir.io/api/products?search=&limit=20&page=2",
// prevPageUrl: "https://mock.lexir.io/api/products?search=&limit=20&page=1",
// hasMorePages: true,
