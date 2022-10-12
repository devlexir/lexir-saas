import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "@/lib/api/products";

import Cors from "cors";
import initMiddleware from "../../../../lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function product(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await getServerSession({ req, res }, authOptions)
  // if (!session) return res.status(401).end()

  await cors(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getProduct(req, res);
    // return getProduct(req, res, session)
    case HttpMethod.POST:
      return createProduct(req, res);
    case HttpMethod.DELETE:
      return deleteProduct(req, res);
    case HttpMethod.PUT:
      return updateProduct(req, res);
    default:
      res.setHeader("Allow", [
        HttpMethod.GET,
        HttpMethod.POST,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
