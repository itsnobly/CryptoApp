#!/bin/bash

# CryptoApp - Скрипт тестирования перед деплоем

echo "🧪 Начало тестирования приложения CryptoApp..."
echo "================================================"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Счётчик ошибок
ERRORS=0

# 1. Проверка зависимостей
echo -e "\n${YELLOW}📦 Проверка зависимостей...${NC}"
if npm list > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Зависимости установлены${NC}"
else
  echo -e "${RED}✗ Установите зависимости: npm install${NC}"
  ERRORS=$((ERRORS + 1))
fi

# 2. Проверка линтера
echo -e "\n${YELLOW}✅ Проверка кода линтером...${NC}"
if npm run lint > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Код соответствует стандартам${NC}"
else
  echo -e "${YELLOW}⚠ Найдены ошибки линтера (используйте npm run lint)${NC}"
  ERRORS=$((ERRORS + 1))
fi

# 3. Проверка сборки
echo -e "\n${YELLOW}🔨 Проверка production build...${NC}"
if npm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Build успешно создан${NC}"
  
  # Проверка размера dist
  DIST_SIZE=$(du -sh dist/ | cut -f1)
  echo -e "${GREEN}  Размер dist: $DIST_SIZE${NC}"
else
  echo -e "${RED}✗ Ошибка при создании build${NC}"
  ERRORS=$((ERRORS + 1))
fi

# 4. Проверка файловой структуры
echo -e "\n${YELLOW}📂 Проверка файловой структуры...${NC}"
REQUIRED_FILES=(
  "src/main.jsx"
  "src/App.jsx"
  "src/api.js"
  "src/utils.js"
  "src/context/cryprto-context.jsx"
  "package.json"
  "README.md"
  "vite.config.js"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓ $file${NC}"
  else
    echo -e "${RED}✗ $file (ОТСУТСТВУЕТ)${NC}"
    ERRORS=$((ERRORS + 1))
  fi
done

# 5. Проверка dist
echo -e "\n${YELLOW}📦 Проверка dist директории...${NC}"
if [ -d "dist" ]; then
  DIST_FILES=$(find dist -type f | wc -l)
  echo -e "${GREEN}✓ dist найдена (файлов: $DIST_FILES)${NC}"
  
  if [ -f "dist/index.html" ]; then
    echo -e "${GREEN}✓ dist/index.html найден${NC}"
  else
    echo -e "${RED}✗ dist/index.html не найден${NC}"
    ERRORS=$((ERRORS + 1))
  fi
else
  echo -e "${YELLOW}⚠ dist директория не найдена (создайте её: npm run build)${NC}"
fi

# Финальный результат
echo -e "\n================================================"
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✅ ВСЕ ТЕСТЫ ПРОЙДЕНЫ${NC}"
  echo -e "${GREEN}Приложение готово к деплою!${NC}"
  exit 0
else
  echo -e "${RED}❌ НАЙДЕНО ОШИБОК: $ERRORS${NC}"
  echo -e "${YELLOW}Пожалуйста, исправьте ошибки перед деплоем${NC}"
  exit 1
fi
