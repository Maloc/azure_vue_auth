import * as Msal from 'msal';

export default class AuthService {
  constructor(clientid, authority, scopes) {
    this.app = new Msal.UserAgentApplication(
      {
        auth: {
          clientId: clientid,
          authority,
          validateAuthority: false,
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: true,
        },
      },
    );

    this.scopes = scopes;
  }

  async login() {
    const loginRequest = {
      scopes: this.scopes,
      prompt: 'select_account',
    };

    // const accessTokenRequest = {
    //   scopes: this.scopes,
    // };

    try {
      this.app.authority = process.env.VUE_APP_AUTHORITY;
      const loginResponse = await this.app.loginPopup(loginRequest);
      console.log(`Login was a success ${loginResponse}`);
    } catch (error) {
      console.log(`Login error ${error}`);
      if (error instanceof Msal.ServerError) {
        console.log(`Error code: ${error.errorMessage.split(':')[0]}`);
        await this.resetPassword();
      }
      return undefined;
    }

    // try {
    //   const tokenResponse = await this.app.acquireTokenSilent(accessTokenRequest);
    //   console.log(`Token response acquired silently - ${tokenResponse}`);
    // } catch (error) {
    //   console.log(`Failed to acquire the token silently, using a pop up -- ${error}`);

    //   try {
    //     const tokenResponse = await this.app.acquireTokenPopup(accessTokenRequest);
    //     console.log(`Token response acquired with a pop up - ${tokenResponse}`);
    //   } catch (errorPopup) {
    //     console.log(`Error acquiring the popup: ${errorPopup}`);
    //     return undefined;
    //   }
    // }

    return this.getUser();
  }

  async resetPassword() {
    this.app.authority = process.env.VUE_APP_RESET_AUTHORITY;
    const loginRequest = {
      scopes: this.scopes,
      prompt: 'select_account',
    };
    try {
      const loginResponse = await this.app.loginPopup(loginRequest);
      console.log(`Login was a success ${loginResponse}`);
    } catch (err) {
      console.log(`Password reset error ${err}`);
    }
  }

  logout() {
    this.app.logout();
  }

  getUser() {
    return this.app.getAccount();
  }
}
