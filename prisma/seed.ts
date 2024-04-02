
import bcrypt from "bcrypt"; 
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const superadminEmail = "mkbirhanu@gmail.com";
  const superadminPassword = "11221122";
  const superadminFullName = "Mikiyas Birhanu";
  const superadminLastName = "Birhanu";
  const superadminPhoneNumber = "0923213768";
   
async function main() {
  console.log(`Start seeding ...`)
  const password = await bcrypt.hash(superadminPassword, 10);
  
    const user = await prisma.user.create({
      data: {
        fullName: superadminFullName, 
        phoneNumber: superadminPhoneNumber,
        email: superadminEmail,
        password: password,
        role: "SUPER_ADMIN",
      },
    })
    console.log(`Created user with id: ${user.id}`)
   
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 