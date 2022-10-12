import { Site, Prisma } from ".prisma/client";
import prisma from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/utils/token";
import { parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = "Teste";

/**
 * Get Cms Page
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getSite(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Site> | (Site | null)>> {
  try {
    // const category = await prisma.category.findFirst({
    //   where: {
    //     id: req.query.id.toString(),
    //   },
    // })
    res.status(200).json(req.query);
    return res.status(200).json({
      _id: "2CB2AA961ABB4F2C960A9E549E5BD25F",
      siteID: 1, // To search info using fetch in the website
      name: "Around The Tree",
      subdomain: "aroundthetree",
      isCatalog: true,
      isShop: false,
      isCMS: true,
      modules: {
        cms: {
          enabled: true,
        },
        catalog: {
          enabled: true,
        },
        shop: {
          disabled: true,
        },
      },
      token: [
        {
          _id: 1,
          description: "CCF21E720DE049E9A19C859DA807F7C1",
          enableRead: true,
          enableWrite: true,
          enabled: true,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

function getToken(req: NextApiRequest) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

/**
 * Get Cms Pages
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getSites(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Site> | (Site | null)>> {
  // // Get Authorization Bearer
  // const token: string | null = getToken(req);

  // // Decode Token and Get WPYUSER Info
  // const wpyuser: any = token && (await verifyAccessToken(token));

  // // If WPYUSER is a superadmin
  // if (wpyuser && wpyuser.role === "superadmin") {
  try {
    const sites = await prisma.site.findMany();
    return res.status(200).json({
      sites,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
  // } else {
  //   res.status(401).json({ message: "401 Unauthorized" });
  // }

  // res.status(200).json({ user: user });
}

/**
 * Create Cms Page
 *
 * Creates a new Category from a set of provided query parameters.
 * These include:
 *  - name
 *  - type
 *  - details
 *  - parent
 *  - icon
 *  - image
 *
 * Once created, the Cms Pages new `ProductId` will be returned.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createSite(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  Response: JSON;
}>> {
  var response;
  try {
    response = await prisma.site.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        subdomain: req.body.subdomain,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      switch (e.code) {
        case "P2002":
          res.status(500).json({
            message:
              "There is a unique constraint violation, a new site cannot be created with this information",
          });
        default:
          res.status(500).json({ message: "Unknow error" });
      }
    }
    throw e;
  }
  return res.status(201).json({ response: response });
}

/**
 * Update Cms Page
 *
 * Updates a Cms Page & all of its data using a collection of provided
 * query parameters. These include the following:
 *  - name
 *  - type
 *  - details
 *  - parent
 *  - icon
 *  - image
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function updateSite(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Site>> {
  const { name, details, image, icon, parent } = req.body;

  try {
    const response = await prisma.site.update({
      where: {
        id: req.query.id.toString(),
      },
      data: {
        name: name,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Cms Page
 *
 * Deletes a Cms Page from the database using a provided `id` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteSite(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.category.delete({
        where: {
          id: req.query.id.toString(),
        },
      }),
    ]);

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
