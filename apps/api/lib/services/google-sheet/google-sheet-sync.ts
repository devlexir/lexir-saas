import prisma from "@/lib/prisma";
import moment from "moment";
import slugify from "slugify";

import type { NextApiRequest, NextApiResponse } from "next";
import type {
  Product,
  Brand,
  Customer,
  Order,
  OrderItem,
  OrderDetail,
} from ".prisma/client";

import { google } from "googleapis";

import productsJSON from "./products.json";
import { resolve } from "path";
import { rest } from "lodash";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: "lexir-admin@lexir-347206.iam.gserviceaccount.com",
    client_id: "112115875462007935930",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVyClQc4b7LmRA\ndXCHLsGxDU8i/RnP8C1GS4wLKlH0kU8BCUiypW66w0Yfiy0RgX1XxbSTZY8yySrx\nQckkiYxnrXaO0nGuGHDKhpXh0k9Af2S0/uyoWElyxgNGpORYzW3vc+HVYueVcMdZ\nBJfrL1R1/4enQ59uwRmzXBLLz1wBOA6Hiftgz0GJ+t3fFY4/V01t8FFH5r7ny37p\nHy1fbl3bdCrxk3XmgjR/dU2mPkPOKuZ2Ntc0I9wrngTH7Wj3VKLe1bNMUFfwTCPo\n7n1sv0JEyzd+7Ny0q/nDNs+YfqI2TB6tOiN0VqFbhoQdeIRDkGawqQmNXfqt7sdG\nK3LNmamFAgMBAAECggEAMWaM13yuyS3l+Dg7Ld3Z3+hHrHnoxFKHn8oW3UClChsm\n8sIatL+CSDGWK3Vdj4FI/eafjP0Hu3Bdlj0Btkn7sjyVHDlYkCaxL7esfG+9JRYb\nJzEObnNiW52SxbkWVEf6Wr5ARi9R/Qg/5JvpYC1Cevb2uanodm80WWxSIpsy80u8\n9rFK3G6F78ouF9ryK0BNVizTzZvH8W2ToA6phLdJh0RtZHnCkmP1NjK2oaljex6w\nHHHRso2cfLj9RJkuBRUPG3EKWrGnWkeDvZzY3yYlanIt1BhZ2JCA3N/QjcuCKMDT\nm/8elUaESoSloJrGkFMVDQVaqZF4ofXaJypczzaUUQKBgQDv08eR6PeZyHWuKa+z\nU2wO+AMPGQJXQgAmN/TiUB4D9r7GIFyapGQPWDKtWefbwhJoSG6PSX5wQ4lndhx5\nCw+qVJI6L/0JdI5RBOtJqHBjBRzRhMpZt/9LN3Y94Y1so+UzFZogcVbos34yIYiz\nmn2KnNDEfC/YnXQc5Vdu88lFkQKBgQDkMsBciF9SSJLZ4JzQcSDD31nHbk1kJAaA\nYFvVaMg6CWQnemV9aIpQEfvFcV6uzJrwHmRwS1DHGlDRk8Bi1jq3HwaRGzWpA7Hs\nR0sGF41T0WJztyqJswngGR9bIAvyt0hl5GqhqJTV5UowWWJiUB8uPyNIa27l0tJa\nijNiWy7atQKBgQCWxnwnXWGcywxBDHAru3yqBH5X1Y9FMHdLj85jIZ9dOplBkkLl\n7ggCJZ7moSlFXcOY0EDB0KCvD6ao5vaLmsqkeTrdXiIk+aQnh4Is8rqFZkdx6ZwV\nv7m+ngW2bcEt1fRYo3Ich2TuMzpZZf+9epkGtgQCI1kpRAQlzoGjfZzCIQKBgGuO\n6FA1DwjPoDgFwKQWzmTEX6K6gMvUlyPnRyG9s7J3PrfE3xVPMvIup8cWepRVaCoJ\niTnMphRSeQlvZNyxMRejDgtTEeXKEhDWQaxraXe6V3dHPEuPEfaIoNjor/kFHqC4\nGvJ7bTusSV2ko9THAwtfQxgdWzYEOpXmUfXoGJuJAoGAaKJYvO3jdtl4qtdIIE5c\nAFb0k27/WR3QLWwkNo9CjUvZGYOp6z7BCMLr+AwwAUWaqE3eFWABUPsfoFKFRu73\nb63QVh184uM6CrxeLHG4WKt1rSuVKIdiOAstFWUYAQA083+QO1WkhIk8shVWc5oZ\ne+EBDqAA+OHkbzagr9MGb4Q=\n-----END PRIVATE KEY-----\n".replace(
        /\\n/g,
        "\n"
      ),
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({
  auth,
  version: "v4",
});

function getStockEntries() {
  var stockEntries = <any>[];
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: "1bSb5B6BH4D0jXJGB8eeCK2G9IYwZQ6UkIUFFlaexA_E",
        range: "Stock!A:ZZ",
      },
      (err: any, result: any) => {
        if (err) {
          console.log(err);
          // Handle error
          reject(err);
        } else {
          result.data.values.forEach((p: any, index: number) => {
            if (index > 0) {
              stockEntries.push({
                date: p[0],
                sku: p[1],
                stock_in: parseInt(p[2]),
                stock_out: parseInt(p[3]),
                brand: p[4],
                product_name: p[5],
                movement_id: p[6],
                order_id: p[7],
              });
            }
          });
          resolve(stockEntries);
        }
      }
    );
  });
}

function writeStockEntry() {
  var stockEntries = <any>[];
  var date = moment().format("lll");

  return new Promise((resolve, reject) => {
    let values = [
      [date],
      // Additional rows ...
    ];
    const requestBody = {
      values,
    };
    sheets.spreadsheets.values.update(
      {
        spreadsheetId: "1bSb5B6BH4D0jXJGB8eeCK2G9IYwZQ6UkIUFFlaexA_E",
        range: "Stock!AA2:AA3",
        valueInputOption: "USER_ENTERED",
        requestBody: requestBody,
      },
      (err: any, result: any) => {
        if (err) {
          // Handle error
          reject(err);
        } else {
          resolve(stockEntries);
        }
      }
    );
  });
}

function batchUpdateStockEntry(values: any) {
  var stockEntries = <any>[];

  return new Promise((resolve, reject) => {
    const requestBody = {
      values,
    };
    sheets.spreadsheets.values.update(
      {
        spreadsheetId: "1bSb5B6BH4D0jXJGB8eeCK2G9IYwZQ6UkIUFFlaexA_E",
        range: "Stock!AA:AB",
        valueInputOption: "USER_ENTERED",
        requestBody: requestBody,
      },
      (err: any, result: any) => {
        if (err) {
          // Handle error
          reject(err);
        } else {
          resolve(stockEntries);
        }
      }
    );
  });
}

export async function syncStockEntries(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Order> | (Order | null)>> {
  let stockEntries: any = [];

  await getStockEntries().then(async (se: any) => {
    stockEntries = se;
  });

  let values: any = [
    [],
    // Additional rows ...
  ];

  let aux_product;
  let aux_products_list: any = [];

  let aux_brand;
  let aux_brands_list: any = [];

  const retrieveList = async () => {
    stockEntries = await stockEntries.map(async (entry: any) => {
      aux_product = await prisma.product.findFirst({
        where: {
          sku: entry.sku,
          name: entry.product_name,
        },
      });

      aux_products_list.push(aux_product);
    });
  };

  await retrieveList();
  await Promise.all([retrieveList]);

  stockEntries = stockEntries.map((entry: any) => {
    aux_brand = prisma.brand.findFirst({
      where: {
        brand_name: entry.brand,
      },
    });

    aux_brands_list.push(aux_brand);

    return entry;
  });

  // values.push([moment().format("MMMM Do YYYY, h:mm:ss"), aux_product?.id]);

  try {
    
    await prisma.stockEntry.deleteMany({});
    
    await prisma.stockEntry.createMany({
      data: stockEntries,
    });
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }

  await batchUpdateStockEntry(values);

  await res.status(200).json({ stockEntries: stockEntries });

  // orders = await orders.map((order: any) => {
  //   order.orderItem = orderItens.filter(
  //     (o: any) => o.order_id === order.order_id
  //   );

  //   order.orderDetail.subtotal = order.orderItem.reduce(function (
  //     sum: any,
  //     b: any
  //   ) {
  //     return sum + parseFloat(b.unit_price) * parseFloat(b.qty);
  //   },
  //   0.0);

  //   order.orderDetail.tax = order.orderItem.reduce(function (sum: any, b: any) {
  //     return (
  //       sum +
  //       parseFloat(b.price_w_discount) * parseFloat(b.qty) * parseFloat(b.vat)
  //     );
  //   }, 0.0);

  //   return order;
  // });

  // try {
  //   await prisma.order.deleteMany({});

  //   await prisma.order.createMany({
  //     data: orders,
  //   });
  // } catch (error) {
  //   res.status(500).json(error);
  //   console.error(error);
  // }

  // await res.status(200).json({ orders: orders });
}

// orderStatus: [
//   {
//     id: 1,
//     name: "Confirmed",
//     // serial: 1,
//     color: "#0d9965",
//   },
// ],

// orderItem: [],
// orderCustomer: {

// },

// orderShippingAddress: {
//   address_nickname: "General",
//   
//   shipping_address: p[13],
//   shipping_address2: p[14],
//   shipping_zip: p[15],
//   shipping_state: "",
//   shipping_country: p[16],
//   shipping_city: p[17],
// },

// orderBillingAddress: {
//   
//   billing_name: p[18] + " " + p[19],
//   billing_address: p[20],
//   billing_address2: p[21],
//   billing_phone: p[22],
//   billing_email: "",
//   billing_zip: p[23],
//   billing_state: "",
//   billing_country: p[24],
//   billing_city: p[25],
// },
// orderShipment: {},
// orderPayment: {
//   payment_method: "bank_transfer",
// },

// // Get all orders itens in Google Sheet
// await getOrderItens().then(async (o: any) => {
//   orderItens = o;
// });

// console.log(orderItens);

// // Save all orders itens in the database
// try {
//   await prisma.orderItem.deleteMany({});

//   await prisma.orderItem.createMany({
//     data: orderItens,
//   });
// } catch (error) {
//   res.status(500).json(error);
//   console.error(error);
// }

// await getOrders().then(async (o: any) => {
//   orders = o;
// });

// try {
//   await prisma.order.deleteMany({});

//   await prisma.order.createMany({
//     data: orders,
//   });
// } catch (error) {
//   res.status(500).json(error);
//   console.error(error);
// }

// await res.status(200).json({ orders: orders });
