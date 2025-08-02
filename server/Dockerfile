FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm i -g pnpm

RUN pnpm install

CMD [ "pnpm", "start:prod" ]