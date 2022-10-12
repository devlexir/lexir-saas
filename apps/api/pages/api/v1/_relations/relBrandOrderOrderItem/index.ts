import { getRelBrandOrderOrderItem } from "@/lib/api/relations/relBrandOrderOrderItem";

import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function relBrandOrderOrderItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession({ req, res }, authOptions)
  // if (!session) return res.status(401).end()

  await cors(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getRelBrandOrderOrderItem(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
