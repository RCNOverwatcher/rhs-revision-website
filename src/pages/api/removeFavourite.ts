import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "~/lib/prisma";

type Data = {
  userID: string;
  favourite: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const requestBody: Data = req.body as Data;
      const currentFavourites = await prisma.users.findUnique({
        where: {
          userID: requestBody.userID,
        },
      });
      if (!currentFavourites) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const newFavourites = currentFavourites.favourites.filter(
        (item) => item !== requestBody.favourite,
      );
      await prisma.users.update({
        where: {
          userID: requestBody.userID,
        },
        data: {
          favourites: newFavourites,
        },
      });
      res.status(201).json({
        message: "User Favourites updated successfully",
      });
    } catch (error) {
      console.error("Error inserting new favourite:", error);
      res.status(500).json({ error: "Error removing favourite" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
