FROM node:alpine
MAINTAINER Iiro Jäppinen <iiro@jappinen.fi> (https://iiro.fi)

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .
RUN npm run build
RUN npm prune

ENV NODE_ENV=production

CMD ["node ./dist/server/index.js"]
