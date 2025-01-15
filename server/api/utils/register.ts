import bcrypt from 'bcrypt';
import prisma from '~/lib/prisma';
import { H3Event } from 'h3';

export default async function registerUser(event: H3Event, body: any) {
  const { email, password, name, provider = 'local', avatar } = body;

    if (provider === 'local') {
      if (!email || !password || !name) {
        throw createError({ statusCode: 400, statusMessage: 'Email, password, and name are required' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      
      try {
  
        const existingUser = await prisma.user.findUnique({ where: { email } });
  
        if (existingUser) {
          throw createError({ statusCode: 404, statusMessage: 'User already registered' });
        }
        
        const user = await prisma.user.create({ data: { email, password: hashedPassword, name, provider, avatar: avatar ?? '' } })
  
        const userData = { id: user.id, name: user.name, email: user.email, avatar: user.avatar, provider: user.provider }
        

        const session = {
          user: userData,
          loggedInAt: new Date()
        }
        await setUserSession(event, session);
        return { success: true, user: userData }
      } catch (error) {
        console.error("Error creating user", error);
        throw createError({ statusCode: 500, statusMessage: 'Error creating user' });
      }
    } else {
      if (!email) {
        throw createError({ statusCode: 400, statusMessage: 'Email is not defined in the account provider' });
      }
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({ data: { email, password: '', name, provider, avatar } });
      }

      const userData = { id: user.id, name: user.name, email: user.email, avatar: user.avatar, provider: user.provider }

      const session = {
        user: userData,
        loggedInAt: new Date()
      }
      await setUserSession(event, session);
      return { success: true, user: userData }
    }
}