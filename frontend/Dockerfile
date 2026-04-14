FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set default env variable for API URL (can be overridden by compose)
ENV NEXT_PUBLIC_API_URL=http://localhost:5000/api

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
