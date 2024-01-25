import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "~/lib/prisma";
interface Data {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: {
      email_address: string;
    }[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { data } = req.body as Data;

    let teacher = false;

    if (
      data.email_addresses &&
      data.email_addresses.length > 0 &&
      data.email_addresses[0] &&
      data.email_addresses[0].email_address.endsWith("@richardhale.co.uk")
    ) {
      teacher = true;
    }

    try {
      const newUser = await prisma.users.create({
        data: {
          userID: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email_addresses?.[0]
            ? data.email_addresses[0].email_address
            : "",
          is_teacher: teacher,
        },
      });

      res.status(201).json({
        message: "User created successfully",
        userID: newUser.userID,
      });
    } catch (error) {
      console.error("Error inserting user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
