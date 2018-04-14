FROM node:8.8.1

COPY . /app  

WORKDIR /app

RUN yarn

EXPOSE 3001

CMD ["npm", "start"]  