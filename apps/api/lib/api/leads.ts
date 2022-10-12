import type { Lead } from ".prisma/client";
import { sheets } from "@/lib/api/google-sheet/auth";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const sheetInfo = {
  spreadsheetId: "1e5CIoKQi0Dem6u_yAExumMxve458UgJ1QgpqvyMgboY",
  range: "Brands!A:Z",
};

export async function getLead(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Lead> | (Lead | null)>> {
  try {
    console.log(req.query.id);
    const lead = await prisma.lead.findFirst({
      where: {
        id: parseInt(req.query.id),
      },
    });
    return res.status(200).json(lead);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function getLeads(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Lead> | (Lead | null)>> {
  try {
    let leads = [];
    leads = await prisma.lead.findMany();

    return res.status(200).json({
      data: leads,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

function appendLead(data: any) {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.append(
      {
        spreadsheetId: sheetInfo.spreadsheetId,
        range: sheetInfo.range,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",

        resource: {
          values: [
            [
              data.first_name,
              data.last_name,
              data.email,
              data.brand_name,
              data.brand_city,
              data.brand_country,
              data.type_of_products,
              data.which_markets,
              data.how_about_us,
              data.anything_else_message,
              new Date(),
            ],
          ],
        },
      },
      (err: any, response: any) => {
        if (err) return console.error(err);
        console.log(response);
      }
    );
  });
}

export async function createLead(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  LeadId: string;
}>> {
  var data = {
    first_name: req.body.first_name || "",
    last_name: req.body.last_name || "",
    email: req.body.email || "",
    brand_name: req.body.brand_name || "",
    brand_city: req.body.brand_city || "",
    brand_country: req.body.brand_country || "",
    type_of_products: req.body.type_of_products || "",
    which_markets: req.body.which_markets || "",
    how_about_us: req.body.how_about_us || "",
    anything_else_message: req.body.anything_else_message || "",
  };

  appendLead(data);

  try {
    const response = await prisma.lead.create({
      data: data,
    });

    console.log(req.body);

    return res.status(201).json({
      LeadId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function updateLead(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Lead>> {
  // const { name, sku } = req.body
  console.log(req.query);
  console.log(req.body);
  try {
    const response = await prisma.lead.update({
      where: {
        id: parseInt(req.query.id),
      },
      data: {
        first_name: req.body.brandRequestAccountInfo.first_name || "",
        last_name: req.body.brandRequestAccountInfo.last_name || "",
        email: req.body.brandRequestAccountInfo.email || "",
        brand_name: req.body.brandRequestAccountInfo.brand_name || "",
        brand_city: req.body.brandRequestAccountInfo.brand_city || "",
        brand_country: req.body.brandRequestAccountInfo.brand_country || "",
        type_of_products:
          req.body.brandRequestAccountInfo.type_of_products || "",
        which_markets: req.body.brandRequestAccountInfo.which_markets || "",
        how_about_us: req.body.brandRequestAccountInfo.how_about_us || "",
        anything_else_message:
          req.body.brandRequestAccountInfo.anything_else_message || "",
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteLead(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.lead.delete({
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
