import * as msal from '@azure/msal-browser'

export const msalConfig = {
  auth: {
    clientId: '6472e068-d031-4ea1-9c49-31f52892c3aa',
    authority: `https://login.microsoftonline.com/d03a092d-855e-4f2f-a6cd-0b028555a00f`,
    redirectUri: 'https://localhost:3000/start',
    scopes: ['User.Read', 'User.ReadWrite.All'],
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}

const msalInstance = new msal.PublicClientApplication(msalConfig)

export { msalInstance }
