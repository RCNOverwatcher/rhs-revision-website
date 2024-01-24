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

      const updateUser = await prisma.users.update({
        where: {
          userID: userID as string,
        },
        data: {
          favourites: {
            push: [fav_num],
          },
        },
      });
      res.status(201).json({
        message: "User Favourites updated successfully for user: " + updateUser.userID,
      });
    } catch (error) {
      console.error("Error inserting new favourite:", error);
      res.status(500).json({ error: "Error inserting new favourite" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
