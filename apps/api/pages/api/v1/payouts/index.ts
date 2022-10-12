import { getPayouts, createPayout } from "@/lib/api/payouts";

import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";

import { callTokenValidate } from "@/lib/utils/token";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function payouts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res); // Validate the CORS to protect the calls
  await callTokenValidate(req, res); // Validate the token to protect the API

  switch (req.method) {
    case HttpMethod.GET:
      return getPayouts(req, res);
    case HttpMethod.POST:
      return createPayout(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.GET, HttpMethod.POST]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
