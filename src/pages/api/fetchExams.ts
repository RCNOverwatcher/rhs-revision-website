import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";
import type { exams } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            const exams: exams[] = await prisma.exams.findMany();
            res.status(200).json(exams);
        } catch (error) {
            console.error("Error fetching exams:", error);
            res.status(500).json({ error: "Error fetching exams" });
        }
    }
}
