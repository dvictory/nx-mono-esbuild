# Install dependencies only when needed
# https://blog.nrwl.io/nx-and-node-microservices-b6df3cd1bad6
FROM docker.io/node:lts-alpine as deps
WORKDIR /usr/src/app
COPY dist/apps/fastify-app/package*.json ./
RUN npm install --only=production

# Production image, copy all the files and run
FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 3000
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/package.json ./package.json
COPY dist/apps/fastify-app .
RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "main.mjs"]
