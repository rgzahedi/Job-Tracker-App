import { clerkClient } from '@clerk/clerk-sdk-node';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(process.env.CLERK_SECRET_KEY)

  if (!authHeader) {
    console.log('No Authorization header');
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '').trim();
  console.log('Received token:', token);

  try {
    const session = await clerkClient.sessions.verifySession(token);
    console.log('Session verified:', session.userId);
    req.userId = session.userId;
    next();
  } catch (err) {
    console.error('Invalid or expired token:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};