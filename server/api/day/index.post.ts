import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {

  const body = await readBody(event);
  console.log('post days', body);

  return {
    message: 'Day created successfully',
    data: body
  }
})