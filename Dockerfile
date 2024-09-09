# Node.jsベースのイメージを使用してフロントエンドをビルド
FROM node:14 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# nginxベースのイメージを使用してビルド済みファイルを提供
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# ポート80を公開
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
