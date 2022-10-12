import type { OnboardingBrand } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getOnboardingBrand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<
  Array<OnboardingBrand> | (OnboardingBrand | null)
>> {
  try {
    console.log(req.query.id);

    const brand = await prisma.onboardingBrand.findFirst({
      where: {
        id: req.query.id,
      },
    });
    return res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function getOnboardingBrands(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<
  Array<OnboardingBrand> | (OnboardingBrand | null)
>> {
  try {
    let brands = [];

    brands = await prisma.onboardingBrand.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return res.status(200).json({
      data: brands,
      // total: 51,
      // currentPage: 1,
      // count: 20,
      // lastPage: 3,
      // firstItem: 0,
      // lastItem: 19,
      // perPage: "20",
      // firstPageUrl: "https://mock.lexir.io/api/brands?search=&limit=20&page=1",
      // lastPageUrl: "https://mock.lexir.io/api/brands?search=&limit=20&page=3",
      // nextPageUrl: "https://mock.lexir.io/api/brands?search=&limit=20&page=2",
      // prevPageUrl: "https://mock.lexir.io/api/brands?search=&limit=20&page=1",
      // hasMorePages: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

// Create a onboarding brand
export async function createOnboardingBrand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  OnboardingBrandID: string;
}>> {
  try {
    const response = await prisma.onboardingBrand.create({
      data: {
        subdomain: req.body.subdomain || "global",
        brand_name: req.body.brand_name,
        contact_name: req.body.contact_name,
        contact_phone: req.body.contact_phone,
        contact_email: req.body.contact_email,
        country: req.body.country,
        language: req.body.language,
        assigned: req.body.assigned,
        status: req.body.status,
        onboardingInfo: {
          onboardingBrandNameInfo: {
            brand_name:
              req.body.onboardingInfo.onboardingBrandNameInfo.brand_name,
          },

          onboardingBrandCountryInfo: {
            country: "",
          },

          onboardingBrandCurrentMarkets: {
            markets: [],
          },

          onboardingBrandWebsite: {
            haveWebsite: false,
            website_url: "",
          },

          onboardingBrandBottleSalesQuantity: {
            qty_bracket: "",
          },

          onboardingBrandDesiredMarket: {
            market: null,
          },
        },
      },
    });

    return res.status(201).json({
      OnboardingBrandID: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function updateOnboardingBrand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<OnboardingBrand>> {
  // const { name, sku } = req.body
  console.log(req.query);
  console.log(req.body);
  try {
    const response = await prisma.onboardingBrand.update({
      where: {
        id: req.query.id,
      },
      data: {
        subdomain: req.body.subdomain || "global",
        brand_name: req.body.brand_name,
        contact_name: req.body.contact_name,
        contact_phone: req.body.contact_phone,
        contact_email: req.body.contact_email,
        country: req.body.country,
        language: req.body.language,
        assigned: req.body.assigned,
        status: req.body.status,
        onboardingInfo: {
          onboardingBrandNameInfo: {
            brand_name:
              req.body.onboardingInfo.onboardingBrandNameInfo.brand_name,
          },

          onboardingBrandCountryInfo: {
            country: req.body.onboardingInfo.onboardingBrandCountryInfo.country,
          },

          onboardingBrandCurrentMarkets: {
            markets:
              req.body.onboardingInfo.onboardingBrandCurrentMarkets.markets,
          },

          onboardingBrandWebsite: {
            haveWebsite:
              req.body.onboardingInfo.onboardingBrandWebsite.haveWebsite,
            website_url:
              req.body.onboardingInfo.onboardingBrandWebsite.website_url,
          },

          onboardingBrandBottleSalesQuantity: {
            qty_bracket:
              req.body.onboardingInfo.onboardingBrandBottleSalesQuantity
                .qty_bracket,
          },

          onboardingBrandDesiredMarket: {
            qty_bracket:
              req.body.onboardingInfo.onboardingBrandDesiredMarket.market,
          },
        },
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteOnboardingBrand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.onboardingBrand.delete({
        where: {
          id: req.query.id,
        },
      }),
    ]);

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
