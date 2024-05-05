# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN npm ci 
# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build
RUN npm install -g serve
# Start the server using the production build
CMD ["serve", "-s", "--listen", "5000" , "./dist"]