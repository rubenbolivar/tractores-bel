# 🎯 Cómo Usar el Sistema de Deployment Automatizado

## ✅ ¡Deployment Exitoso!

El sistema de deployment automatizado está **funcionando correctamente**. Acabamos de hacer un deployment exitoso que:

- ✅ Verificó el estado del repositorio
- ✅ Instaló dependencias
- ✅ Compiló el proyecto (1.3MB)
- ✅ Creó backup automático en el servidor
- ✅ Subió 21 archivos al servidor
- ✅ Recargó nginx
- ✅ Verificó que el sitio responde (HTTP 200)

**Tiempo total:** ~30 segundos

---

## 🚀 Uso Diario

### Para Deployar Cambios

Cada vez que quieras subir cambios a producción:

```bash
# 1. Asegúrate de estar en el directorio del proyecto
cd tractores-bel

# 2. Ejecuta el script
./scripts/deploy.sh
```

**Eso es todo!** El script hace todo automáticamente.

---

## 📝 Workflow Completo Recomendado

### 1. Desarrollo Local
```bash
# Trabaja en tus cambios
npm run dev

# Prueba que todo funciona
# Abre http://localhost:5173
```

### 2. Commitear Cambios
```bash
# Agrega tus cambios
git add .

# Commitea con un mensaje descriptivo
git commit -m "feat: descripción de lo que hiciste"

# Sube a GitHub
git push origin main
```

### 3. Deployar a Producción
```bash
# Ejecuta el script de deployment
./scripts/deploy.sh
```

### 4. Verificar
```bash
# Abre el sitio en tu navegador
open https://tractores-bel.bailab.dev

# O verifica con curl
curl -I https://tractores-bel.bailab.dev
```

---

## 🔄 Si Algo Sale Mal

### Hacer Rollback

Si después de un deployment algo no funciona:

```bash
./scripts/rollback.sh
```

El script te mostrará los últimos backups disponibles:
```
📋 Backups disponibles:

tractores-bel-20251102-162116.tar.gz (Nov 2 16:21)
tractores-bel-20251102-143000.tar.gz (Nov 2 14:30)
tractores-bel-20251101-180000.tar.gz (Nov 1 18:00)
```

Ingresa el nombre del backup al que quieres volver y confirma con `yes`.

---

## 📊 Lo Que Hace el Script Automáticamente

### deploy.sh
1. **Verifica rama** - Asegura que estás en `main`
2. **Verifica cambios** - Te avisa si hay cambios sin commitear
3. **Actualiza repo** - Hace `git pull`
4. **Instala deps** - Ejecuta `npm install`
5. **Compila** - Ejecuta `npm run build`
6. **Crea backup** - Guarda versión actual en el servidor
7. **Sube archivos** - Usa rsync para transferir
8. **Recarga nginx** - Aplica cambios
9. **Verifica** - Confirma que el sitio responde

### rollback.sh
1. **Lista backups** - Muestra últimos 10 backups
2. **Solicita confirmación** - Pide que confirmes
3. **Crea pre-rollback backup** - Guarda estado actual
4. **Restaura backup** - Vuelve a la versión seleccionada
5. **Recarga nginx** - Aplica cambios
6. **Verifica** - Confirma que el sitio responde

---

## 🎓 Ejemplos de Uso

### Ejemplo 1: Deployment Normal
```bash
$ ./scripts/deploy.sh

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
📊 Tamaño del build: 1.3M

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
📦 Backup: /var/www/backups/tractores-bel-20251102-162116.tar.gz
📊 Build size: 1.3M
⏰ Timestamp: 20251102-162116
```

### Ejemplo 2: Deployment con Cambios Sin Commitear
```bash
$ ./scripts/deploy.sh

🚀 Tractores BEL - Deployment Script
================================================

📍 Verificando rama...
✓ Rama correcta: main

📍 Verificando cambios pendientes...
⚠️  Hay cambios sin commitear:
 M src/App.jsx
 M src/pages/Home.jsx

¿Deseas continuar de todas formas? (yes/no)
> no

Deployment cancelado
```

### Ejemplo 3: Rollback
```bash
$ ./scripts/rollback.sh

🔄 Tractores BEL - Rollback Script
================================================

📋 Backups disponibles:

tractores-bel-20251102-162116.tar.gz (Nov 2 16:21)
tractores-bel-20251102-143000.tar.gz (Nov 2 14:30)

Ingresa el nombre del backup a restaurar:
> tractores-bel-20251102-143000.tar.gz

🔍 Verificando backup...

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

Los scripts contienen las credenciales del servidor. **Importante:**

- ✅ Los scripts están en el repositorio privado
- ✅ Solo tú tienes acceso
- ⚠️ No compartas estos scripts públicamente
- 💡 Considera usar SSH keys en el futuro (más seguro)

---

## 📞 Soporte

### Problemas Comunes

**Error: "sshpass no está instalado"**
```bash
brew install sshpass
```

**Error: "Permission denied"**
```bash
chmod +x scripts/deploy.sh scripts/rollback.sh
```

**Sitio no responde después del deployment**
```bash
# Hacer rollback inmediatamente
./scripts/rollback.sh
```

### Documentación Adicional

- [`scripts/README.md`](scripts/README.md) - Documentación técnica detallada
- [`DEPLOYMENT.md`](DEPLOYMENT.md) - Guía rápida de deployment
- [`../PLAN_DEPLOYMENT_MANTENIMIENTO.md`](../PLAN_DEPLOYMENT_MANTENIMIENTO.md) - Plan completo
- [`../ANALISIS_COMPLETO_PROYECTO.md`](../ANALISIS_COMPLETO_PROYECTO.md) - Análisis técnico

---

## 🎉 ¡Listo para Usar!

El sistema de deployment automatizado está **completamente funcional** y listo para usar en tu día a día.

**Próximo deployment:** Solo ejecuta `./scripts/deploy.sh` 🚀

---

**Última actualización:** 2 de Noviembre, 2025  
**Estado:** ✅ Funcionando correctamente