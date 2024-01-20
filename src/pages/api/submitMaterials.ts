import { type materials } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const requestBody: materials = req.body as materials;
      await prisma.materials.create({
        data: {
          title: requestBody.title,
          description: requestBody.description,
          subject: requestBody.subject,
          url: requestBody.url,
          level_of_study: requestBody.level_of_study,
          file_key: requestBody.file_key,
          file_url: requestBody.file_url,
          date_uploaded: requestBody.date_uploaded,
        } as materials,
      });
      res.status(201).json({
        message: "Material created successfully",
      });
    } catch (error) {
      console.error("Error inserting material:", error);
      res.status(500).json({ error: "Error creating material" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
