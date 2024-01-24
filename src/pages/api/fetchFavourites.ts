import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";
import type { users } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { userID } = req.query;

    try {
      const user: users | null = await prisma.users.findUnique({
        where: {
          userID: userID as string,
        }
      });
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user.favourites);
    } catch (error) {
      console.error("Error fetching materials:", error);
      res.status(500).json({ error: "Error fetching materials" });
    }
  }
}
