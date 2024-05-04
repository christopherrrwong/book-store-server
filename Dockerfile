# download
FROM node:21-alpine

# working in /app 
WORKDIR /app

# FROM this(.) in localhost to this(.) in docker environment
COPY . .

# install dependencies
RUN npm install

# run command (only one)
CMD npm run migrate && npm run seed && npm start