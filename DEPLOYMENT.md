# 🚀 Guía de Deployment - Tractores BEL

## Deployment Rápido

Para deployar cambios a producción:

```bash
./scripts/deploy.sh
```

Eso es todo! El script se encarga de:
- ✅ Verificar que todo está en orden
- ✅ Compilar el proyecto
- ✅ Crear backup automático
- ✅ Subir archivos al servidor
- ✅ Recargar nginx
- ✅ Verificar que el sitio funciona

## Revertir Cambios (Rollback)

Si algo sale mal:

```bash
./scripts/rollback.sh
```

Selecciona el backup al que quieres volver y listo.

## Workflow Completo

### 1. Hacer Cambios
```bash
# Edita tus archivos
# Prueba localmente
npm run dev
```

### 2. Commitear
```bash
git add .
git commit -m "feat: descripción de tus cambios"
git push origin main
```

### 3. Deployar
```bash
./scripts/deploy.sh
```

### 4. Verificar
Abre https://tractores-bel.bailab.dev en tu navegador y verifica que todo funciona correctamente.

## Documentación Completa

- [`scripts/README.md`](scripts/README.md) - Documentación detallada de los scripts
- [`PLAN_DEPLOYMENT_MANTENIMIENTO.md`](../PLAN_DEPLOYMENT_MANTENIMIENTO.md) - Plan completo de deployment y mantenimiento
- [`ANALISIS_COMPLETO_PROYECTO.md`](../ANALISIS_COMPLETO_PROYECTO.md) - Análisis técnico del proyecto

## Problemas Comunes

### El script no se ejecuta
```bash
chmod +x scripts/deploy.sh scripts/rollback.sh
```

### Error de sshpass
```bash
brew install sshpass
```

### Sitio no responde después del deployment
```bash
./scripts/rollback.sh
# Selecciona el último backup funcional
```

## Información del Servidor

- **URL Producción:** https://tractores-bel.bailab.dev
- **Servidor:** 203.161.62.94
- **Backups:** Se mantienen los últimos 10 automáticamente

## Soporte

Para más ayuda, consulta la documentación completa o contacta al equipo técnico.