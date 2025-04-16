FROM node:20-alpine

WORKDIR /app
COPY public ./public
COPY server ./server

WORKDIR /app/server
COPY ./server/package.json .
COPY ./server/package-lock.json .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]