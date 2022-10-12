import { getPayout, updatePayout, deletePayout } from "@/lib/api/payouts";

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

export default async function payout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res); // Validate the CORS to protect the calls
  await callTokenValidate(req, res); // Validate the token to protect the API

  switch (req.method) {
    case HttpMethod.GET:
      return getPayout(req, res);
    case HttpMethod.PUT:
      return updatePayout(req, res);
    case HttpMethod.DELETE:
      return deletePayout(req, res);
    default:
      res.setHeader("Allow", [
        HttpMethod.GET,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
