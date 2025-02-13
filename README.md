# DRSKL-chat-be
```
docker-compose up --build
```
# migrate database
```
npx drizzle-kit generate:pg
npx drizzle-kit push:pg
```

docker run --name chat_postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -p 5432:5432 -d postgres:latest

docker run --name chat_redis -p 6379:6379 -d redis:latest
docker run --name chat_redis -e REDIS_PASSWORD=password -p 6379:6379 -d redis:latest