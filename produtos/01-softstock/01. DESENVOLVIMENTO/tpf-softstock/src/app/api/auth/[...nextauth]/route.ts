import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
export interface AzureADProviderOptions {
    clientId: string
    clientSecret: string
    tenantId: string
}
interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
    expiresIn?: number;
    extExpiresIn?: number;
    tokenType?: string;
  };
}


const handler = NextAuth({
  providers: [
      AzureAD({
        clientId: process.env.AZURE_AD_CLIENT_ID,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
        tenantId: process.env.AZURE_AD_TENANT_ID,
        scope: 'User.Impersonation User.Read',
    } as AzureADProviderOptions),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
        token.expiresIn = account.expires_in;
        token.extExpiresIn = account.ext_expires_in;
        token.tokenType = account.token_type;
      }
      return token;
    },
    async session({ session, token, user }) {
      const newSession = { ...session, user: { ...session.user, ...token } };
      return newSession;
    },
  }
})



export { handler as GET, handler as POST }

