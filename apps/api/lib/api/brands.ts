import type { Brand } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getBrand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Brand> | (Brand | null)>> {
  try {
    const brand = await prisma.brand.findFirst({
      where: {
        id: parseInt(req.query.id),
      },
    });
    if (brand) {
      return res.status(200).json(brand);
    } else {
      return res
        .status(200)
        .json(`Brand | This id dont exists in the database`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function getBrands(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Brand> | (Brand | null)>> {
  try {
    let brands = [];
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      brands = await prisma.brand.findMany({
        orderBy: {
          id: "desc",
        },
      });
    } else {
      brands = await prisma.brand.findMany({
        where: {
          subdomain: req.query.subdomain.toString(),
        },
      });
    }

    return res.status(200).json({
      data: brands,
      total: 51,
      currentPage: 1,
      count: 20,
      lastPage: 3,
      firstItem: 0,
      lastItem: 19,
      perPage: "20",
      firstPageUrl: "https://mock.lexir.io/api/brands?search=&limit=20&page=1",
      lastPageUrl: "https://mock.lexir.io/api/brands?search=&limit=20&page=3",
      nextPageUrl: "https://mock.lexir.io/api/brands?search=&limit=20&page=2",
      prevPageUrl: "https://mock.lexir.io/api/brands?search=&limit=20&page=1",
      hasMorePages: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function createBrand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  BrandId: string;
}>> {
  const { name, details, image, icon, parent } = req.body;

  try {
    const response = await prisma.brand.create({
      data: {
        subdomain: req.body.subdomain || "global",
        brand_name: req.body.brand_name,
        country: req.body.country,
        commission: parseFloat(req.body.commission),
        type_relationship: req.body.type_relationship,
        plan: req.body.plan,
        website: req.body.website,
        logo_src: req.body.logo_src,
        brand_status: req.body.brand_status || "Not Validated",
      },
    });

    return res.status(201).json({
      BrandId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function updateBrand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Brand>> {
  // const { name, sku } = req.body
  console.log(req.query);
  console.log(req.body);
  try {
    const response = await prisma.brand.update({
      where: {
        id: parseInt(req.query.id),
      },
      data: {
        subdomain: req.body.subdomain || "global",
        brand_name: req.body.brand_name,
        country: req.body.country,
        commission: parseFloat(req.body.commission),
        type_relationship: req.body.type_relationship,
        plan: req.body.plan,
        website: req.body.website,
        logo_src: req.body.logo_src,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteBrand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.brand.delete({
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

// brandRequestAccountInfo: {
//   first_name: req.body.brandRequestAccountInfo.first_name || "",
//   last_name: req.body.brandRequestAccountInfo.last_name || "",
//   email: req.body.brandRequestAccountInfo.email || "",
//   brand_name: req.body.brandRequestAccountInfo.brand_name || "",
//   brand_city: req.body.brandRequestAccountInfo.brand_city || "",
//   brand_country: req.body.brandRequestAccountInfo.brand_country || "",
//   type_of_products:
//     req.body.brandRequestAccountInfo.type_of_products || "",
//   which_markets: req.body.brandRequestAccountInfo.which_markets || "",
//   how_about_us: req.body.brandRequestAccountInfo.how_about_us || "",
//   anything_else_message:
//     req.body.brandRequestAccountInfo.anything_else_message || "",
// },
