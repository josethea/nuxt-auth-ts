import prisma from '~/lib/prisma'
import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {

  const params = getQuery(event);
  const userId = params.userId;

  const days = await prisma.day.findMany({
    where: {
      userId: Number(userId)
    }
  });
  return {
    message: 'Days fetched successfully',
    data: days
  }
})