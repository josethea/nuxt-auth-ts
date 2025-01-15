import registerUser from '~/server/api/utils/register';
import { H3Event } from 'h3';

interface GitHubUser {
  name: string;
  email: string;
  avatar_url: string;
}

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event: H3Event, { user }: { user: GitHubUser }) {
    const userData = {
      name: user.name,
      email: user.email,
      provider: 'github',
      avatar: user.avatar_url
    }
    await registerUser(event, userData);
    return sendRedirect(event, '/');
  },
  onError(event: H3Event, error: Error) {
    console.error('error', error);
    return sendRedirect(event, '/');
  }
})