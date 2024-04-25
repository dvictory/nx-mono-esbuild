# Install dependencies only when needed
FROM docker.io/node:18-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY .npmrc package.json ./
#COPY dist/apps/docker-app/package*.json ./
RUN yarn install --production

# Production image, copy all the files and run next
FROM docker.io/node:18-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0
WORKDIR /usr/src/app


# removed because https://dev.to/sebastiandg7/nx-nextjs-docker-the-nx-way-containerizing-our-application-1mi7
#COPY --from=deps /usr/src/app/node_modules ./node_modules
#COPY --from=deps /usr/src/app/package.json ./package.json
#COPY dist/apps/docker-app/public ./public
#COPY dist/apps/docker-app/.next ./.next
#COPY public ./public
#COPY .next ./.next
#COPY server ./server


# DV added
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY ./ ./


RUN chown -R node:node .
USER node
EXPOSE 3000
# COPY --chown=node:node ./tools/scripts/entrypoints/api.sh /usr/local/bin/docker-entrypoint.sh
# ENTRYPOINT [ "docker-entrypoint.sh" ]
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1
#CMD ["dumb-init", "node_modules/.bin/next", "start"]
CMD ["dumb-init", "node", "server/main.js"]

# If you are using the NextJS built-int server:
# CMD ["dumb-init", "npm", "start"]
