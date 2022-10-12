import { getBrand, updateBrand, deleteBrand } from "@/lib/api/brands";

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

export default async function brand(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);
  await callTokenValidate(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getBrand(req, res);
    /**
     * @swagger
     * /api/v1/brands:
     *   put:
     *     description: Returns the hello world
     *     responses:
     *       200:
     *         description: hello world
     *     tags:
     *        - brands
     */
    case HttpMethod.PUT:
      return updateBrand(req, res);
    /**
     * @swagger
     * /api/v1/brands:
     *   delete:
     *     description: Returns the hello world
     *     responses:
     *       200:
     *         description: hello world
     *     tags:
     *        - brands
     */
    case HttpMethod.DELETE:
      return deleteBrand(req, res);
    default:
      res.setHeader("Allow", [
        HttpMethod.GET,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
