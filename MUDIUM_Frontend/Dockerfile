FROM node:lts-alpine

# curl 설치
RUN apk add --no-cache curl

WORKDIR /app
COPY . ./
RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]