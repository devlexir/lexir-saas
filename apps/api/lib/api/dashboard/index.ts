import type { Customer } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type WidgetData = {
  total_revenue: number;
  total_bottles: string | null;
  total_orders: string | null;
};

type DataPerMonth = {
  description: string | null;
  month: string | null;
  year: string | null;
  total: number;
};

export async function widgets(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<WidgetData> | (WidgetData | null)> {
  try {
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      const total_revenue = await prisma.orderItem.aggregate({
        _sum: {
          total: true,
        },
      });

      const total_bottles = await prisma.orderItem.aggregate({
        _sum: {
          qty: true,
        },
      });

      const total_orders = await prisma.order.aggregate({
        _count: {
          order_lexir_id: true,
        },
      });

      return res.status(200).json({
        total_revenue: total_revenue._sum.total?.toFixed(0),

        total_bottles: total_bottles._sum.qty,

        total_orders: total_orders._count.order_lexir_id,
      });
    } else {
      const total_revenue = await prisma.orderItem.aggregate({
        where: {
          subdomain: req.query.subdomain,
        },
        _sum: {
          total: true,
        },
      });

      const total_bottles = await prisma.orderItem.aggregate({
        where: {
          subdomain: req.query.subdomain,
        },
        _sum: {
          qty: true,
        },
      });

      const total_orders = await prisma.order.aggregate({
        where: {
          OrderItem: {
            some: {
              subdomain: req.query.subdomain,
            },
          },
        },
        _count: {
          order_lexir_id: true,
        },
      });

      return res.status(200).json({
        total_revenue: total_revenue._sum.total?.toFixed(0),

        total_bottles: total_bottles._sum.qty,

        total_orders: total_orders._count.order_lexir_id,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function salesHistory(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<
  Array<DataPerMonth> | (DataPerMonth | null)
>> {
  try {
    let ordersItens: any;
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      ordersItens = await prisma.orderItem.findMany();
    } else {
      ordersItens = await prisma.orderItem.findMany({
        where: {
          subdomain: req.query.subdomain,
        },
      });
    }

    let series = [
      {
        year: "2021",
        month: 7,
        label: "AAA",
      },
      {
        year: 2021,
        month: 8,
        label: "AAA",
      },
      {
        year: 2021,
        month: 9,
        label: "AAA",
      },
      {
        year: 2021,
        month: 10,
        label: "AAA",
      },
      {
        year: 2021,
        month: 11,
        label: "AAA",
      },
      {
        year: 2021,
        month: 12,
        label: "AAA",
      },
      {
        year: 2022,
        month: 1,
        label: "AAA",
      },
      {
        year: 2022,
        month: 2,
        label: "AAA",
      },
      {
        year: 2022,
        month: 3,
        label: "AAA",
      },
      {
        year: 2022,
        month: 4,
        label: "AAA",
      },
      {
        year: 2022,
        month: 5,
        label: "AAA",
      },
      {
        year: 2022,
        month: 6,
        label: "AAA",
      },
      {
        year: 2022,
        month: 7,
        label: "AAA",
      },
    ];

    series = series.map((serie) => {
      return {
        ...serie,
        total: ordersItens
          .filter(function (o: any) {
            return o.year == serie.year && o.month == serie.month;
          })
          .reduce(function (sum: any, b: any) {
            return sum + b.total;
          }, 0)
          .toFixed(0),
        qty: ordersItens
          .filter(function (o: any) {
            return o.year == serie.year && o.month == serie.month;
          })
          .reduce(function (sum: any, b: any) {
            return sum + b.qty;
          }, 0),
      };
    });

    return res.status(200).json({
      orders: {
        sales: series.map((serie: any) => {
          return {
            x: serie.month + " " + serie.year,
            y: serie.total,
          };
        }),
        bottles: series.map((serie: any) => {
          return {
            x: serie.month + " " + serie.year,
            y: serie.qty,
          };
        }),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function topProducts(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  let itensSales, itensQty;

  if (!req.query.subdomain || req.query.subdomain === "admin") {
    itensSales = await prisma.orderItem.groupBy({
      by: ["product_name"],
      _sum: {
        total: true,
      },
      orderBy: {
        _sum: {
          total: "desc",
        },
      },
    });

    itensQty = await prisma.orderItem.groupBy({
      by: ["product_name"],
      _sum: {
        qty: true,
      },
      orderBy: {
        _sum: {
          qty: "desc",
        },
      },
    });
  } else {
    itensSales = await prisma.orderItem.groupBy({
      by: ["product_name"],
      _sum: {
        total: true,
      },
      where: {
        subdomain: req.query.subdomain,
      },
      orderBy: {
        _sum: {
          total: "desc",
        },
      },
    });

    itensQty = await prisma.orderItem.groupBy({
      by: ["product_name"],
      _sum: {
        qty: true,
      },
      where: {
        subdomain: req.query.subdomain,
      },
      orderBy: {
        _sum: {
          qty: "desc",
        },
      },
    });
  }

  var sales = itensSales.slice(0, 5).map((item) => {
    return {
      x: item.product_name,

      y: item._sum.total?.toFixed(0),
    };
  });

  var bottles = itensQty.slice(0, 5).map((item) => {
    return {
      x: item.product_name,

      y: item._sum.qty?.toFixed(0),
    };
  });

  res.status(200).json({ sales: sales, bottles: bottles });
}

export async function b2bVSb2c(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  let orders: any;
  let ordersB2BSales: [];
  let ordersB2CSales: [];
  let ordersB2BBottles: [];
  let ordersB2CBottles: [];

  if (!req.query.subdomain || req.query.subdomain === "admin") {
    ordersB2BSales =
      await prisma.$queryRaw`SELECT SUM(ITENS.total) AS total FROM lexir.OrderItem as ITENS
    INNER JOIN lexir.OrderCustomer as ORDERCUSTOMER
    ON ITENS.order_id = ORDERCUSTOMER.order_lexir_id
    WHERE ORDERCUSTOMER.customer_type = 'B2B'`;

    ordersB2BSales = ordersB2BSales[0] ? ordersB2BSales[0].total : 0;

    ordersB2CSales =
      await prisma.$queryRaw`SELECT SUM(ITENS.total) AS total FROM lexir.OrderItem as ITENS
    INNER JOIN lexir.OrderCustomer as ORDERCUSTOMER
    ON ITENS.order_id = ORDERCUSTOMER.order_lexir_id
    WHERE ORDERCUSTOMER.customer_type = 'B2C'`;

    ordersB2CSales = ordersB2CSales[0] ? ordersB2CSales[0].total : 0;

    ordersB2BBottles =
      await prisma.$queryRaw`SELECT SUM(ITENS.qty) AS qty FROM lexir.OrderItem as ITENS
    INNER JOIN lexir.OrderCustomer as ORDERCUSTOMER
    ON ITENS.order_id = ORDERCUSTOMER.order_lexir_id
    WHERE ORDERCUSTOMER.customer_type = 'B2B'`;

    ordersB2BBottles = ordersB2BBottles[0] ? ordersB2BBottles[0].qty : 0;

    ordersB2CBottles =
      await prisma.$queryRaw`SELECT SUM(ITENS.qty) AS qty FROM lexir.OrderItem as ITENS
    INNER JOIN lexir.OrderCustomer as ORDERCUSTOMER
    ON ITENS.order_id = ORDERCUSTOMER.order_lexir_id
    WHERE ORDERCUSTOMER.customer_type = 'B2C'`;

    ordersB2CBottles = ordersB2CBottles[0] ? ordersB2CBottles[0].qty : 0;
  } else {
    ordersB2BSales =
      await prisma.$queryRaw`SELECT SUM(ITENS.total) AS total FROM lexir.OrderItem as ITENS
      INNER JOIN lexir.OrderCustomer as ORDERCUSTOMER
      ON ITENS.order_id = ORDERCUSTOMER.order_lexir_id
      WHERE ITENS.subdomain = ${req.query.subdomain} AND ORDERCUSTOMER.customer_type = 'B2B'`;

    ordersB2BSales = ordersB2BSales[0] ? ordersB2BSales[0].total : 0;

    ordersB2CSales =
      await prisma.$queryRaw`SELECT SUM(ITENS.total) AS total FROM lexir.OrderItem as ITENS
      INNER JOIN lexir.OrderCustomer as ORDERCUSTOMER
      ON ITENS.order_id = ORDERCUSTOMER.order_lexir_id
      WHERE ITENS.subdomain = ${req.query.subdomain} AND ORDERCUSTOMER.customer_type = 'B2C'`;

    ordersB2CSales = ordersB2CSales[0] ? ordersB2CSales[0].total : 0;

    ordersB2BBottles =
      await prisma.$queryRaw`SELECT SUM(ITENS.qty) AS qty FROM lexir.OrderItem as ITENS
      INNER JOIN lexir.OrderCustomer as ORDERCUSTOMER
      ON ITENS.order_id = ORDERCUSTOMER.order_lexir_id
      WHERE ITENS.subdomain = ${req.query.subdomain} AND ORDERCUSTOMER.customer_type = 'B2B'`;

    ordersB2BBottles = ordersB2BBottles[0] ? ordersB2BBottles[0].qty : 0;

    ordersB2CBottles =
      await prisma.$queryRaw`SELECT SUM(ITENS.qty) AS qty FROM lexir.OrderItem as ITENS
      INNER JOIN lexir.OrderCustomer as ORDERCUSTOMER
      ON ITENS.order_id = ORDERCUSTOMER.order_lexir_id
      WHERE ITENS.subdomain = ${req.query.subdomain} AND ORDERCUSTOMER.customer_type = 'B2C'`;

    ordersB2CBottles = ordersB2CBottles[0] ? ordersB2CBottles[0].qty : 0;
  }

  ordersB2BSales = ordersB2BSales === null ? 0 : ordersB2BSales;

  ordersB2CSales = ordersB2CSales === null ? 0 : ordersB2CSales;

  ordersB2BBottles = ordersB2BBottles === null ? 0 : ordersB2BBottles;

  ordersB2CBottles = ordersB2CBottles === null ? 0 : ordersB2CBottles;

  try {
    return res.status(200).json({
      sales: [ordersB2BSales, ordersB2CSales],
      bottles: [ordersB2BBottles, ordersB2CBottles],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function topAccounts(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  try {
    let topAccounts: [];
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      topAccounts =
        await prisma.$queryRaw`SELECT account_name AS name, customer_type as customer_type, 
      SUM(total) AS total, ROUND(SUM(qty),0) AS qty FROM lexir.Order 
      INNER JOIN lexir.OrderItem
      ON lexir.Order.order_lexir_id = lexir.OrderItem.order_id
      INNER JOIN lexir.OrderCustomer 
      ON lexir.Order.order_lexir_id_order_customer = lexir.OrderCustomer.order_lexir_id
      WHERE (account_name <> 'B2C Consumer')
      GROUP BY account_name, customer_type 
      ORDER BY total desc
      LIMIT 5
      `;
    } else {
      topAccounts =
        await prisma.$queryRaw`SELECT account_name AS name, customer_type as customer_type, 
        SUM(ITEM.total) AS total, ROUND(SUM(ITEM.qty),0) AS qty FROM lexir.Order as O
        INNER JOIN lexir.OrderItem AS ITEM
        ON O.order_lexir_id = ITEM.order_id
        INNER JOIN lexir.OrderCustomer AS ORDERCUSTOMER
        ON O.order_lexir_id_order_customer = ORDERCUSTOMER.order_lexir_id
        WHERE (account_name <> 'B2C Consumer') AND ITEM.subdomain = ${req.query.subdomain}
        GROUP BY account_name, customer_type 
        ORDER BY total desc
        LIMIT 5
    `;
    }
    res.status(200).send(topAccounts);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}
