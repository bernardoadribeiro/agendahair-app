# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the required packages
RUN npm install

# Expose the React port
EXPOSE 3000

# Run the command to start the React app
CMD [ "npm", "start" ]
