import type { Customer } from ".prisma/client";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getCustomer(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  console.log(req.query);
  try {
    const customer = await prisma.customer.findFirst({
      where: {
        id: parseInt(req.query.customerID),
      },
      include: {
        shippingAddress: true,
        billingAddress: true,
      },
    });
    if (customer) {
      return res.status(200).json(customer);
    } else {
      return res
        .status(200)
        .json(`Customer | This id dont exists in the database`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function getCustomers(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  try {
    let customers = [];
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      customers = await prisma.customer.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        include: {
          shippingAddress: true,
          billingAddress: true,
        },
      });
    } else {
      let customerIDS: any[] =
        await prisma.$queryRaw`SELECT ORDERCUSTOMER.customer_id FROM lexir.OrderItem as ITENS
      INNER JOIN lexir.OrderCustomer as ORDERCUSTOMER
      ON ITENS.order_id = ORDERCUSTOMER.order_lexir_id
      WHERE ITENS.subdomain = ${req.query.subdomain}`;

      // Get only the values
      customerIDS = customerIDS.map((customer: any) => customer.customer_id);

      // Remove all duplicated itens
      customerIDS = customerIDS.filter(function (item, pos) {
        return customerIDS.indexOf(item) == pos;
      });

      customers = await prisma.customer.findMany({
        where: {
          customer_id: { in: customerIDS },
        },
        include: {
          shippingAddress: true,
          billingAddress: true,
        },
      });
    }

    return res.status(200).json({
      data: customers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function createCustomer(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  CustomerId: string;
}>> {
  console.log(req.body);
  try {
    const response = await prisma.customer.create({
      data: {
        // subdomain: req.body.subdomain,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        account_name: req.body.account_name,
        email: req.body.email,
        phone_dial: req.body.phone_dial,
        phone_number: req.body.phone_number,
        city: req.body.city,
        customer_type: req.body.customer_type,
        company_number: req.body.company_number,
        company_document_filename: req.body.company_document_filename,
        company_document_url: req.body.company_document_url,
      },
    });

    return res.status(201).json({
      CustomerId: response.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function updateCustomer(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Customer>> {
  try {
    console.log(req.body.phone_dial);
    const response = await prisma.customer.update({
      where: {
        id: parseInt(req.query.customerID),
      },
      data: {
        // subdomain: req.body.subdomain,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        account_name: req.body.account_name,
        email: req.body.email,
        phone_dial: req.body.phone_dial,
        phone_number: req.body.phone_number,
        city: req.body.city,
        customer_type: req.body.customer_type,
        company_number: req.body.company_number,
        company_document_filename: req.body.company_document_filename,
        company_document_url: req.body.company_document_url,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteCustomer(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  console.log(req.body);
  try {
    await prisma.$transaction([
      prisma.customer.delete({
        where: {
          id: parseInt(req.query.id),
        },
      }),
    ]);

    return res.status(200).json(`Customer | Deleted`);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function customerOrderInfo(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Customer> | (Customer | null)>> {
  let customers = [],
    orders: any = [];

  customers = await prisma.customer.findMany();

  orders = await prisma.order.findMany();

  customers = customers.map((customer: any) => {
    console.log(orders[0].orderCustomer);
    console.log(
      orders.filter(
        (o: any) =>
          o.orderCustomer.customer_id == parseInt(customer.customer_id)
      ).length
    );
    // customer.customerOrdersInfo = {
    //   number_of_orders:
    //   total_value_orders: 10.5,
    // };

    return customer;
  });

  return res.status(200).json({ customers: customers, orders: orders });

  // console.log(req.query);
  // try {
  //   const customer = await prisma.customer.findFirst({
  //     where: {
  //       id: req.query.id.toString(),
  //     },
  //   });
  //   return res.status(200).json(customer);
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).end(error);
  // }
}

// if (!req.query.subdomain)
//   return res.status(500).end("Subdomain its necessary");
