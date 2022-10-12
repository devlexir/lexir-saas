import type { Type } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Get Types
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getTypes(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Type> | (Type | null)>> {
  try {
    const types = await prisma.type.findFirst();
    return res.status(200).json([]);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
