import { HttpMethod } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPlaiceholder } from "plaiceholder";

export default async function blurhash(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== HttpMethod.GET) {
    res.setHeader("Allow", [HttpMethod.GET]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { url } = req.query;

  if (Array.isArray(url))
    return res
      .status(400)
      .end("Bad request. URL parameter cannot be an array of urls.");

  try {
    //@ts-ignore
    const { blurhash } = await getPlaiceholder(url);

    res.status(200).json(blurhash);
  } catch (error) {
    console.error(error);
    res.status(500).end(error);
  }
}
