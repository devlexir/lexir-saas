import { getOrder, deleteOrder } from "@/lib/api/orders";

import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "DELETE", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function order(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getServerSession({ req, res }, authOptions)
  // if (!session) return res.status(401).end()

  await cors(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getOrder(req, res);
    case HttpMethod.DELETE:
      return deleteOrder(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.GET, HttpMethod.DELETE]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
