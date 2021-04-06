import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import querystring from 'querystring';

const options: NextAuthOptions = {
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
        /**
         * -- TODO --
         * Changes this logic once we decided how we want to handle member
         * data and if we even need to. For now the functionality is secure
         * enough as we don't store and need to hide any sensitive data.
         */
        const usernameMatches =
          credentials['username'] === process.env.TMP_USER;
        const passwordMatches =
          credentials['password'] === process.env.TMP_PASSWORD;

        console.log(
          credentials,
          credentials['password'],
          process.env.TMP_PASSWORD
        );
        if (usernameMatches && passwordMatches) {
          return Promise.resolve({
            id: 1,
            name: 'Gruppettoruhr',
          });
        }
        const path = querystring.stringify({
          error: true,
        });
        /**
         * -- TODO --
         * Also add the previous location path if there is one
         * to the query string
         */
        return Promise.reject(`/login?${path}`);
      },
    }),
  ],
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => NextAuth(req, res, options);
