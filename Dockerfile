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
COPY server /server
WORKDIR /server
RUN npm ci --only=production

# Expose webui and run
EXPOSE 9292
ENTRYPOINT ["/entrypoint"]
CMD ["node", "index.js"]