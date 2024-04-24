```bash
nx g @nx/next:app merchant-portal
nx serve merchant-portal
yarn add next-auth
add api/auth/[...nextauth].ts endpoint - inspo from https://next-drupal.org/docs/authentication/password-grant
add import { SessionProvider } from "next-auth/react" to _app.tsx, and wrap components in SessionProvider
process.env.NEXTAUTH_URL = 'http://localhost:4200'; in nextauth.ts needed to set the form urls for the default sign-in page
yarn add node-fetch
yarn add jwt-decode
add callbacks to  [...nextauth].ts
add import { useSession, signIn, signOut } from 'next-auth/react'; to index.tsx
add signIn and signOut buttons to index.tsx
create types/next-auth.d.ts - enhance types
update [...nextauth].ts to support refreshingTokens - https://authjs.dev/guides/basics/refresh-token-rotation#client-side
add middleware.ts to protect site pages that are not authenticated
add env.local to add variables
Add Chakra Support
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
yarn add react-icons
yarn add @chakra-ui/pro-theme
add theme.ts file
updated index.tsx and _app.tsx with chakra stuff

moved files and folders under /src folder (I like ths stucture better)
created components dir
Added login components Logo, PasswordField - from https://pro.chakra-ui.com/components/application/authentication
Added page auth/credentials-signin - followed these instructions - https://next-auth.js.org/configuration/pages
updated [...nextauth] and middleware with custom page details
added API via pages/api/user-data - https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken
yarn add react-query
updated app.tsx for react query support
update index.tsx to pull user data from the api we created
```

TODO: setup login via OAuth as well
Make client secret dynamic to support multi tenant

## Run

nx serve merchant-portal
