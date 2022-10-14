FROM cypress/browsers:node16.17.1-chrome105-ff104-edge as builder

ARG PORT=80
ENV PORT ${PORT}

WORKDIR /workspace

COPY . .

RUN npm ci
RUN cd /workspace && \
    npm run test:ci && \
    npm run build

FROM caddy:2.6.2

WORKDIR /var/www/html

RUN rm -rf /var/www/html/*

COPY --from=builder /workspace/dist/frontend /var/www/html

COPY --from=builder /workspace/Caddyfile /etc/caddy/Caddyfile

EXPOSE ${PORT}

CMD ["caddy", "start"]
