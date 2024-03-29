FROM node:12.18.1

RUN mkdir /app

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "start"]