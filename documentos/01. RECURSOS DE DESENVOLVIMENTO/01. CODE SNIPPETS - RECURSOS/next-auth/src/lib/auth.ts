import { NextAuthOptions } from "next-auth";

import AzureADProvider from "next-auth/providers/azure-ad";

interface AuthProps {
    clientId: string;
    clientSecret: string;
    tenantId: string;
}

export const authConfig: NextAuthOptions = {
    providers: [
        AzureADProvider({
          clientId: process.env.AZURE_AD_CLIENT_ID,
          clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
          tenantId: process.env.AZURE_AD_TENANT_ID,
          scope: 'openid profile email offline_access',
        } as AuthProps),
      ]
}