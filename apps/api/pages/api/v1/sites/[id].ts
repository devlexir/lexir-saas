import { getSite, updateSite, deleteSite } from '@/lib/api/sites'

import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

import { HttpMethod } from '@/types'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function cmsPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession({ req, res }, authOptions)
  // if (!session) return res.status(401).end()

  await cors(req, res)

  switch (req.method) {
    case HttpMethod.GET:
      return getSite(req, res)
    case HttpMethod.PUT:
      return updateSite(req, res)
    case HttpMethod.DELETE:
      return deleteSite(req, res)
    default:
      res.setHeader('Allow', [
        HttpMethod.GET,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
