import { getContacts, createContact } from "@/lib/api/customers/contacts";

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
  // await callTokenValidate(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getContacts(req, res);
    case HttpMethod.POST:
      return createContact(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
