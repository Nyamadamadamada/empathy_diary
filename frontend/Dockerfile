FROM node:lts-slim

WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app

ENV PORT 8080
ENV NODE_ENV production


COPY package*.json ./

RUN npm ci

COPY index.js .
COPY dist/ ./dist/

USER node
CMD [ "node", "index.js" ]