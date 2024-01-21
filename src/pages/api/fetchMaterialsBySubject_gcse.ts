import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { subject } = req.query;

    try {
      const materials = await prisma.materials.findMany({
        where: {
          subject: subject as string,
          level_of_study: "GCSE",
        },
      });
      res.status(200).json(materials);
    } catch (error) {
      console.error("Error fetching materials:", error);
      res.status(500).json({ error: "Error fetching materials" });
    }
  }
}
