import prisma from '~/lib/prisma'
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      throw createError({ statusCode: 400, statusMessage: 'Request body is empty or undefined' });
    }

    const { email, password } = body;

    if (!email || !password) {
      throw createError({ statusCode: 400, statusMessage: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    if (user.provider !== 'local') {
      throw createError({ statusCode: 401, statusMessage: 'User is not registered with local provider' });
    }

    if (!user.password) {
      throw createError({ statusCode: 401, statusMessage: 'User has no password set' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid password' });
    }

    const userData = { id: user.id, name: user.name, email: user.email, avatar: user.avatar, provider: user.provider }

    const session = {
      user: userData,
      loggedInAt: new Date()
    }
    await setUserSession(event, session);

    return { success: true, user: userData }
  } catch (error) {
    console.error("Error handling login request", error);
    throw createError({ statusCode: 500, statusMessage: 'Error handling login request' });
  }
})