FROM node:12-stretch AS base
WORKDIR /app
COPY package.json package-lock.json ./
ENTRYPOINT [ "npm", "run" ]

FROM base AS dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm ci

FROM base AS prod
COPY --from=dependencies /app/node_modules ./node_modules
COPY tsconfig.json ./
COPY src src
ENV NODE_PATH=/app
EXPOSE 8443
CMD ["serve"]
