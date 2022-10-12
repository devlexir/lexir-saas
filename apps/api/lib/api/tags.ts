import type { Tag } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Get Tag
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getTag(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Tag> | (Tag | null)>> {
  try {
    const tag = await prisma.tag.findFirst({
      where: {
        id: req.query.id?.toString(),
      },
    });
    return res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Get Tags
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getTags(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Tag> | (Tag | null)>> {
  try {
    const tags = await prisma.tag.findMany();
    return res.status(200).json({
      data: [],
      total: tags.length,
      current_page: 1,
      count: tags.length,
      last_page: 1,
      first_item: 0,
      last_item: tags.length - 1,
      per_page: "999",
      first_page_url:
        "https://mock.lexir.io/api/tags?search=undefined&limit=999&parent=undefined&page=1",
      last_page_url:
        "https://mock.lexir.io/api/tags?search=undefined&limit=999&parent=undefined&page=1",
      next_page_url: null,
      prev_page_url: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Create Product
 *
 * Creates a new Tag from a set of provided query parameters.
 * These include:
 *  - name
 *  - type
 *  - details
 *  - parent
 *  - icon
 *  - image
 *
 * Once created, the Products new `ProductId` will be returned.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function createTag(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  TagId: string;
}>> {
  const { name, details, image, icon, parent } = req.body;

  try {
    const response = await prisma.tag.create({
      data: {
        name: name,
      },
    });

    return res.status(201).json({
      TagId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Tag
 *
 * Updates a Tag & all of its data using a collection of provided
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
export async function updateTag(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Tag>> {
  const { name, details, image, icon, parent } = req.body;

  try {
    const response = await prisma.tag.update({
      where: {
        id: req.query.id?.toString(),
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
 * Delete Tag
 *
 * Deletes a Tag from the database using a provided `id` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteTag(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.tag.delete({
        where: {
          id: req.query.id?.toString(),
        },
      }),
    ]);

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
