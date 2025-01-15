import registerUser from '~/server/api/utils/register';
import { H3Event } from 'h3';

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

export default defineOAuthGoogleEventHandler({
  config: {
    authorizationParams: {
      access_type: 'offline',
    }
  },
  async onSuccess(event: H3Event, { user }: { user: GoogleUser }) {
    const userData = {
      name: user.name,
      email: user.email,
      provider: 'google',
      avatar: user.picture
    }
    await registerUser(event, userData);
    return sendRedirect(event, '/google-success');     
  },
  onError(event: H3Event, error: Error) {
    console.error('error', error);
    return sendRedirect(event, '/login');
  }
})