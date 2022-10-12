import { getTags, createTag } from "@/lib/api/tags";

import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";
import { callTokenValidate } from "@/lib/utils/token";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

import usersData from "./users.json";

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  await callTokenValidate(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return res.status(200).json(usersData);
    default:
      res.setHeader("Allow", [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
