import { getTags, createTag } from '@/lib/api/tags'

import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS'],
  })
)

import { HttpMethod } from '@/types'

import type { NextApiRequest, NextApiResponse } from 'next'

import authorsData from './authors.json'

export default async function authors(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession({ req, res }, authOptions)
  // if (!session) return res.status(401).end()

  await cors(req, res)

  switch (req.method) {
    case HttpMethod.GET:
      return res.status(200).json(authorsData)
    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
