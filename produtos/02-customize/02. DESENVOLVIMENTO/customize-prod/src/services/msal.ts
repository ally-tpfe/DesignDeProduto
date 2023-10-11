import * as msal from '@azure/msal-browser'

export const msalConfig = {
  auth: {
    clientId: process.env.AZURE_AD_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${
      process.env.AZURE_AD_TENANT_ID || ''
    }`,
    redirectUri: 'https://customize.tpfe.com.br',
    scopes: ['User.Read', 'User.ReadWrite.All'],
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}

const msalInstance = new msal.PublicClientApplication(msalConfig)

export { msalInstance }
