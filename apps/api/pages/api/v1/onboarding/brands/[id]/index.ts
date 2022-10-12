import {
  getOnboardingBrand,
  updateOnboardingBrand,
  deleteOnboardingBrand,
} from "@/lib/api/onboarding/onboardingBrands";

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

export default async function brand(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      return getOnboardingBrand(req, res);
    case HttpMethod.PUT:
      return updateOnboardingBrand(req, res);
    case HttpMethod.DELETE:
      return deleteOnboardingBrand(req, res);
    default:
      res.setHeader("Allow", [
        HttpMethod.GET,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
