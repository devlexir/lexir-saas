import { changeStatusOnboardingBrand } from "@/lib/api/onboarding/onboardingBrands/change-status";

import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["PUT", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function brand(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  switch (req.method) {
    case HttpMethod.PUT:
      return changeStatusOnboardingBrand(req, res);

    default:
      res.setHeader("Allow", [HttpMethod.PUT]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
