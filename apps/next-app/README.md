* inspired by - https://github.com/vercel/app-playground
* Blog about Next 13 - https://nextjs.org/blog/next-13
* 

Getting SST To Work
added 
```shell
transpilePackages: ['@dbd/is-even'],
```
to next.config.js

now run Nx build, and you should get a dist folder generated, 
with the .next etc, one small issue here is that your .next/standalone 
folder will not contain a server.js, but instead folders, 
following your monrepo structure till your server.js
something like .next/standalone/appname/server.js you need to copy 
that file and any other files in that folder to .next/standalone

THEN you cd into your dist folder, and then run npx open-next@latest build and bam, open-next stuff is generated - no idea if it actually works yet as we need to create a custom construct 
to get things compliant for us, security wise, i feel like there's a chance we need to modify the server.js as it has configuration that points to folders that don't exist/exist incorrectly (like ../../../dist/[path-to-app]/,next, 
i had to do this to get the server.js working locally so it would make sense we would need to update it before open-next build is ran)
hope this is somewhat useful to the 5 of us that use Nx/NextJs and dont deploy directly to vercel or use Fargate
https://discord.com/channels/983865673656705025/1027265626085019769/1097530247617990706

### Update 10/19/2023
deploy
```shell
AWS_PROFILE=payco_dev nx run next-app:deploy
```
We use the command to update the server.js file to point to the right things 
```shell 
cd apps/next-app/dist && sed 's@/dist/.next@/.next@g' .next/standalone/apps/next-app/server.js > ./.next/standalone/server.js
```

I change the build command in SST to, the build-command is just a command that does nothing.  I did this because of the mono repo causing issue with the default 
we actually build the application as dependent step before running SST
```js
buildCommand: 'npx --yes open-next@2.0.5 build --build-command "nx run next-app:foo"',
```

Created the hosted zone sst.dbd-dev.com in the developers@dbdventuresllc.com aws account.


Helpful article - https://www.freecodecamp.org/news/how-to-deploy-a-next-js-app-with-custom-domain-on-aws-using-sst/

updated to NX 15.9.2

update require-server-files in standalone/.next, distDir

Bump
