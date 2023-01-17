FROM node:19.4.0-bullseye-slim

# Install cron + rsync
RUN apt-get update && apt-get -y install cron rsync
RUN service cron start

# Prepare entrypoint
WORKDIR /
COPY entrypoint /entrypoint
RUN chmod +x /entrypoint

# Prepare webui
COPY webui/build /webui

# Prepare server
WORKDIR /server
COPY server/package*.json /server
RUN npm ci --only=production
COPY server/build /server

# Expose webui and run
EXPOSE 9191
ENTRYPOINT ["/entrypoint"]
CMD ["node", "index.js"]