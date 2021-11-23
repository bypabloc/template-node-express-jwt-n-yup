FROM node:16 as base

WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python

RUN npm install -g sequelize-cli
RUN npm install -g node-gyp
RUN npm install node-pre-gyp -g
RUN npm install

COPY . /
CMD ["nodemon", "bin/www"]