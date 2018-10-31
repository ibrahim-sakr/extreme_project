# specify the node base image with your desired version node:<version>
FROM node:10.12-alpine

# Set work directory to /www
WORKDIR /www

# Install app dependencies
COPY package*.json ./

# install global packages
RUN npm install -g nodemon; \
    # install app dependincies
    npm install

# Copy app source
COPY . .

ENV NODE_ENV production

# start command as per package.json
CMD ["nodemon"]
