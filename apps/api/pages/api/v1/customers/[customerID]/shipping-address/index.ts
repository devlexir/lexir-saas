import { getTags, createTag } from "@/lib/api/tags";

import {
  getShippingAddresses,
  createShippingAddress,
} from "@/lib/api/customers/shippingAddresses";

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

import { callTokenValidate } from "@/lib/utils/token";

export default async function orders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);
  await callTokenValidate(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getShippingAddresses(req, res);
    case HttpMethod.POST:
      return createShippingAddress(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
