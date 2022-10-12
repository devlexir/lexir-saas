import { Console } from "console";
import jwt, { JwtPayload } from "jsonwebtoken";
import _ from "lodash";
const accessTokenSecret = "secret";
const refreshTokenSecret = "supersecret";

import type { NextApiRequest, NextApiResponse } from "next";

export interface Token {
  username: string;
  permissions: string[];
  email: string;
}

export const createAccessToken = (payload: Token): string => {
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: "24h",
  });
  return accessToken;
};

export const verifyAccessToken = async (accessToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, accessTokenSecret, (err, decoded) => {
      if (!_.isEmpty(err)) reject(err);
      resolve(decoded);
    });
  });
};

export const createRefreshToken = (payload: Token): string => {
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "30d",
  });
  return refreshToken;
};

export const verifyRefreshToken = async (
  refreshToken: string
): Promise<JwtPayload | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, refreshTokenSecret, (err, decoded: any) => {
      if (!_.isEmpty(err)) reject(err);

      resolve(decoded);
    });
  });
};

export const getToken = (req: NextApiRequest): string | null => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

export const callTokenValidate = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | undefined> => {
  const authorization = await getToken(req);

  if (authorization) {
    await verifyAccessToken(authorization)
      .then((teste: any) => {
        // console.log("TESTE");
        // console.log(teste);
      })
      .catch((err: any) => {
        console.log("ERROR");
        console.log(err);
        return res.status(401).end();
      });
  } else {
    return res.status(401).end();
  }
};
