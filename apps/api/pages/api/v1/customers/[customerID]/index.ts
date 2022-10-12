import {
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/lib/api/customers";

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

export default async function Customer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);
  await callTokenValidate(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getCustomer(req, res);
    case HttpMethod.PUT:
      return updateCustomer(req, res);
    case HttpMethod.DELETE:
      return deleteCustomer(req, res);
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
