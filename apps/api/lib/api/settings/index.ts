import prisma from '@/lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Settings } from '.prisma/client'

/**
 * Get Settings
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getSettings(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Settings> | (Settings | null)>> {
  try {
    const settings = await prisma.settings.findFirst()
    return res.status(200).json(settings)
  } catch (error) {
    console.error(error)
    return res.status(500).end(error)
  }
}
