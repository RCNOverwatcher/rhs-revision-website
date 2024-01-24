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
      const updateUser = await prisma.users.update({
        where: {
          userID: requestBody.userID,
        },
        data: {
          favourites: {
            push: [requestBody.favourite],
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
