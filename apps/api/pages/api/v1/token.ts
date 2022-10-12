import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";

import { slugifyBrand } from "@/lib/utils/slugify";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["POST", "OPTIONS"],
  })
);

import { HttpMethod } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

import * as bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "@/lib/utils/token";

import prisma from "@/lib/prisma";

export default async function token(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  switch (req.method) {
    case HttpMethod.POST:
      let refreshToken, accessToken;
      var permissions: any = [];
      const { email, password, subdomain } = req.body;

      // Get the user using the email provided
      const user = await prisma.systemUser
        .findFirst({
          where: {
            email: email,
          },
        })
        .then(async (user: any) => {
          return user;
        });

      console.log(user);

      // Only if the user it's not a super_admin we need to verify the subdomain
      // if it's super_admin, that user has access for all brands and all system
      if (user?.permissions !== "super_admin") {
        // The user can access only if it's authorized for this subdomain
        if (slugifyBrand(user?.brand) !== subdomain) {
          console.log(subdomain);
          return res.status(400).json("Bad Request");
        }
      }

      // Validate the password
      let isValidated = await bcrypt.compare(password, user?.password);

      console.log(isValidated);

      // If its different, return Unauthorized
      if (!isValidated) {
        console.log("Unauthorized");
        return res.status(401).json("Unauthorized");
      }

      // Set permissions
      permissions.push(user?.permissions);

      // Get a new Refresh Token
      refreshToken = createRefreshToken({
        permissions: permissions,
        username: user?.username,
        email: user?.email,
      });

      // Get a new Access Token
      accessToken = createAccessToken({
        permissions: permissions,
        username: user?.username,
        email: user?.email,
      });

      // return the accessToken and permissions
      return res.status(200).json({
        token: accessToken,
        permissions: permissions,
      });
    default:
      res.setHeader("Allow", [HttpMethod.POST]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
