# azure_vue_auth
This is an example Vue app that uses Azure B2C for user Authentication.

# Background
Building on the example from Sergey Migalnikov [Using Vuejs with Azure Active Directory B2C](https://www.sergeydotnet.com/vuejs-with-azure-ad-b2c/) I have created this example project that leverages the Vuex store instead of adding it directly to the Vue app through a prototype.  Additionally the [active-directory-b2c-javascript-msal-singlepageapp](https://github.com/Azure-Samples/active-directory-b2c-javascript-msal-singlepageapp/blob/master/index.html) project from @github/Azure-Samples was also a big help in getting this to work.
This is a fork from https://github.com/DSchmidlin/azure_vue_auth.

# Setup

To connect this example to your AD B2C, you only need to create a .env file and to fill it up.

```bash
cp .env.template .env
```

Files you need to focus:
- AuthStore.js : Define mutations and actions for Vuex user object
- AuthService.js : Decalre msal library and instanciate AuhService constructor
- .env : All variables to create a link with AD B2C and your app

# Usefull documentation

- [Ocean Blue template](https://github.com/Azure-Samples/Azure-AD-B2C-page-templates/tree/master/ocean_blue)
- [Add JavaScript fonctions](https://docs.microsoft.com/fr-fr/azure/active-directory-b2c/javascript-samples)
