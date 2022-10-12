import type { Category } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Get Category
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getCategory(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Category> | (Category | null)>> {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: req.query.id,
      },
    });
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Get Categories
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getCategories(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Category> | (Category | null)>> {
  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json({
      data: categories,
      total: categories.length,
      current_page: 1,
      count: categories.length,
      last_page: 1,
      first_item: 0,
      last_item: categories.length - 1,
      per_page: "999",
      first_page_url:
        "https://mock.lexir.io/api/categories?search=undefined&limit=999&parent=undefined&page=1",
      last_page_url:
        "https://mock.lexir.io/api/categories?search=undefined&limit=999&parent=undefined&page=1",
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
 * Creates a new Category from a set of provided query parameters.
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
export async function createCategory(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  CategoryId: string;
}>> {
  const { name, details, image, icon, parent } = req.body;

  try {
    const response = await prisma.category.create({
      data: {
        name: name,
        details: details,
        image: image,
        icon: icon,
        parent: parent,
      },
    });

    return res.status(201).json({
      CategoryId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Update Category
 *
 * Updates a Category & all of its data using a collection of provided
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
export async function updateCategory(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Category>> {
  const { name, details, image, icon, parent } = req.body;

  try {
    const response = await prisma.category.update({
      where: {
        id: req.query.id,
      },
      data: {
        name: name,
        details: details,
        image: image,
        icon: icon,
        parent: parent,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

/**
 * Delete Category
 *
 * Deletes a Category from the database using a provided `id` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function deleteCategory(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.category.delete({
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
