import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const BEARER_TOKEN = `AAAAAAAAAAAAAAAAAAAAALAyRwEAAAAA0ELMOyx%2FzTH97Svx1oi59R3tJ%2Bw%3DyHCyXKRCKu9q43ZaIIyhsycmajeZBi2LQjDlPGtzIA8ibhwv1l`;

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_CONSUMER_CLIENT_ID,
      // process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CONSUMER_CLIENT_SECRET,
      // process.env.TWITTER_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
  },
  secret: process.env.SECRET,
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      console.log({ account });

      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (account?.refreshToken) {
        token.refreshToken = account.refreshToken;
      }
      if (account?.oauth_token) {
        token.oauth_token = account.oauth_token;
      }
      if (account?.oauth_token_secret) {
        token.oauth_token_secret = account.oauth_token_secret;
      }
      if (account?.results?.screen_name) {
        token.screen_name = account.results.screen_name;
      }
      return token;
    },
    async session(session, token) {
      // Add property to session, like an access_token from a provider.
      session.user.screen_name = token.screen_name;
      return session;
    },
  },
});
