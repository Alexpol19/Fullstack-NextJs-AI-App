import { currentUser } from "@clerk/nextjs"
import { prisma } from "../../utils/db"
import { redirect } from "next/navigation"

const createNewUser = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) return redirect('/sign-in')

  const match = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id
    }
  })

  if(!match) {
    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress
      }
    })
  }

  redirect('/journal')
}
const NewUser = async () => {
  await createNewUser();
  return <div>...Loading</div>
}

export default NewUser