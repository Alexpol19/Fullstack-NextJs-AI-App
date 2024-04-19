import { NextResponse } from "next/server";
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db";
import { revalidatePath } from "next/cache";

export const PATCH = async (request: Request, { params }: {params: {id: string}}) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();

  if(user) {
    const updatedEntry = await prisma.journalEntry.update({
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
    
    return NextResponse.json({data: updatedEntry})
  }

  return NextResponse.error()
}