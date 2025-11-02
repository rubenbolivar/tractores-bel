#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Tractores BEL - Deployment Script${NC}"
echo "================================================"

# Variables
VPS_HOST="203.161.62.94"
VPS_USER="root"
VPS_PASSWORD="IYN3oc6vww0SX37B0d"
DEPLOY_PATH="/var/www/tractores-bel.bailab.dev"
BACKUP_PATH="/var/www/backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Función para manejar errores
handle_error() {
    echo -e "${RED}❌ Error: $1${NC}"
    exit 1
}

# Verificar que sshpass está instalado
if ! command -v sshpass &> /dev/null; then
    echo -e "${RED}❌ sshpass no está instalado${NC}"
    echo -e "${YELLOW}Instalando sshpass...${NC}"
    brew install sshpass || handle_error "No se pudo instalar sshpass"
fi

# 1. Verificar que estamos en la rama main
echo -e "\n${YELLOW}📍 Verificando rama...${NC}"
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    handle_error "Debes estar en la rama 'main' para hacer deployment"
fi
echo -e "${GREEN}✓ Rama correcta: ${CURRENT_BRANCH}${NC}"

# 2. Verificar que no hay cambios sin commitear
echo -e "\n${YELLOW}📍 Verificando cambios pendientes...${NC}"
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}⚠️  Hay cambios sin commitear:${NC}"
    git status -s
    echo -e "\n${YELLOW}¿Deseas continuar de todas formas? (yes/no)${NC}"
    read CONTINUE
    if [ "$CONTINUE" != "yes" ]; then
        echo "Deployment cancelado"
        exit 0
    fi
else
    echo -e "${GREEN}✓ No hay cambios pendientes${NC}"
fi

# 3. Pull latest changes
echo -e "\n${YELLOW}📍 Actualizando repositorio...${NC}"
git pull origin main || handle_error "Error al hacer pull"
echo -e "${GREEN}✓ Repositorio actualizado${NC}"

# 4. Instalar dependencias
echo -e "\n${YELLOW}📦 Instalando dependencias...${NC}"
npm install || handle_error "Error al instalar dependencias"
echo -e "${GREEN}✓ Dependencias instaladas${NC}"

# 5. Build de producción
echo -e "\n${YELLOW}🔨 Compilando para producción...${NC}"
npm run build || handle_error "Error en el build"
echo -e "${GREEN}✓ Build completado${NC}"

# 6. Verificar que el build existe
if [ ! -d "dist" ]; then
    handle_error "Directorio 'dist' no encontrado después del build"
fi

# Mostrar tamaño del build
BUILD_SIZE=$(du -sh dist | cut -f1)
echo -e "${BLUE}📊 Tamaño del build: ${BUILD_SIZE}${NC}"

# 7. Crear backup en el servidor
echo -e "\n${YELLOW}💾 Creando backup en servidor...${NC}"
sshpass -p "${VPS_PASSWORD}" ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_HOST} "
    mkdir -p ${BACKUP_PATH}
    cd /var/www
    if [ -d 'tractores-bel.bailab.dev' ] && [ \"\$(ls -A tractores-bel.bailab.dev)\" ]; then
        tar -czf ${BACKUP_PATH}/tractores-bel-${TIMESTAMP}.tar.gz tractores-bel.bailab.dev/
        echo 'Backup creado: ${BACKUP_PATH}/tractores-bel-${TIMESTAMP}.tar.gz'
        
        # Mantener solo los últimos 10 backups
        cd ${BACKUP_PATH}
        ls -t tractores-bel-*.tar.gz 2>/dev/null | tail -n +11 | xargs -r rm
        echo 'Backups antiguos limpiados'
    else
        echo 'No hay archivos previos para hacer backup'
    fi
" || handle_error "Error al crear backup"
echo -e "${GREEN}✓ Backup creado${NC}"

# 8. Subir archivos al servidor
echo -e "\n${YELLOW}📤 Subiendo archivos al servidor...${NC}"
sshpass -p "${VPS_PASSWORD}" rsync -avz --delete \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.env' \
    --exclude='.DS_Store' \
    dist/ ${VPS_USER}@${VPS_HOST}:${DEPLOY_PATH}/ \
    || handle_error "Error al subir archivos"
echo -e "${GREEN}✓ Archivos subidos${NC}"

# 9. Verificar nginx y recargar
echo -e "\n${YELLOW}🔄 Recargando nginx...${NC}"
sshpass -p "${VPS_PASSWORD}" ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_HOST} "
    nginx -t && systemctl reload nginx
" || handle_error "Error al recargar nginx"
echo -e "${GREEN}✓ Nginx recargado${NC}"

# 10. Verificar que el sitio responde
echo -e "\n${YELLOW}🔍 Verificando sitio...${NC}"
sleep 3
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://tractores-bel.bailab.dev)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Sitio respondiendo correctamente (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}⚠️  Advertencia: Sitio respondió con HTTP $HTTP_CODE${NC}"
fi

# 11. Resumen
echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✅ Deployment completado exitosamente!${NC}"
echo -e "${GREEN}================================================${NC}"
echo -e "${BLUE}🌐 URL: https://tractores-bel.bailab.dev${NC}"
echo -e "${BLUE}📦 Backup: ${BACKUP_PATH}/tractores-bel-${TIMESTAMP}.tar.gz${NC}"
echo -e "${BLUE}📊 Build size: ${BUILD_SIZE}${NC}"
echo -e "${BLUE}⏰ Timestamp: ${TIMESTAMP}${NC}"
echo ""
echo -e "${YELLOW}💡 Tip: Verifica el sitio en tu navegador para confirmar los cambios${NC}"
echo ""