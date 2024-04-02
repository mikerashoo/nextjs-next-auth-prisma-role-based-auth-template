import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  if (req.method === 'POST') {
    const { fullName, email, phoneNumber, password } = req.body;

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }

      // Check if email or phoneNumber is already taken
      const phoneNumberTaken = await prisma.user.findFirst({
        where: {
          OR: [ 
            { phoneNumber }
          ],
        },
      });
      if (phoneNumberTaken) {
        return res.status(400).json({ error: "Phone Number already taken." });
      }

    // Check if email or phoneNumber is already taken
    const emailExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email }, 
        ],
      },
    });
    if (emailExists) {
      return res.status(400).json({ error: "Email already taken." });
    }

   

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const user = await prisma.user.create({
        data: {
          fullName,
          email,   // This can be null
          phoneNumber,
          password: hashedPassword,
          role: 'USER',
        },
      });
      res.status(200).json({ user });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Handle known errors here, for example:
        // if (error.code === 'P2002') {
        //   return res.status(400).json({ error: "There is a unique constraint violation..." });
        // }
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "User creation failed" });
      }
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
