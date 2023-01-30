
FROM node:lts-alpine3.15

WORKDIR /app

COPY ./booking_car/package.json /app

RUN npm install

COPY ./booking_car /app

RUN ls -la

# RUN npm run build

EXPOSE 3000