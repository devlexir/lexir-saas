import { getTypes } from '@/lib/api/types'

import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

import { HttpMethod } from '@/types'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function types(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getServerSession({ req, res }, authOptions)
  // if (!session) return res.status(401).end()

  await cors(req, res)

  switch (req.method) {
    case HttpMethod.GET:
      return getTypes(req, res)
    // case HttpMethod.POST:
    //   return createProduct(req, res)
    // case HttpMethod.DELETE:
    //   return deleteProduct(req, res)
    // case HttpMethod.PUT:
    //   return updateProduct(req, res)
    default:
      res.setHeader('Allow', [
        HttpMethod.GET,
        // HttpMethod.POST,
        // HttpMethod.DELETE,
        // HttpMethod.PUT,
      ])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
