# 🚀 Scripts de Deployment - Tractores BEL

Scripts automatizados para deployment y rollback de la aplicación Tractores BEL.

## 📋 Requisitos

- **sshpass** instalado (se instala automáticamente si no está presente)
- Acceso SSH al servidor VPS
- Git configurado
- Node.js y npm instalados

## 🎯 Scripts Disponibles

### 1. deploy.sh - Deployment Automatizado

Despliega la aplicación a producción de forma automatizada.

**Uso:**
```bash
./scripts/deploy.sh
```

**¿Qué hace?**
1. ✅ Verifica que estás en la rama `main`
2. ✅ Verifica cambios sin commitear (te pregunta si continuar)
3. ✅ Actualiza el repositorio (`git pull`)
4. ✅ Instala dependencias (`npm install`)
5. ✅ Compila para producción (`npm run build`)
6. ✅ Crea backup automático en el servidor
7. ✅ Sube archivos al servidor vía rsync
8. ✅ Recarga nginx
9. ✅ Verifica que el sitio responde correctamente

**Tiempo estimado:** 2-3 minutos

**Ejemplo de salida:**
```
🚀 Tractores BEL - Deployment Script
================================================

📍 Verificando rama...
✓ Rama correcta: main

📍 Verificando cambios pendientes...
✓ No hay cambios pendientes

📍 Actualizando repositorio...
✓ Repositorio actualizado

📦 Instalando dependencias...
✓ Dependencias instaladas

🔨 Compilando para producción...
✓ Build completado
📊 Tamaño del build: 3.1M

💾 Creando backup en servidor...
✓ Backup creado

📤 Subiendo archivos al servidor...
✓ Archivos subidos

🔄 Recargando nginx...
✓ Nginx recargado

🔍 Verificando sitio...
✅ Sitio respondiendo correctamente (HTTP 200)

================================================
✅ Deployment completado exitosamente!
================================================
🌐 URL: https://tractores-bel.bailab.dev
📦 Backup: /var/www/backups/tractores-bel-20251102-161500.tar.gz
📊 Build size: 3.1M
⏰ Timestamp: 20251102-161500
```

---

### 2. rollback.sh - Revertir Deployment

Revierte a una versión anterior en caso de problemas.

**Uso:**
```bash
./scripts/rollback.sh
```

**¿Qué hace?**
1. 📋 Lista los últimos 10 backups disponibles
2. ❓ Te pide que selecciones cuál restaurar
3. ⚠️  Solicita confirmación
4. 💾 Crea backup del estado actual (pre-rollback)
5. 🔄 Restaura el backup seleccionado
6. 🔄 Recarga nginx
7. ✅ Verifica que el sitio responde

**Tiempo estimado:** 1-2 minutos

**Ejemplo de uso:**
```bash
$ ./scripts/rollback.sh

🔄 Tractores BEL - Rollback Script
================================================

📋 Backups disponibles:

tractores-bel-20251102-161500.tar.gz (Nov 2 16:15)
tractores-bel-20251102-143000.tar.gz (Nov 2 14:30)
tractores-bel-20251101-180000.tar.gz (Nov 1 18:00)

Ingresa el nombre del backup a restaurar:
> tractores-bel-20251102-143000.tar.gz

⚠️  ¿Estás seguro de hacer rollback a tractores-bel-20251102-143000.tar.gz?
Esto reemplazará la versión actual en producción.
Escribe 'yes' para confirmar:
> yes

🔄 Restaurando backup...
✅ Rollback completado exitosamente

🔍 Verificando sitio...
✅ Sitio respondiendo correctamente (HTTP 200)

🌐 Verifica el sitio: https://tractores-bel.bailab.dev
```

---

## 🔐 Seguridad

Los scripts incluyen las credenciales del servidor. **NO** subas estos scripts a un repositorio público.

Para mayor seguridad, considera:
1. Usar variables de entorno para las credenciales
2. Implementar SSH keys en lugar de contraseñas
3. Agregar `scripts/` al `.gitignore` si contiene credenciales

---

## 📝 Workflow Recomendado

### Deployment Normal

```bash
# 1. Hacer cambios en el código
# 2. Commitear cambios
git add .
git commit -m "feat: descripción de cambios"
git push origin main

# 3. Deployar
./scripts/deploy.sh

# 4. Verificar en el navegador
open https://tractores-bel.bailab.dev
```

### En Caso de Problemas

```bash
# Si algo sale mal después del deployment
./scripts/rollback.sh

# Selecciona el último backup funcional
# Verifica que todo funcione
# Investiga y corrige el problema
# Vuelve a deployar cuando esté listo
```

---

## 🆘 Troubleshooting

### Error: "sshpass no está instalado"
```bash
brew install sshpass
```

### Error: "Permission denied"
```bash
chmod +x scripts/deploy.sh scripts/rollback.sh
```

### Error: "Debes estar en la rama 'main'"
```bash
git checkout main
```

### Error al subir archivos
- Verifica la conexión a internet
- Verifica que el servidor esté accesible: `ping 203.161.62.94`
- Verifica las credenciales SSH

### Sitio no responde después del deployment
```bash
# Hacer rollback inmediatamente
./scripts/rollback.sh

# Revisar logs en el servidor
ssh root@203.161.62.94
tail -50 /var/log/nginx/tractores-bel.error.log
```

---

## 📊 Backups

Los backups se almacenan en el servidor en:
```
/var/www/backups/tractores-bel-YYYYMMDD-HHMMSS.tar.gz
```

**Retención:** Se mantienen los últimos 10 backups automáticamente.

**Ubicación local:** No se guardan backups localmente (solo en el servidor).

---

## 🎯 Próximos Pasos

Para automatización completa, considera implementar:

1. **GitHub Actions** - Deployment automático al hacer push a main
2. **Webhooks** - Notificaciones de deployment en Slack/Discord
3. **Monitoreo** - Alertas automáticas si el sitio cae
4. **Tests automatizados** - Ejecutar tests antes del deployment

Ver [`PLAN_DEPLOYMENT_MANTENIMIENTO.md`](../../PLAN_DEPLOYMENT_MANTENIMIENTO.md) para más detalles.

---

## 📞 Soporte

Si tienes problemas con los scripts:
1. Revisa esta documentación
2. Verifica los logs del servidor
3. Contacta al equipo técnico

---

**Última actualización:** 2 de Noviembre, 2025