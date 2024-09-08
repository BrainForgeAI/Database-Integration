FROM node:20-alpine3.19

# Add group and user to run application
RUN addgroup -S aspectusgroup && adduser -S aspectususer -G aspectusgroup

# Create working directory
WORKDIR /aspectus/api

# Ensure working directory is owned by user to ensure no permission issues
RUN chown -R aspectususer:aspectusgroup /aspectus/api

# Copy dependencies from package.json and package-lock.json into working directory
COPY package*.json ./

# Use 'npm ci' for clean installation of packages directly from package-lock. apk update and apk add
# are used in this instance to add packages that reduce vunerabilities
RUN apk update && \
    apk add --no-cache openssl libssl3 && \
    rm -rf /var/cache/apk/* && \
    npm ci && \
    npm cache clean --force

# Copies all files from project directory into working directory
COPY . .

# Change ownership of all files from root user to aspectususer
RUN chown -R aspectususer:aspectusgroup /aspectus/api

# Expose port. This should be the same port as what is declared as the container port
EXPOSE 1000

# Switch to user
USER aspectususer

# Command to run application within docker container.
# Use node [main script] rather than npm start to remove the minimal overhead of npm start
# and no pre-script or environment configurations are being declared
CMD ["node", "app.js"]