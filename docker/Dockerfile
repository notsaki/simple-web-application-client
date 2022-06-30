FROM node:latest as base

WORKDIR /

ENV PATH /node_modules/.bin:$PATH

ARG API_URI

ENV REACT_APP_API_URI=$API_URI

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY ./ ./

FROM base as build

RUN yarn build

FROM nginx:latest as prod

COPY --from=build dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]