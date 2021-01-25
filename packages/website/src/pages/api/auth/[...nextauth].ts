import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import querystring from 'querystring';

const options: InitOptions = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      /**
       * The credentials option is not used but
       * definition is required
       */
      credentials: {},
      authorize: async (credentials) => {
        let user = null;
        /**
         * -- TODO --
         * This is just a temporary solution during development
         * and should be removed in production!
         */
        if (
          credentials['password'] === process.env.TMP_PWD &&
          credentials['username'] === process.env.TMP_USER
        ) {
          user = {
            id: 1,
            name: 'Gruppettoruhr',
          };
        }
        if (user) {
          return Promise.resolve(user);
        } else {
          const path = querystring.stringify({
            error: true,
          });
          return Promise.reject(`/login?${path}`);
        }
      },
    }),
  ],
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => NextAuth(req, res, options);
