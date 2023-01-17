FROM node:19.4.0-bullseye-slim

# Install cron + rsync
RUN apt-get update && apt-get -y install cron rsync
RUN service cron start

# Prepare entrypoint
WORKDIR /
COPY entrypoint /entrypoint
RUN chmod +x /entrypoint

# Prepare webui
COPY webui /webui

# Prepare server
WORKDIR /server
COPY server/package*.json ./
RUN npm ci --only=production
COPY . .

# Expose webui and run
EXPOSE 9292
ENTRYPOINT ["/entrypoint"]
CMD ["node", "index.js"]