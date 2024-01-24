import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "~/lib/prisma";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {

      const { userID, favourite } = req.query;

      const fav_num = parseInt(favourite as string, 10);

      const currentFavourites = await prisma.users.findUnique({
        where: {
          userID: userID as string,
        },
      });
      if (!currentFavourites) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const newFavourites = currentFavourites.favourites.filter(
        (item) => item !== fav_num,
      );
      await prisma.users.update({
        where: {
          userID: userID as string,
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
