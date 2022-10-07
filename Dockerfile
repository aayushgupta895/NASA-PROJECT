FROM node:lts-alpine

WORKDIR /app

COPY package*.json  ./
RUN npm install --save --production

COPY client/package*.json client/
RUN npm install --prefix client --save --production

COPY server/package*.json server/
RUN npm  install --prefix server --save --production

#  RUN npm install react-dom --production

#  RUN npm install arwes --production

#  RUN npm install react-router-dom@5.2.0 --production


#  RUN npm install react-scripts --production
COPY client/ client/
RUN npm run build --prefix client --save

COPY server/ server/

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000