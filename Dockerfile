# 构建阶段
FROM crpi-i6j49f9grfbfelxl.cn-shanghai.personal.cr.aliyuncs.com/wrj_1/node:24.1.0-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 生产部署阶段
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
