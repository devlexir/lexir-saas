import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";
import { syncOrderItens } from "@/lib/api/google-sheet/sync-data/orders/order-items";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function googleSheetSync(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return syncOrderItens(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
