import type {
  Order,
  OrderItem,
  OrderCustomer,
  OrderDetail, // OrderPayment,
  // ShippingAddress,
  // BillingAddress,
  // OrderStatus,
} from ".prisma/client";
import prisma from "@/lib/prisma";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

export async function getOrder(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Order> | (Order | null)>> {
  let order = {} || null;

  try {
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      order = await prisma.order.findFirst({
        where: {
          //@ts-ignore
          id: parseInt(req.query.id),
        },

        include: {
          OrderItem: true,
          OrderCustomer: true,
          OrderDetail: true,
          OrderShippingAddress: true,
          OrderBillingAddress: true,
          OrderShipment: true,
          OrderPayment: true,
          OrderContact: true,
        },
      });
      //@ts-ignore
      order.OrderStatus = [
        {
          id: 1,
          name: "New",
          serial: 1,
          color: "#0d9965",
          status: false,
          updated_at: "2022-02-22T03:46:30.000Z",
        },
        {
          id: 2,
          name: "Processing",
          serial: 2,
          color: "#0d9965",
          status: false,
          updated_at: "2022-02-22T03:46:30.000Z",
        },
        {
          id: 3,
          name: "In Transit",
          serial: 3,
          color: "#0d9965",
          status: false,
          updated_at: "2022-02-22T03:46:30.000Z",
        },
        {
          id: 4,
          name: "Delivered",
          serial: 4,
          color: "#64acd8",
          status: false,
          updated_at: "2022-02-22T03:46:30.000Z",
        },
        {
          id: 5,
          name: "Paid",
          serial: 5,
          color: "#eacb34",
          status: false,
          updated_at: "2022-02-22T03:46:30.000Z",
        },
        // {
        //   id: 6,
        //   name: "Canceled",
        //   serial: 6,
        //   color: "#eacb34",
        // },
      ];

      return res.status(200).send(order);
    } else {
      order = await prisma.order.findFirst({
        where: {
          //@ts-ignore
          id: parseInt(req.query.id),
        },

        include: {
          OrderItem: true,
          OrderCustomer: true,
          OrderDetail: true,
          OrderShippingAddress: true,
          OrderBillingAddress: true,
          OrderShipment: true,
          OrderPayment: true,
          OrderContact: true,
        },
      });
      //@ts-ignore
      order.OrderItem = order.OrderItem.filter(
        (orderItem: any) => orderItem.subdomain === req.query.subdomain
      );
      //@ts-ignore
      order.OrderStatus = [
        {
          id: 1,
          name: "New",
          serial: 1,
          color: "#0d9965",
        },
        {
          id: 2,
          name: "Processing",
          serial: 2,
          color: "#0d9965",
        },
        {
          id: 3,
          name: "In Transit",
          serial: 3,
          color: "#0d9965",
        },
        {
          id: 4,
          name: "Delivered",
          serial: 4,
          color: "#64acd8",
        },
        {
          id: 5,
          name: "Paid",
          serial: 5,
          color: "#eacb34",
        },
        {
          id: 6,
          name: "Canceled",
          serial: 6,
          color: "#eacb34",
        },
      ];

      return res.status(200).send(order);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

export async function getOrders(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Order> | (Order | null)>> {
  let orders = [];

  try {
    if (!req.query.subdomain || req.query.subdomain === "admin") {
      orders = await prisma.order.findMany({
        orderBy: [
          {
            id: "desc",
          },
        ],
        include: {
          OrderItem: true,
          OrderCustomer: true,
          OrderDetail: true,
          OrderShippingAddress: true,
          OrderBillingAddress: true,
          OrderShipment: true,
          OrderPayment: true,
          OrderContact: true,
        },
      });
    } else {
      orders = await prisma.order.findMany({
        where: {
          OrderItem: {
            some: {
              //@ts-ignore
              subdomain: req.query.subdomain,
            },
          },
        },
        orderBy: [
          {
            order_date: "desc",
          },
        ],
        include: {
          OrderItem: true,
          OrderCustomer: true,
          OrderDetail: true,
          OrderShippingAddress: true,
          OrderBillingAddress: true,
          OrderShipment: true,
          OrderPayment: true,
          OrderContact: true,
        },
      });

      orders = orders.map((o: any) => {
        o.OrderItem = o.OrderItem.filter(
          (orderItem: any) => orderItem.subdomain === req.query.subdomain
        );
        o.OrderDetail.total = o.OrderItem.reduce(
          (partialSum: any, a: any) => partialSum + a.total,
          0
        );
        o.OrderDetail.qty = o.OrderItem.reduce(
          (partialSum: any, a: any) => partialSum + a.qty,
          0
        );
        return o;
      });

      console.log(orders);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
  return res.status(200).json({
    data: orders,
  });
}

export async function getOrderItens(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<OrderItem> | (OrderItem | null)>> {
  var orderItens = [];
  try {
    orderItens = await prisma.orderItem.findMany();
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.status(200).json({
    data: orderItens,
  });
}

export async function getOrderCustomers(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<
  Array<OrderCustomer> | (OrderCustomer | null)
>> {
  var orderCustomers = [];
  try {
    orderCustomers = await prisma.orderCustomer.findMany();
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.status(200).json({
    data: orderCustomers,
  });
}

export async function getOrderDetail(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<OrderDetail> | (OrderDetail | null)>> {
  var orderDetails = [];
  try {
    orderDetails = await prisma.orderDetail.findMany();
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.status(200).json({
    data: orderDetails,
  });
}

export async function createOrder(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  OrderId: string;
}>> {
  let {
    customer_id,
    shippingAddress,
    billingAddress,
    orderItens,
    shipment,
    payment,
    contact,
  } = req.body;

  //todo: change the orderItens to orderCart parameter
  const orderCart = orderItens; // Assign the orderItens to order cart

  // Get Order Itens searching the products in the database by ID
  orderItens = await prisma.product.findMany({
    where: {
      id: {
        in: orderItens.map((item: any) => {
          return item.product_id;
        }),
      },
    },
  });

  orderItens = orderItens.map((item: any, index: any) => {
    //item.subdomain => same propriety
    //item.sku
    item.qty = orderCart[index].quantity;
    item.unit_price = parseFloat(item.price);
    item.vat = 0.2;
    item.total =
      parseInt(orderCart[index].quantity) * parseFloat(item.unit_price);
    item.price_w_vat = item.total * item.vat;
    item.product_name = item.name;
    item.month = parseInt(moment().format("M"));
    item.year = parseInt(moment().format("YYYY"));
    delete item.id;
    delete item.name;
    delete item.price;
    delete item.category;
    delete item.size;
    delete item.abv;
    delete item.b2bprice;
    delete item.b2cprice;
    delete item.quantity;
    delete item.slug;
    delete item.description;
    delete item.type_id;
    delete item.shop_id;
    delete item.sale_price;
    delete item.min_price;
    delete item.max_price;
    delete item.preview_url;
    delete item.in_stock;
    delete item.is_taxable;
    delete item.shipping_class_id;
    delete item.status;
    delete item.product_type;
    delete item.unit;
    delete item.height;
    delete item.width;
    delete item.length;
    delete item.author_id;
    delete item.manufacturer_id;
    delete item.is_digital;
    delete item.is_external;
    delete item.external_product_url;
    delete item.external_product_button_text;
    delete item.orders_count;
    delete item.total_downloads;
    delete item.product_status;
    delete item.itemTotal;
    return item;
  });

  try {
    const customer = await prisma.customer.findUnique({
      where: {
        customer_id: customer_id,
      },
    });

    const ordersToday: [] =
      await prisma.$queryRaw`SELECT * FROM lexir.Order WHERE order_date > CURRENT_DATE
    `;

    const order_lexir_id =
      moment().format("YYYYMMDD") + (ordersToday.length + 1);

    const order = await prisma.order.create({
      data: {
        order_lexir_id: order_lexir_id,
        order_date: new Date(Date.now()),
        OrderCustomer: {
          create: {
            order_lexir_id: order_lexir_id,
            customer_id: customer?.customer_id,
            customer_type: customer?.customer_type,
            account_name: customer?.account_name,
            first_name: customer?.first_name,
            last_name: customer?.last_name,
            email: customer?.email,
            phone_number: customer?.phone_number,
            city: customer?.city,
          },
        },
        OrderItem: {
          create: orderItens,
        },
        OrderDetail: {
          create: {
            order_lexir_id: order_lexir_id,
            order_date: new Date(Date.now()),
            subtotal: parseFloat(
              await orderItens
                .reduce(function (sum: any, b: any) {
                  return sum + b.total * (1 - b.vat);
                }, 0)
                .toFixed(2)
            ),
            vat: parseFloat(
              await orderItens
                .reduce(function (sum: any, b: any) {
                  return sum + b.total * b.vat;
                }, 0)
                .toFixed(2)
            ),
            total: parseFloat(
              await orderItens
                .reduce(function (sum: any, b: any) {
                  return sum + b.total;
                }, 0)
                .toFixed(2)
            ),
            qty: parseInt(
              await orderItens
                .reduce(function (sum: any, b: any) {
                  return sum + b.qty;
                }, 0)
                .toFixed(2)
            ),
          },
        },
        OrderShippingAddress: {
          create: {
            order_lexir_id: order_lexir_id,
            customer_id: 1,
            address_nickname: shippingAddress.address_nickname,
            shipping_address: shippingAddress.shipping_address,
            shipping_address2: shippingAddress.shipping_address2,
            shipping_zip: shippingAddress.shipping_zip,
            shipping_state: shippingAddress.shipping_state,
            shipping_country: shippingAddress.shipping_country,
            shipping_city: shippingAddress.shipping_city,
          },
        },
        OrderBillingAddress: {
          create: {
            order_lexir_id: order_lexir_id,
            customer_id: 1,
            billing_name: billingAddress.billing_name,
            billing_address: billingAddress.billing_address,
            billing_address2: billingAddress.billing_address2,
            billing_zip: billingAddress.billing_zip,
            billing_state: billingAddress.billing_state,
            billing_country: billingAddress.billing_country,
            billing_city: billingAddress.billing_city,
            billing_phone: billingAddress.billing_phone,
            billing_email: billingAddress.billing_email,
          },
        },
        OrderShipment: {
          create: {
            order_lexir_id: order_lexir_id,
            shipment_carrier: shipment.shipment_carrier || null,
            shipment_date: shipment.shipment_date || null,
            shipment_cost: shipment.shipment_cost || 0.0,
            tracking_id: shipment.tracking_id || null,
          },
        },
        OrderPayment: {
          create: {
            order_lexir_id: order_lexir_id,
            payment_method: payment.payment_method || null,
            payment_date: payment.payment_date || null,
          },
        },
        OrderContact: {
          create: {
            order_lexir_id: order_lexir_id,
            first_name: contact.first_name || null,
            last_name: contact.last_name || null,
            dial: contact.dial || null,
            phone_number: contact.phone_number || null,
          },
        },
      },
    });

    return res.status(201).json({ order: order });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function updateOrder(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Order>> {
  try {
    const response = await prisma.order.update({
      where: {
        //@ts-ignore
        id: req.query.id,
      },
      data: {
        subdomain: req.body.subdomain,
      },
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteOrder(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.order.delete({
        where: {
          //@ts-ignore
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

export async function changeOrderStatus(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Order>> {
  const order = await prisma.order.findFirst({
    where: {
      //@ts-ignore
      id: parseInt(req.query.id),
    },
    include: {
      OrderDetail: true,
    },
  });

  const response = await prisma.orderDetail.update({
    where: {
      //@ts-ignore
      order_lexir_id: order.order_lexir_id,
    },
    data: {
      //@ts-ignore
      status: parseInt(req.query.status),
    },
  });

  res.status(200).json(response);
}

//   return res.status(200).json("response");
// } catch (error) {
//   console.error(error);
//   return res.status(500).end(error);
// }

// let orderPayment: OrderPayment = {
//   payment_method: "",
//   payment_date: "",
// };

// const order = await prisma.order.findMany({
//   orderBy: {
//     order_id: "desc",
//   },
//   take: 1,
// });

// let order_id = order[0].order_id + 1;

// req.body.orderItens = req.body.orderItens.map((item: any) => {
//   item.order_id = order_id.toString();
//   item.sku = item.sku;
//   item.qty = item.quantity.toString();
//   item.unit_price = item.price;
//   item.discount_rate = null;
//   item.price_w_discount = item.b2bprice;
//   item.vat = null;
//   item.price_w_vat = item.b2bprice;
//   item.total = (parseFloat(item.price) * parseInt(item.quantity)).toString();
//   item.gross_sales = null;
//   item.product_name = item.name;
//   delete item.video;
//   delete item.shop;
//   delete item.type;
//   delete item.digital_file;
//   delete item.subdomain;
//   delete item.id;
//   delete item.name;
//   delete item.price;
//   delete item.brand;
//   delete item.category;
//   delete item.size;
//   delete item.abv;
//   delete item.b2bprice;
//   delete item.b2cprice;
//   delete item.quantity;
//   delete item.imageSRC;
//   delete item.slug;
//   delete item.description;
//   delete item.type_id;
//   delete item.shop_id;
//   delete item.sale_price;
//   delete item.min_price;
//   delete item.max_price;
//   delete item.preview_url;
//   delete item.in_stock;
//   delete item.is_taxable;
//   delete item.shipping_class_id;
//   delete item.status;
//   delete item.product_type;
//   delete item.unit;
//   delete item.height;
//   delete item.width;
//   delete item.length;
//   delete item.author_id;
//   delete item.manufacturer_id;
//   delete item.is_digital;
//   delete item.is_external;
//   delete item.external_product_url;
//   delete item.external_product_button_text;
//   delete item.orders_count;
//   delete item.total_downloads;
//   delete item.itemTotal;
//   return item;
// });

// // Calcular total da encomenda

// // Calcular quantidade de garrafas
// let qty = await req.body.orderItens.reduce(function (
//   sum: any,
//   productItem: any
// ) {
//   return parseInt(sum) + parseInt(productItem.qty);
// },
// 0);

// let orderStatus: OrderStatus[] = [
//   {
//     id: 1,
//     name: "New",
//     color: "#0d9965",
//     isChecked: true,
//     isCurrent: true,
//   },
//   {
//     id: 2,
//     name: "Accepted",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 3,
//     name: "Awaiting Payment",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 4,
//     name: "Awaiting Fulfillment",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 5,
//     name: "Awaiting Shipment",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 6,
//     name: "Partially Shipped",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 7,
//     name: "Shipped",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 8,
//     name: "Cancelled",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 9,
//     name: "Declined",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 10,
//     name: "Refunded",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 11,
//     name: "Partially Refunded",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
//   {
//     id: 12,
//     name: "Completed",
//     color: "#0d9965",
//     isChecked: false,
//     isCurrent: false,
//   },
// ];

// let startDate =
//   (req.query.startdate && req.query.startdate.toString()) ||
//   new Date("2000-01-01");
// let endDate =
//   (req.query.enddate && req.query.enddate.toString()) ||
//   new Date("2100-01-01");

// @ts-ignore
// where: whereClause,
// let whereClause = {
//   OR: [
//     {
//       order_date: {
//         gte: new Date(startDate),
//         lt: new Date(endDate),
//       },
//       subdomain: req.query.subdomain || undefined,
//       order_id: {
//         contains: req.query.orderIdFilterOrder
//           ? undefined
//           : req.query.orderIdFilterOrder == ""
//           ? undefined
//           : req.query.orderIdFilterOrder,
//       },
//       orderCustomer: {
//         is: {
//           AND: [
//             {
//               customer_id: {
//                 contains:
//                   req.query.customerFilterOrder === ""
//                     ? undefined
//                     : req.query.customerFilterOrder,
//               },
//               customer_type: {
//                 contains:
//                   req.query.customerTypeFilterOrder === ""
//                     ? undefined
//                     : req.query.customerTypeFilterOrder,
//               },
//             },
//           ],
//         },
//       },
//     },
//   ],
// };
