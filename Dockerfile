FROM node:latest as build-stage

WORKDIR /app

COPY ./contacapp-frontend .
RUN npm install && npm run build

FROM nginx as production-stage

RUN mkdir /app
COPY --from=build-stage /app/dist /app