#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${YELLOW}🔄 Tractores BEL - Rollback Script${NC}"
echo "================================================"

VPS_HOST="203.161.62.94"
VPS_USER="root"
VPS_PASSWORD="IYN3oc6vww0SX37B0d"
DEPLOY_PATH="/var/www/tractores-bel.bailab.dev"
BACKUP_PATH="/var/www/backups"

# Verificar que sshpass está instalado
if ! command -v sshpass &> /dev/null; then
    echo -e "${RED}❌ sshpass no está instalado${NC}"
    exit 1
fi

# Listar backups disponibles
echo -e "\n${YELLOW}📋 Backups disponibles:${NC}"
echo ""
sshpass -p "${VPS_PASSWORD}" ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_HOST} "
    if [ -d '${BACKUP_PATH}' ]; then
        cd ${BACKUP_PATH}
        if ls tractores-bel-*.tar.gz 1> /dev/null 2>&1; then
            ls -lht tractores-bel-*.tar.gz | head -10 | awk '{print \$9, \"(\"\$6, \$7, \$8\")\"}'
        else
            echo 'No hay backups disponibles'
            exit 1
        fi
    else
        echo 'Directorio de backups no existe'
        exit 1
    fi
"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ No se pudieron listar los backups${NC}"
    exit 1
fi

# Solicitar nombre del backup
echo -e "\n${YELLOW}Ingresa el nombre del backup a restaurar (ejemplo: tractores-bel-20251102-153000.tar.gz):${NC}"
read BACKUP_NAME

# Verificar que el backup existe
echo -e "\n${YELLOW}🔍 Verificando backup...${NC}"
BACKUP_EXISTS=$(sshpass -p "${VPS_PASSWORD}" ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_HOST} "
    if [ -f '${BACKUP_PATH}/${BACKUP_NAME}' ]; then
        echo 'exists'
    else
        echo 'not_found'
    fi
")

if [ "$BACKUP_EXISTS" != "exists" ]; then
    echo -e "${RED}❌ El backup '${BACKUP_NAME}' no existe${NC}"
    exit 1
fi

# Confirmar
echo -e "\n${RED}⚠️  ¿Estás seguro de hacer rollback a ${BACKUP_NAME}?${NC}"
echo -e "${RED}Esto reemplazará la versión actual en producción.${NC}"
echo -e "${YELLOW}Escribe 'yes' para confirmar:${NC}"
read CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Rollback cancelado"
    exit 0
fi

# Ejecutar rollback
echo -e "\n${YELLOW}🔄 Restaurando backup...${NC}"
sshpass -p "${VPS_PASSWORD}" ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_HOST} "
    # Backup del estado actual antes de rollback
    cd /var/www
    if [ -d 'tractores-bel.bailab.dev' ] && [ \"\$(ls -A tractores-bel.bailab.dev)\" ]; then
        tar -czf ${BACKUP_PATH}/pre-rollback-\$(date +%Y%m%d-%H%M%S).tar.gz tractores-bel.bailab.dev/
        echo 'Backup del estado actual creado'
    fi
    
    # Limpiar directorio actual
    rm -rf ${DEPLOY_PATH}/*
    
    # Restaurar backup
    tar -xzf ${BACKUP_PATH}/${BACKUP_NAME} -C /var/www/
    echo 'Backup restaurado'
    
    # Recargar nginx
    nginx -t && systemctl reload nginx
    echo 'Nginx recargado'
"

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Rollback completado exitosamente${NC}"
    
    # Verificar que el sitio responde
    echo -e "\n${YELLOW}🔍 Verificando sitio...${NC}"
    sleep 3
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://tractores-bel.bailab.dev)
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Sitio respondiendo correctamente (HTTP $HTTP_CODE)${NC}"
    else
        echo -e "${RED}⚠️  Advertencia: Sitio respondió con HTTP $HTTP_CODE${NC}"
    fi
    
    echo -e "\n${BLUE}🌐 Verifica el sitio: https://tractores-bel.bailab.dev${NC}"
else
    echo -e "${RED}❌ Error durante el rollback${NC}"
    exit 1
fi