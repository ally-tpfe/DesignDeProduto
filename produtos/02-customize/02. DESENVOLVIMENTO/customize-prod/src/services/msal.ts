import * as msal from '@azure/msal-browser'

export const msalConfig = {
  auth: {
    clientId: '6472e068-d031-4ea1-9c49-31f52892c3aa',
    authority: `https://login.microsoftonline.com/d03a092d-855e-4f2f-a6cd-0b028555a00f`,
    redirectUri: 'https://dev-design.vercel.app/start',
    scopes: ['User.Read', 'User.ReadWrite.All'],
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}

// https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/authorize

const msalInstance = new msal.PublicClientApplication(msalConfig)

export { msalInstance }
