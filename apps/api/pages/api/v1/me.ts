import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";
import { verifyAccessToken } from "@/lib/utils/token";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

function getToken(req: NextApiRequest) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  switch (req.method) {
    case HttpMethod.GET:
      const token: string | null = getToken(req);

      if (!token) {
        res.status(500).send("Unathorized");
      }

      const user: any = token && (await verifyAccessToken(token));

      return res.status(200).json({
        name: user.username,
        email: user.email,
      });

    default:
      res.setHeader("Allow", [HttpMethod.GET]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// // Extract bearer
// let extractToken = "";
// const bearerHeader = req.headers["authorization"];
// if (typeof bearerHeader !== "undefined") {
//   extractToken = bearerHeader.replace("Bearer", "");
// }

// user: user,
// is_active: 1,
// id: 3,
// email_verified_at: null,
// created_at: "2022-02-02T11:00:07.000Z",
// updated_at: "2022-02-02T11:00:07.000Z",
// shop_id: null,
// profile: {
//   id: 2,
//   avatar: null,
//   bio: "",
//   socials: null,
//   contact: "19365141641631",
//   customer_id: 3,
//   created_at: "2021-08-18T13:17:53.000000Z",
//   updated_at: "2021-08-18T13:17:53.000000Z",
// },
// permissions: [
//   {
//     id: 2,
//     name: "customer",
//     guard_name: "api",
//     created_at: "2021-06-27T04:13:00.000000Z",
//     updated_at: "2021-06-27T04:13:00.000000Z",
//     pivot: {
//       model_id: 3,
//       permission_id: 2,
//       model_type: "Marvel\\Database\\Models\\User",
//     },
//   },
// ],
// wallet: {
//   id: 1,
//   total_points: 5000,
//   points_used: 0,
//   available_points: 5000,
//   customer_id: 3,
//   created_at: "2022-03-07T04:06:17.000000Z",
//   updated_at: "2022-03-07T04:06:17.000000Z",
// },
// address: [
//   {
//     id: 1,
//     title: "Billing",
//     type: "billing",
//     default: 0,
//     address: {
//       zip: "99614",
//       city: "Kipnuk",
//       state: "AK",
//       country: "United States",
//       street_address: "2231 Kidd Avenue",
//     },
//     customer_id: 3,
//     created_at: "2021-08-18T13:18:03.000000Z",
//     updated_at: "2021-08-18T13:18:03.000000Z",
//   },
//   {
//     id: 2,
//     title: "Shipping",
//     type: "shipping",
//     default: 0,
//     address: {
//       zip: "40391",
//       city: "Winchester",
//       state: "KY",
//       country: "United States",
//       street_address: "2148  Straford Park",
//     },
//     customer_id: 3,
//     created_at: "2021-08-18T13:18:12.000000Z",
//     updated_at: "2021-08-18T13:18:12.000000Z",
//   },
// ],
// shops: [],
// managed_shop: null,
