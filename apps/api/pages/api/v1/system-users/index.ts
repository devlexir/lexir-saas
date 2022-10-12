import { getSystemUsers, createSystemUser } from "@/lib/api/systemUsers";

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

export default async function Sites(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  await callTokenValidate(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getSystemUsers(req, res);
    case HttpMethod.POST:
      return createSystemUser(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.GET, HttpMethod.POST]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
