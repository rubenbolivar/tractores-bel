# 🚜 Instrucciones Rápidas - Tractores BEL

## ✅ ¡Tu aplicación está lista y corriendo!

El servidor de desarrollo está activo en: **http://localhost:5173/**

## 🎉 Lo que ya funciona:

### Páginas Implementadas:
1. **Homepage** (`/`) - Hero, categorías, tractores destacados, beneficios, testimonios
2. **Catálogo** (`/catalogo`) - 10 tractores con filtros avanzados
3. **Detalle de Tractor** (`/tractor/:id`) - Especificaciones completas, calculadora, WhatsApp CTA

### Prueba estas URLs:
- Home: http://localhost:5173/
- Catálogo: http://localhost:5173/catalogo
- BEL 60: http://localhost:5173/tractor/bel60
- BEL 220: http://localhost:5173/tractor/bel220
- BEL 150: http://localhost:5173/tractor/bel150

## 📁 Archivos Importantes

### Datos (para editar precios, modelos, etc):
- `src/data/tractores.js` - Todos los tractores y precios
- `src/data/asesores.js` - Asesores por estado
- `src/data/quizData.js` - Preguntas del quiz

### Colores y Estilos:
- `tailwind.config.js` - Paleta de colores BEL
- `src/styles/index.css` - Estilos globales

## 🖼️ Imágenes Pendientes

Actualmente usa placeholders. Coloca tus imágenes reales en:

```
public/assets/
├── tractores/
│   ├── bel50.jpg
│   ├── bel60.jpg
│   ├── bel75.jpg
│   ├── bel90.jpg
│   ├── bel105.jpg
│   ├── bel110.jpg
│   ├── bel140.jpg
│   ├── bel150.jpg
│   └── bel220.jpg
├── categories/
│   ├── compacto.jpg
│   ├── versatil.jpg
│   ├── alto-rendimiento.jpg
│   └── trabajo-pesado.jpg
└── hero-tractor.jpg
```

## 🛠️ Comandos Útiles

```bash
# Iniciar desarrollo (ya está corriendo)
npm run dev

# Detener servidor
Ctrl + C

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview

# Limpiar e reinstalar
rm -rf node_modules && npm install
```

## ✏️ Personalizaciones Rápidas

### Cambiar colores:
Edita `tailwind.config.js` líneas 8-16

### Cambiar teléfono/WhatsApp:
Busca y reemplaza `+584145041522` en:
- `src/data/asesores.js`
- `src/components/layout/Header.jsx`
- `src/components/layout/Footer.jsx`

### Actualizar precios:
Edita `src/data/tractores.js` - cada tractor tiene:
- `precio` (precio total fraccionado)
- `cuotas` (valor de cada cuota)
- `precioContado` (precio de contado si aplica)

### Agregar/quitar tractores:
Edita el array en `src/data/tractores.js`

## 📱 Responsive

La app está optimizada para:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)
- ✅ Large Desktop (1280px+)

## 🚀 Próximos Pasos Sugeridos

### Corto plazo:
1. **Agregar imágenes reales** de los tractores
2. **Actualizar datos** de asesores (teléfonos, emails)
3. **Verificar precios** en `tractores.js`
4. **Implementar Quiz** de recomendación

### Mediano plazo:
5. Crear página de Contacto
6. Implementar Comparador
7. Agregar SEO (meta tags)
8. Optimizar imágenes

### Deployment:
9. Build de producción (`npm run build`)
10. Configurar VPS/nginx (ver README.md)
11. SSL con Let's Encrypt
12. Configurar dominio

## 🐛 Solución de Problemas

### La app no carga:
```bash
# Verifica que el servidor esté corriendo
# Deberías ver: "Local: http://localhost:5173/"

# Si no está corriendo:
npm run dev
```

### Error de módulos:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Imágenes rotas:
- Las imágenes usan placeholders de Unsplash
- Agrega tus propias imágenes en `public/assets/`
- O deja los placeholders (funcionan automáticamente)

## 📞 Contactos de Prueba

Los números de WhatsApp actuales son de EJEMPLO:
- Principal: +584145041522
- Modificar en `src/data/asesores.js`

## ✨ Características Destacadas

- ✅ **10 tractores** completos con especificaciones
- ✅ **Sistema de filtros** avanzado
- ✅ **Calculadora financiera** fraccionado/contado
- ✅ **WhatsApp directo** con asesores por estado
- ✅ **Responsive 100%** mobile/tablet/desktop
- ✅ **Animaciones suaves** Framer Motion
- ✅ **Diseño profesional** inspirado en John Deere

## 📚 Documentación

- `README.md` - Documentación completa
- `ESTADO_PROYECTO.md` - Estado actual y pendientes
- Este archivo - Guía rápida

---

## 🎯 Empezar Ahora

1. Abre http://localhost:5173/ en tu navegador
2. Navega por la aplicación
3. Prueba los filtros en el catálogo
4. Haz clic en un tractor para ver detalles
5. Usa la calculadora de financiamiento
6. Prueba el botón de WhatsApp

**¡Tu aplicación está lista para personalizar y desplegar! 🚀**

---

*Desarrollado en español para el campo venezolano 🇻🇪*
