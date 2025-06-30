FROM node:16 as builder
WORKDIR /app
COPY Frontend/notes-vault/package.json Frontend/notes-vault/package-lock.json ./
RUN npm install
COPY Frontend/notes-vault .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY Frontend/notes-vault/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]