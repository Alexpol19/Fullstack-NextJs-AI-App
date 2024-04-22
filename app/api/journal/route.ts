import { NextResponse } from "next/server";
import { getUserByClerkId } from "../../../utils/auth"
import { prisma } from "../../../utils/db";
import { revalidatePath } from "next/cache";

export const POST = async () => {
  const user = await getUserByClerkId();

  if(user) {
    const entry = await prisma.journalEntry.create({
      data: {
        user: {
          connect: {
            id: user.id
          }
        },
        content: ''
      }
    })

    await prisma.analysis.create({
      data: {
        userId: user.id,
        entryId: entry.id,
        mood: 'Neutral',
        subject: 'None',
        negative: false,
        summary: 'None',
        color: '#0101fe',
        sentimentScore: 0,
      }
    })
    
    revalidatePath('/journal')

    return NextResponse.json({data: entry})
  }

  return NextResponse.error()
}