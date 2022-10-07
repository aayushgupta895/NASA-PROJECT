FROM node:lts-alpine

WORKDIR /app

COPY package*.json  ./

COPY client/package*.json client/
RUN npm install client --production

COPY server/package*.json server/
RUN npm  install server --production

RUN npm install react-scripts --production

RUN npm install react-dom --production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000