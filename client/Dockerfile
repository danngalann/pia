FROM node:18.6.0-alpine3.15

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN yarn global add pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]