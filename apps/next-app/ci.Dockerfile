# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk --no-cache add --virtual .builds-deps build-base python3 libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

#RUN yarn build
RUN ./node_modules/.bin/nx run next-app:build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#COPY --from=builder /app/dist/apps/next-app/public ./public
#COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/next-app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/next-app/.next/static ./apps/next-app/.next/static
##COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/next-app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/next-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/next-app/public ./dist/apps/next-app/public
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/next-app/.next/static ./dist/apps/next-app/.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "apps/next-app/server.js"]
