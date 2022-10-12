//@ts-ignore
import type { OnboardingBrand } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export async function changeStatusOnboardingBrand(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<OnboardingBrand>> {
  console.log(req.body);
  try {
    //@ts-ignore
    const response = await prisma.onboardingBrand.update({
      where: {
        id: req.query.id,
      },
      data: {
        status: req.body.status,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
