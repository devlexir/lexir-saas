import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Order } from ".prisma/client";

import { sheets } from "@/lib/api/google-sheet/auth";
import { analytics } from "googleapis/build/src/apis/analytics";

import { getOrderItens } from "@/lib/api/google-sheet/sync-data/orders/order-items";

const sheetInfo = {
  spreadsheetId: "1bSb5B6BH4D0jXJGB8eeCK2G9IYwZQ6UkIUFFlaexA_E",
  range: "Orders!A:ZZ",
};
function getOrders() {
  var orders = <any>[];
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: sheetInfo.spreadsheetId,
        range: sheetInfo.range,
      },
      (err: any, result: any) => {
        if (err) {
          // Handle error
          reject(err);
        } else {
          result.data.values.forEach((p: any, index: number) => {
            if (index > 0) {
              orders.push({
                subdomain: "global",
                order_lexir_id: p[0],
                order_date: new Date(p[1]),
                total: parseFloat(p[2]),
                qty: parseInt(p[3]),
                orderCustomerID: parseInt(p[6]),
                customer: {
                  customer_id: parseInt(p[6]),
                  customer_type: p[7],
                  account_name: p[8],
                  first_name: p[9],
                  last_name: p[10],
                  email: p[11],
                  phone_number: p[12],
                  city: p[17],
                },
                shippingAddress: {
                  customer_id: parseInt(p[6]),
                  address_nickname: "system-migration",
                  shipping_address: p[13],
                  shipping_address2: p[14],
                  shipping_zip: p[15],
                  shipping_state: "",
                  shipping_country: p[16],
                  shipping_city: p[17],
                },
                billingAddress: {
                  customer_id: parseInt(p[6]),
                  billing_name: p[18],
                  billing_address: p[20],
                  billing_address2: p[21],
                  billing_phone: p[22],
                  billing_email: "",
                  billing_zip: p[23],
                  billing_state: "",
                  billing_country: p[24],
                  billing_city: p[25],
                },
              });
            }
          });
          resolve(orders);
        }
      }
    );
  });
}

export async function syncOrders(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Order> | (Order | null)>> {
  await prisma.order.deleteMany({});
  await prisma.orderCustomer.deleteMany({});
  await prisma.orderDetail.deleteMany({});
  await prisma.orderShippingAddress.deleteMany({});
  await prisma.orderBillingAddress.deleteMany({});
  // await prisma.orderStatus.deleteMany({});

  let orders: any;
  let orderCustomers: any;
  let orderDetails: any;
  // let orderStatus: any;
  let orderItens: any;
  let orderShippingAddress: any;
  let orderBillingAddress: any;

  await getOrders()
    .then(async (o: any) => {
      return o;
    })
    .then(async (data: any) => {
      orders = data.map((order: any) => {
        return {
          subdomain: order.subdomain,
          order_lexir_id: order.order_lexir_id,
          order_date: order.order_date,
          order_lexir_id_order_customer: order.order_lexir_id,
          order_lexir_id_order_detail: order.order_lexir_id,
          order_lexir_id_order_shipping_address: order.order_lexir_id,
          order_lexir_id_order_billing_address: order.order_lexir_id,
          // order_lexir_id_order_status: order.order_lexir_id,
        };
      });
      return { orders: orders, data: data };
    })
    .then(async (returnedData: any) => {
      let data = returnedData.data;
      orderCustomers = await data.map((order: any) => {
        return {
          order_lexir_id: order.order_lexir_id,
          customer_id: order.customer.customer_id,
          customer_type: order.customer.customer_type,
          account_name: order.customer.account_name,
          first_name: order.customer.first_name,
          last_name: order.customer.last_name,
          email: order.customer.email,
          phone_number: order.customer.phone_number,
          city: order.customer.city,
        };
      });
      return { orders: orders, orderCustomers: orderCustomers, data: data };
    })
    .then(async (returnedData: any) => {
      let data = returnedData.data;
      orderDetails = await data.map((order: any) => {
        return {
          order_lexir_id: order.order_lexir_id,
          order_date: order.order_date,
          subtotal: 0,
          vat: 0,
          total: order.total,
          qty: order.qty,
          status: 5,
        };
      });
      return {
        orders: orders,
        orderCustomers: orderCustomers,
        orderDetails: orderDetails,
        data: data,
      };
    })
    .then(async (returnedData: any) => {
      let data = returnedData.data;
      // orderStatus = await data.map((order: any) => {
      //   return {
      //     order_lexir_id: order.order_lexir_id,
      //     name: "New",
      //     color: "#F1F1F1",
      //     status: 0,
      //   };
      // });
      return {
        orders: orders,
        orderCustomers: orderCustomers,
        orderDetails: orderDetails,
        // orderStatus: orderStatus,
        data: data,
      };
    })
    .then(async (returnedData: any) => {
      let data = returnedData.data;
      orderShippingAddress = await data.map((order: any) => {
        return {
          order_lexir_id: order.order_lexir_id,
          customer_id: order.shippingAddress.customer_id,
          address_nickname: order.shippingAddress.address_nickname,
          shipping_address: order.shippingAddress.shipping_address,
          shipping_address2: order.shippingAddress.shipping_address2,
          shipping_zip: order.shippingAddress.shipping_zip,
          shipping_state: order.shippingAddress.shipping_state,
          shipping_country: order.shippingAddress.shipping_country,
          shipping_city: order.shippingAddress.shipping_city,
        };
      });
      return {
        orders: orders,
        orderCustomers: orderCustomers,
        orderDetails: orderDetails,
        // orderStatus: orderStatus,
        orderShippingAddress: orderShippingAddress,
        data: data,
      };
    })
    .then(async (returnedData: any) => {
      let data = returnedData.data;
      orderBillingAddress = await data.map((order: any) => {
        return {
          order_lexir_id: order.order_lexir_id,
          customer_id: order.billingAddress.customer_id,
          billing_name: order.billingAddress.billing_name,
          billing_phone: order.billingAddress.billing_phone,
          billing_email: order.billingAddress.billing_email,
          billing_zip: order.billingAddress.billing_zip,
          billing_state: order.billingAddress.billing_state,
          billing_country: order.billingAddress.billing_country,
          billing_city: order.billingAddress.billing_city,
          billing_address: order.billingAddress.billing_address,
          billing_address2: order.billingAddress.billing_address2,
        };
      });
      return {
        orders: orders,
        orderCustomers: orderCustomers,
        orderDetails: orderDetails,
        // orderStatus: orderStatus,
        orderShippingAddress: orderShippingAddress,
        orderBillingAddress: orderBillingAddress,
        data: data,
      };
    })
    .then(async (returnedData: any) => {
      const createManyOrders = await prisma.order.createMany({
        data: returnedData.orders,
      });
      return returnedData;
    })
    .then(async (returnedData: any) => {
      const createManyOrderCustomers = await prisma.orderCustomer.createMany({
        data: returnedData.orderCustomers,
      });
      return returnedData;
    })
    .then(async (returnedData: any) => {
      const createManyOrderDetails = await prisma.orderDetail.createMany({
        data: returnedData.orderDetails,
      });
      return returnedData;
    })
    .then(async (returnedData: any) => {
      // const createManyOrderStatus = await prisma.orderStatus.createMany({
      //   data: returnedData.orderStatus,
      // });
      return returnedData;
    })
    .then(async (returnedData: any) => {
      const createManyOrderShippingAddresses =
        await prisma.orderShippingAddress.createMany({
          data: returnedData.orderShippingAddress,
        });
      return returnedData;
    })
    .then(async (returnedData: any) => {
      const createManyOrderBillingAddresses =
        await prisma.orderBillingAddress.createMany({
          data: returnedData.orderBillingAddress,
        });
      return returnedData;
    })
    .then(async (returnedData: any) => {
      let uniqueShippingAddresses = returnedData.orderShippingAddress.filter(
        (v: any, i: any, a: any) =>
          a.findIndex((v2: any) =>
            ["shipping_address", "shipping_address2"].every(
              (k) => v2[k] === v[k]
            )
          ) === i
      );

      uniqueShippingAddresses = uniqueShippingAddresses.map(function (v: any) {
        delete v.order_lexir_id;
        return v;
      });

      await prisma.shippingAddress.createMany({
        data: uniqueShippingAddresses,
      });

      let uniqueBillingAddresses = returnedData.orderBillingAddress.filter(
        (v: any, i: any, a: any) =>
          a.findIndex((v2: any) =>
            ["billing_address", "billing_address2"].every((k) => v2[k] === v[k])
          ) === i
      );

      uniqueBillingAddresses = uniqueBillingAddresses.map(function (v: any) {
        delete v.order_lexir_id;
        return v;
      });

      await prisma.billingAddress.createMany({
        data: uniqueBillingAddresses,
      });

      // Get all orders itens in Google Sheet
      await getOrderItens().then(async (o: any) => {
        orderItens = o;
      });

      try {
        await prisma.orderItem.deleteMany({});

        await prisma.orderItem.createMany({
          data: orderItens,
        });
      } catch (error) {
        res.status(500).json(error);
        console.error(error);
      }

      return {
        ...returnedData,
        orderItems: orderItens,
      };
    })
    .then(async (returnedData: any) => {
      returnedData.orderDetails = returnedData.orderDetails.map(
        (orderDetail: any) => {
          return {
            ...orderDetail,
            total: returnedData.orderItems
              .filter((row: any) => row.order_id === orderDetail.order_lexir_id)
              .reduce(function (sum: any, b: any) {
                return sum + b.total;
              }, 0),
            subtotal: returnedData.orderItems
              .filter((row: any) => row.order_id === orderDetail.order_lexir_id)
              .reduce(function (sum: any, b: any) {
                return sum + b.qty * b.unit_price;
              }, 0),
            vat: returnedData.orderItems
              .filter((row: any) => row.order_id === orderDetail.order_lexir_id)
              .reduce(function (sum: any, b: any) {
                return sum + b.qty * b.unit_price * b.vat;
              }, 0),
            qty: returnedData.orderItems
              .filter((row: any) => row.order_id === orderDetail.order_lexir_id)
              .reduce(function (sum: any, b: any) {
                return sum + b.qty;
              }, 0),
          };
        }
      );
      return {
        ...returnedData,
      };
    })
    .then(async (returnedData: any) => {
      returnedData.orderDetails.forEach((o: any) => {
        prisma.$transaction([
          prisma.orderDetail.update({
            where: {
              order_lexir_id: o.order_lexir_id,
            },
            data: {
              total: o.total,
              subtotal: o.subtotal,
              qty: o.qty,
              vat: o.qty,
            },
          }),
        ]);
      });
      return returnedData;
    })
    .then(async (returnedData: any) => {
      return res.status(201).json({
        returnedData: returnedData,
      });
    });
}
