import { getStock, updateStock, deleteStock } from "@/lib/api/stock";

import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";
import { callTokenValidate } from "@/lib/utils/token";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function stock(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res); // Validate the CORS to protect the calls
  await callTokenValidate(req, res); // Validate the token to protect the API

  switch (req.method) {
    case HttpMethod.GET:
      return getStock(req, res);
    case HttpMethod.PUT:
      return updateStock(req, res);
    case HttpMethod.DELETE:
      return deleteStock(req, res);
    default:
      res.setHeader("Allow", [
        HttpMethod.GET,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
