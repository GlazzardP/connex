FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY nx.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/

RUN npm install

COPY . .

RUN npx nx build api --prod

EXPOSE 3333

CMD ["node", "dist/apps/api/main.js"]
