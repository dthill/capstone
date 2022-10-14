FROM cypress/browsers:node16.17.1-chrome105-ff104-edge as builder

ARG PORT=80
ENV PORT ${PORT}

WORKDIR /workspace

COPY . .

RUN npm ci
RUN cd /workspace && \
    npm run test:ci && \
    npm run build

FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /workspace/dist/frontend /usr/share/nginx/html

COPY --from=builder /workspace/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
