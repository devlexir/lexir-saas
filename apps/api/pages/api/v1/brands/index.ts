import { getBrands, createBrand } from "@/lib/api/brands";

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

export default async function brands(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);
  await callTokenValidate(req, res);

  switch (req.method) {
    /**
     * @swagger
     * /api/v1/brands:
     *   get:
     *     description: Returns the hello world
     *     responses:
     *       200:
     *         description: hello world
     *     tags:
     *       - brands
     */
    case HttpMethod.GET:
      return getBrands(req, res);
    /**
     * @swagger
     * /api/v1/brands:
     *   post:
     *     description: Returns the hello world
     *     responses:
     *       200:
     *         description: hello world
     *     tags:
     *        - brands
     */
    case HttpMethod.POST:
      return createBrand(req, res);
    default:
      res.setHeader("Allow", [HttpMethod.GET, HttpMethod.POST]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
