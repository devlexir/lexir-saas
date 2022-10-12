import type { SystemUser } from ".prisma/client";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

export async function getSystemUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<SystemUser> | (SystemUser | null)>> {
  try {
    const systemUser = await prisma.systemUser.findFirst({
      select: {
        id: true,
        brand: true,
        username: true,
        email: true,
      },
      where: {
        id: parseInt(req.query.id),
      },
    });
    if (systemUser) {
      return res.status(200).json(systemUser);
    } else {
      return res
        .status(200)
        .json(`System User | This id dont exists in the database`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function getSystemUsers(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<SystemUser> | (SystemUser | null)>> {
  try {
    let systemUsers = [];

    systemUsers = await prisma.systemUser.findMany({
      select: {
        id: true,
        brand: true,
        username: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return res.status(200).json({
      data: systemUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function createSystemUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<{
  SystemUserId: string;
}>> {
  const saltRounds = 12;

  const { brand, username, email, password, confirm_password } = req.body;

  let permissions = req.body.permissions;

  if (!permissions) permissions = "admin";

  if (password !== confirm_password) {
    return res.status(500).end("Password are not the same");
  }

  const foundSystemUser = await prisma.systemUser.findFirst({
    where: {
      email: email,
    },
  });

  if (foundSystemUser)
    return res.status(200).end("This emails exists, choose another one");

  bcrypt.hash(password, saltRounds, async (error, hash) => {
    try {
      const response = await prisma.systemUser.create({
        data: {
          brand: brand || "lexir",
          username: username,
          email: email,
          password: hash,
          permissions: permissions,
        },
      });

      return res.status(201).json({
        SystemUserId: response.id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).end(error);
    }
  });
}

export async function updateSystemUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<SystemUser>> {
  const { brand, username, email } = req.body;

  try {
    const systemUser = await prisma.systemUser.update({
      select: {
        id: true,
        brand: true,
        username: true,
        email: true,
      },
      where: {
        id: parseInt(req.query.id),
      },
      data: {
        brand: brand,
        username: username,
        email: email,
      },
    });

    return res.status(200).json(systemUser);
  } catch (error) {
    console.error(error);
    return res.status(500).end(error);
  }
}

export async function deleteSystemUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> {
  try {
    await prisma.$transaction([
      prisma.systemUser.delete({
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
