FROM node:20-alpine

WORKDIR /usr/src/app

COPY package* .
COPY ./prisma .

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 8787

CMD [ "npm", "run", "dev" ]