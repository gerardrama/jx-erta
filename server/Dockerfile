FROM node:20.2.0-alpine

WORKDIR /app

COPY ./package*json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 4000

ENTRYPOINT [ "node" ]
CMD [ "build/index.js" ]