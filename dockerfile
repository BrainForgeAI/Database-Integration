FROM node:20-alpine3.19
# Install OpenSSL and update package list to resolve vunerability issues
RUN apk update && \
    apk add --no-cache openssl libssl3 && \
    rm -rf /var/cache/apk/*
# Create working directory
WORKDIR /aspectus/api
# Copy dependencies from package.json and package-lock.json into working directory
COPY package*.json .
# Use 'npm ci' for clean installation of packages. 'npm ci' installs directly from package-lock.json
# and only uses package.json to check if packages aren't mismatched, or it will throw an error.
# npm ci can only be used if package-lock.json exists
RUN npm ci
# Copies all files from project directory into working directory
COPY . .
# Create mappable port and expose port
ENV API_PORT 3000
EXPOSE $API_PORT
# Command to run docker file
CMD ["npm", "start"]