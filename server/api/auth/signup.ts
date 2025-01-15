import registerUser from '~/server/api/utils/register';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event);
    if (!body) {
      throw createError({ statusCode: 400, statusMessage: 'Request body is empty or undefined' });
    }
    return await registerUser(event, body);
  } catch (error) {
    console.error("Error handling singup request", error);
    throw createError({ statusCode: 500, statusMessage: 'Error handling singup request' });
  }
});