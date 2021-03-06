FROM node:12-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install && npm install sqlite3

RUN npm run knex

RUN npm run build

RUN cp /app/src/database/database.sqlite /app/dist/src/database/database.sqlite

RUN cp -r /app/uploads /app/dist/uploads

WORKDIR /app/dist

CMD node src/index.js

