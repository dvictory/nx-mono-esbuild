FROM docker.io/node:18-alpine

COPY dist/apps/next-app ./
ENV NODE_ENV production
ENV PORT 3000
WORKDIR /usr/src/app

COPY dist/apps/next-app/package.json ./package.json
COPY dist/apps/next-app/.next/standalone ./
COPY dist/apps/next-app/public ./dist/apps/next-app/public
COPY dist/apps/next-app/.next/static ./dist/apps/next-app/.next/static


RUN chown -R node:node .
USER node
EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "apps/next-app/server.js"]
