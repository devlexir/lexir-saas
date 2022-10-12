import { slugifyBrand } from "../utils/slugify";
import type { Payout } from ".prisma/client";
import prisma from "@/lib/prisma";
import Joi from "joi";
import { isEmpty } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

const schema = Joi.object({
  subdomain: Joi.string().required(),
  brand: Joi.string().required(),
  payout_period: Joi.string().required(),
  reportFileName: Joi.string().required(),
  reportUrl: Joi.string().required(),
  status: Joi.string().required(),
});

export async function getPayout(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Payout> | (Payout | null)>> {
  try {
    const payout = await prisma.payout.findFirst({
      where: {
        id: parseInt(req.query.id),
      },
    });
    return res.status(200).json(payout ? payout : {});
  } catch (error) {
    return res.status(500).end(error);
  }
}

export async function getPayouts(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Payout> | (Payout | null)>> {
  try {
    let payouts = [];
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      payouts = await prisma.payout.findMany({
        orderBy: [
          {
            id: "desc",
          },
        ],
      });
    } else {
      payouts = await prisma.payout.findMany({
        where: {
          subdomain: req.query.subdomain.toString(),
        },
      });
    }

    return res.status(200).json({
      data: payouts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function createPayout(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  PayoutID: string;
}>> {
  try {
    //sdf
    const payout = await schema.validateAsync({
      subdomain: slugifyBrand(req.body.brand),
      brand: req.body.brand,
      payout_period: req.body.payout_period,
      reportFileName: req.body.reportFileName,
      reportUrl: req.body.reportUrl,
      status: req.body.status,
    });

    let payouts = await prisma.payout.findMany({
      where: {
        subdomain: req.body.subdomain,
        brand: req.body.brand,
        payout_period: req.body.payout_period,
      },
    });

    // If exists some payout with the same payout_period, return a error
    if (!isEmpty(payouts))
      throw {
        details: [
          {
            message:
              "The system has this payout period. Please edit or delete the previous one.",
          },
        ],
      };

    let payout_period = await prisma.payoutPeriod.findUnique({
      where: {
        value: req.body.payout_period,
      },
    });

    // If the payout period it's not present in the DB, return a error
    if (!payout_period)
      throw {
        details: [
          {
            message: "The system hasn't this payout period.",
          },
        ],
      };

    let payout_status = await prisma.payoutStatus.findUnique({
      where: {
        value: req.body.status,
      },
    });

    // If the payout status it's not present in the DB, return a error
    if (!payout_status)
      throw {
        details: [
          {
            message: "The system hasn't this payout status.",
          },
        ],
      };

    const response = await prisma.payout.create({
      data: {
        subdomain: payout.subdomain,
        brand: payout.brand,
        payout_period: payout.payout_period,
        reportFileName: payout.reportFileName,
        reportUrl: payout.reportUrl,
        status: payout.status,
      },
    });

    return res.status(201).json({
      PayoutID: response.id,
    });
  } catch (error) {
    console.error(error);
    //@ts-ignores
    return res.status(500).end(error);
  }
}

export async function updatePayout(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Payout>> {
  console.log(req.body);
  try {
    if (req.body.payout_period) {
      let payout_period = await prisma.payoutPeriod.findUnique({
        where: {
          value: req.body.payout_period,
        },
      });

      // If the payout period it's not present in the DB, return a error
      if (!payout_period)
        throw {
          details: [
            {
              message: "The system hasn't this payout period.",
            },
          ],
        };
    }

    if (req.body.status) {
      let payout_status = await prisma.payoutStatus.findUnique({
        where: {
          value: req.body.status,
        },
      });

      // If the payout status it's not present in the DB, return a error
      if (!payout_status)
        throw {
          details: [
            {
              message: "The system hasn't this payout status.",
            },
          ],
        };
    }

    const response = await prisma.payout.update({
      where: {
        id: parseInt(req.query.id),
      },
      data: {
        subdomain: req.body.subdomain,
        brand: req.body.brand,
        payout_period: req.body.payout_period,
        reportFileName: req.body.reportFileName,
        reportUrl: req.body.reportUrl,
        status: req.body.status,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deletePayout(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.payout.delete({
        where: {
          id: parseInt(req.query.id),
        },
      }),
    ]);

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
