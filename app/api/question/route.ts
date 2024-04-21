import { NextResponse } from "next/server";
import { getUserByClerkId } from "../../../utils/auth";
import { prisma } from "../../../utils/db";
import { qa } from "../../../utils/ai";

export const POST = async (request: Request) => {
  const user = await getUserByClerkId()

  const { question } = await request.json();

  if(user && question?.length) {
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id
      },
      select: {
        id: true,
        createdAt: true,
        content: true
      }
    })

    console.log('question', question)
    console.log('entries', entries)

    const answer = await qa(question, entries);

    return NextResponse.json({data: answer})
  }

  return NextResponse.error()
}