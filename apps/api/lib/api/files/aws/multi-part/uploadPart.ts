import S3 from "aws-sdk/clients/s3";

import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Brand } from ".prisma/client";

// ==========================================================================
// JPCARVALHO | 22-08-2022 | Solved ✅ | Tested ❌
// DESCRIPTION: Service to
// ==========================================================================

export async function uploadPart(
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
    const { fileName, partNumber, uploadId } = req.query;

    const keyName = `${process.env.S3_BUCKET_FOLDER_NAME}/${fileName}`;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: keyName,
      PartNumber: partNumber,
      UploadId: uploadId,
    };
    const presignedUrl = s3.getSignedUrl("uploadPart", params);
    // console.log(presignedUrl);
    res.status(200).json({ presignedUrl });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
