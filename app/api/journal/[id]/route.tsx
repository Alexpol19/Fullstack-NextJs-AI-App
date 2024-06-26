import { NextResponse } from "next/server";
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db";
import { analyze } from "../../../../utils/ai";
import { revalidatePath } from "next/cache";

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const user = await getUserByClerkId()

  if(user) {
    await prisma.journalEntry.delete({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id,
        },
      },
    })

    revalidatePath('/journal')

    return NextResponse.json({ data: { id: params.id } })
  }

  return NextResponse.error()
}

export const PATCH = async (request: Request, { params }: {params: {id: string}}) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();

  if(user) {
    const entry = await prisma.journalEntry.update({
      where: {
        userId_id: {
          userId: user.id, 
          id: params.id
        }
      },
      data: {
        content: content
      }
    })

    const analysis = await analyze(entry);

    const entryAnalysis = await prisma.analysis.upsert({
      where: {
        entryId: entry.id,
      },
      create: {
        userId: user.id,
        entryId: entry.id,
        ...analysis
      },
      update: analysis
    })

    const entryWithAnalysis = {
      ...entry,
      analysis: entryAnalysis
    }

    return NextResponse.json({data: entryWithAnalysis})
  }

  return NextResponse.error()
}