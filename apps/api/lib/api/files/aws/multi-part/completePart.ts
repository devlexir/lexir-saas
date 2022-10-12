import type { Brand } from ".prisma/client";
import prisma from "@/lib/prisma";
import S3 from "aws-sdk/clients/s3";
import type { NextApiRequest, NextApiResponse } from "next";

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ❌
// DESCRIPTION: Service to
// ==========================================================================

export async function completePart(
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
    const { fileName, UploadId, parts } = req.body;
    const keyName = `${process.env.S3_BUCKET_FOLDER_NAME}/${fileName}`;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: keyName,
      UploadId: UploadId,
      MultipartUpload: {
        Parts: parts,
      },
    };

    const data = await s3.completeMultipartUpload(params).promise();

    const newFile = {
      name: data?.Key,
      url: await s3.getSignedUrl("getObject", {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: data?.Key,
      }),
    };

    res.status(200).json({ filename: newFile.name, url: newFile.url });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
