import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";
import type { materials } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const materials:materials[] = await prisma.materials.findMany();
      res.status(200).json(materials);
    } catch (error) {
      console.error("Error fetching materials:", error);
      res.status(500).json({ error: "Error fetching materials" });
    }
  }
}
