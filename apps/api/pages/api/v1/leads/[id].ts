import { getLead, updateLead, deleteLead } from "@/lib/api/leads";

import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function lead(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getLead(req, res);
    case HttpMethod.PUT:
      return updateLead(req, res);
    case HttpMethod.DELETE:
      return deleteLead(req, res);
    default:
      res.setHeader("Allow", [
        HttpMethod.GET,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
