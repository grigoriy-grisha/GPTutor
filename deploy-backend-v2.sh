#!/bin/bash

echo "🚀 Deploying GPTutor Backend v2..."

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Проверка наличия docker-compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ docker-compose not found. Please install docker-compose.${NC}"
    exit 1
fi

# 1. Pull последних изменений
echo -e "${YELLOW}📥 Pulling latest changes from git...${NC}"
git pull

# 2. Остановка старого контейнера
echo -e "${YELLOW}⏹️  Stopping backend-prod container...${NC}"
docker-compose -f docker-compose-prod.yaml stop backend-prod

# 3. Удаление старого контейнера
echo -e "${YELLOW}🗑️  Removing old backend-prod container...${NC}"
docker-compose -f docker-compose-prod.yaml rm -f backend-prod

# 4. Сборка нового образа
echo -e "${YELLOW}🔨 Building new backend-prod image...${NC}"
docker-compose -f docker-compose-prod.yaml build backend-prod

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Check the logs above.${NC}"
    exit 1
fi

# 5. Запуск нового контейнера
echo -e "${YELLOW}▶️  Starting backend-prod container...${NC}"
docker-compose -f docker-compose-prod.yaml up -d backend-prod

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to start container! Check the logs.${NC}"
    exit 1
fi

# 6. Ожидание запуска
echo -e "${YELLOW}⏳ Waiting for backend to start...${NC}"
sleep 5

# 7. Проверка здоровья
echo -e "${YELLOW}🏥 Checking health...${NC}"
HEALTH_CHECK=$(docker exec backend-prod node -e "require('http').get('http://localhost:3001/health', (r) => {console.log(r.statusCode)})" 2>&1)

if [[ $HEALTH_CHECK == *"200"* ]]; then
    echo -e "${GREEN}✅ Backend deployed successfully!${NC}"
else
    echo -e "${RED}⚠️  Backend started but health check failed. Check logs:${NC}"
    echo "docker logs backend-prod"
fi

# 8. Показать последние логи
echo -e "${YELLOW}📋 Last 20 log lines:${NC}"
docker logs --tail 20 backend-prod

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "Useful commands:"
echo "  View logs:      docker logs -f backend-prod"
echo "  Stop:           docker-compose -f docker-compose-prod.yaml stop backend-prod"
echo "  Restart:        docker-compose -f docker-compose-prod.yaml restart backend-prod"
echo "  Shell:          docker exec -it backend-prod sh"

