import { getOrderStatus } from "@/lib/api/settings/orders/order-status";

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

export default async function settings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getOrderStatus(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}