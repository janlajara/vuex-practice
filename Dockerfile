# VUE
FROM node:14-slim as web
WORKDIR /code

# Install dependencies
COPY ./package*.json ./
RUN npm install

# Copy project
COPY . .
RUN npm run build


# NGINX
FROM nginx
COPY --from=web /code/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'