import type { Brand } from ".prisma/client";
import prisma from "@/lib/prisma";
import S3 from "aws-sdk/clients/s3";
import type { NextApiRequest, NextApiResponse } from "next";

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ❌
// DESCRIPTION: Service to
// ==========================================================================

export async function createPart(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<Array<Brand> | (Brand | null)>> {
  const s3 = new S3({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    signatureVersion: "v4",
  });

  try {
    let { name, type } = req.body;
    const keyName = `${process.env.S3_BUCKET_FOLDER_NAME}/${name}`;

    let multipartCreateResult = await s3
      .createMultipartUpload({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: keyName,
        ACL: "public-read",
        ContentType: type,
        StorageClass: "STANDARD",
      })
      .promise();
    // console.log(multipartCreateResult);
    res.status(200).json({ multipartCreateResult });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
