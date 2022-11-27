FROM node:18-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /basic-app
COPY . .
RUN yarn install --production
CMD ["node", "dist/blocks.js"]