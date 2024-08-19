# Use the official Node.js image.
FROM node:22

# Create and set the working directory.
WORKDIR /usr/src/app

# Copy the package.json and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application files.
COPY . .

# Build the application.
RUN npm run build

# Expose the port and define the command to run the app.
EXPOSE 3000
CMD ["node", "dist/server.js"]
