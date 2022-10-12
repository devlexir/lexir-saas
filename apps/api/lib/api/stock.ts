import type { Stock } from ".prisma/client";
import prisma from "@/lib/prisma";
import Joi from "joi";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";

const schema = Joi.object({
  subdomain: Joi.string().required(),
  max_stock: Joi.number().required(),
  available_stock: Joi.number().required(),
  qty_last_top_up_amount: Joi.number().required(),
  date_last_top_up_amount: Joi.date().required(),
  status: Joi.string().required(),
  product_id: Joi.number().required(),
});

export async function getStockInfo(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Stock> | (Stock | null)>> {
  const result: any =
    await prisma.$queryRaw`SELECT SUM(available_stock) as available_stock FROM lexir.Stock`;
  return res.status(200).json({
    data: {
      available_stock: result[0].available_stock,
    },
  });
}

export async function getStock(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Stock> | (Stock | null)>> {
  try {
    let stock = await prisma.stock.findFirst({
      where: {
        id: parseInt(req.query.id),
      },
      include: {
        Product: true,
        StockEntry: true,
      },
    });

    stock!.date_last_top_up_amount = moment(
      stock?.date_last_top_up_amount
    ).format("D MMM YYYY");

    return res.status(200).json(stock ? stock : {});
  } catch (error) {
    return res.status(500).end(error);
  }
}

export async function getStocks(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Stock> | (Stock | null)>> {
  try {
    let stocks = await prisma.product.findMany({
      where: {
        subdomain: req.query.subdomain,
      },
    });

    // let stocks = [
    //   {
    //     id: 1,
    //     subdomain: "erika",
    //     product_id: 1,
    //     name: "Erika",
    //     available_stock: 120,
    //     qty_last_top_up_amount: 20,
    //     date_last_top_up_amount: "26-05-2022",
    //     status: "Plenty of Stock",
    //   },
    //   {
    //     id: 2,
    //     subdomain: "erika",
    //     product_id: 2,
    //     name: "Erika",
    //     available_stock: 90,
    //     qty_last_top_up_amount: 20,
    //     date_last_top_up_amount: "26-05-2022",
    //     status: "Running Low",
    //   },
    //   {
    //     id: 3,
    //     subdomain: "baldoria",
    //     product_id: 3,
    //     name: "Baldoria",
    //     available_stock: 15,
    //     qty_last_top_up_amount: 20,
    //     date_last_top_up_amount: "26-05-2022",
    //     status: "Low",
    //   },
    // ];
    // if (!req.query.subdomain || req.query.subdomain === "admin") {
    //   stocks = await prisma.stock.findMany({
    //     orderBy: [
    //       {
    //         id: "desc",
    //       },
    //     ],
    //     include: {
    //       Product: true,
    //       StockEntry: true,
    //     },
    //   });
    // } else {
    //   stocks = await prisma.stock.findMany({
    //     where: {
    //       subdomain: req.query.subdomain.toString(),
    //     },
    //     include: {
    //       Product: true,
    //       StockEntry: true,
    //     },
    //   });
    // }

    // stocks = stocks.map((stock: any) => {
    //   stock!.date_last_top_up_amount = moment(
    //     stock?.date_last_top_up_amount
    //   ).format("D MMM YYYY");
    //   return stock;
    // });

    return res.status(200).json({
      data: stocks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function createStock(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  StockID: string;
}>> {
  try {
    const stock = await schema.validateAsync({
      subdomain: req.body.subdomain,
      max_stock: parseInt(req.body.max_stock),
      available_stock: parseInt(req.body.available_stock),
      qty_last_top_up_amount: parseInt(req.body.qty_last_top_up_amount),
      date_last_top_up_amount: req.body.date_last_top_up_amount,
      status: req.body.status,
      product_id: parseInt(req.body.product_id),
    });

    const response = await prisma.stock.create({
      data: {
        subdomain: stock.subdomain,
        max_stock: stock.max_stock,
        available_stock: stock.available_stock,
        available_percentage: (stock.available_stock / stock.max_stock) * 100,
        qty_last_top_up_amount: stock.qty_last_top_up_amount,
        date_last_top_up_amount: stock.date_last_top_up_amount,
        status: stock.status,
        Product: {
          connect: {
            id: stock.product_id,
          },
        },
      },
    });

    return res.status(201).json({
      StockID: response.id,
    });
  } catch (error) {
    console.error(error);
    //@ts-ignores
    return res.status(500).end(error);
  }
}

export async function updateStock(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Stock>> {
  console.log(req.query);
  try {
    const response = await prisma.stock.update({
      where: {
        id: parseInt(req.query.id),
      },
      data: {
        available_stock: parseInt(req.body.available_stock),
        qty_last_top_up_amount: parseInt(req.body.qty_last_top_up_amount),
        date_last_top_up_amount: req.body.date_last_top_up_amount,
        status: req.body.status,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteStock(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.stock.delete({
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
