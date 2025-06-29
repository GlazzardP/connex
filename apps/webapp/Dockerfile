
FROM node:18-bullseye

WORKDIR /app

COPY package.json package-lock.json ./

RUN echo "optional=false" >> .npmrc

ENV CYPRESS_INSTALL_BINARY=0

RUN npm install

COPY . .

RUN npx nx build webapp --prod

FROM nginx:stable-alpine

COPY --from=0 /app/dist/apps/webapp /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
