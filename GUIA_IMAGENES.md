# 📸 Guía de Imágenes - Tractores BEL

## 📁 Estructura de Carpetas

```
public/assets/
├── tractores/          # Imágenes individuales de tractores
│   ├── bel50.jpg
│   ├── bel60.jpg
│   ├── bel75.jpg
│   ├── bel90.jpg
│   ├── bel105.jpg
│   ├── bel110.jpg
│   ├── bel140.jpg
│   ├── bel150.jpg
│   └── bel220.jpg
├── categories/         # Imágenes de categorías
│   ├── compacto.jpg
│   ├── versatil.jpg
│   ├── alto-rendimiento.jpg
│   └── trabajo-pesado.jpg
├── hero-tractor.jpg    # Imagen principal del hero
├── logo-bel.png        # Logo BEL (opcional)
└── logo-jac-sac.png    # Logo JAC/SAC (opcional)
```

## 🎨 Especificaciones Recomendadas

### Imágenes de Tractores Individuales
- **Formato**: JPG o WebP
- **Dimensiones**: 800x600px (4:3) o 1200x800px para alta resolución
- **Peso**: Máximo 200KB por imagen
- **Background**: Fondo blanco limpio o campo abierto
- **Ángulo**: Vista lateral-frontal a 45°

### Hero Image
- **Formato**: JPG o WebP
- **Dimensiones**: 1920x1080px (Full HD)
- **Peso**: Máximo 500KB
- **Contenido**: Tractor trabajando en el campo, preferiblemente con movimiento

### Categorías
- **Formato**: JPG o WebP
- **Dimensiones**: 600x800px (3:4 vertical)
- **Peso**: Máximo 150KB por imagen
- **Estilo**: Acción, tractor trabajando

## 🛠️ Herramientas de Optimización

### Online (Gratis)
1. **TinyPNG** - https://tinypng.com/
   - Sube tus JPG/PNG
   - Descarga versión optimizada

2. **Squoosh** - https://squoosh.app/
   - Convierte a WebP
   - Ajusta calidad vs tamaño

3. **Compressor.io** - https://compressor.io/
   - Compresión sin pérdida visible

### Desktop (Gratis)
- **ImageMagick** (línea de comandos)
  ```bash
  # Redimensionar y optimizar
  convert input.jpg -resize 800x600 -quality 85 output.jpg
  ```

- **GIMP** - Editor gratuito
  - Exportar con calidad 85-90%

## 📋 Checklist de Imágenes

### Esenciales (Prioridad Alta)
- [ ] bel60.jpg (Entrega inmediata - el más importante)
- [ ] bel90.jpg (Entrega inmediata)
- [ ] bel110.jpg (Entrega inmediata)
- [ ] bel150.jpg (Entrega inmediata)
- [ ] bel220.jpg (Entrega inmediata - "El Padrote")
- [ ] hero-tractor.jpg (Primera impresión)

### Importantes (Prioridad Media)
- [ ] bel50.jpg (Chocotero)
- [ ] bel75.jpg (Palmero)
- [ ] bel105.jpg (Ganadero)
- [ ] bel140.jpg (Maicero)

### Categorías
- [ ] categories/compacto.jpg
- [ ] categories/versatil.jpg
- [ ] categories/alto-rendimiento.jpg
- [ ] categories/trabajo-pesado.jpg

### Opcionales
- [ ] logo-bel.png
- [ ] logo-jac-sac.png
- [ ] favicon.ico

## 🖼️ Cómo Agregar las Imágenes

### Método 1: Arrastrar y Soltar
1. Abre la carpeta `public/assets/tractores/`
2. Arrastra tus imágenes ahí
3. Asegúrate que tengan el nombre correcto (ej: `bel60.jpg`)

### Método 2: Terminal
```bash
# Desde la raíz del proyecto
cp ~/Descargas/foto-tractor-60.jpg public/assets/tractores/bel60.jpg
```

### Método 3: Finder/Explorador
1. Navega a la carpeta del proyecto
2. Abre `public/assets/tractores/`
3. Copia y pega tus imágenes
4. Renombra según corresponda

## ✅ Verificación

Después de agregar imágenes:

1. Reinicia el servidor de desarrollo:
   ```bash
   # Detener con Ctrl+C
   npm run dev
   ```

2. Visita http://localhost:5173/catalogo

3. Las imágenes deberían aparecer automáticamente

4. Si no aparecen:
   - Verifica el nombre del archivo (sensible a mayúsculas/minúsculas)
   - Verifica la extensión (.jpg, .png, .webp)
   - Revisa la ruta en `src/data/tractores.js`

## 🎯 Mejores Prácticas

### DO ✅
- Usa JPG para fotos (mejor compresión)
- Usa PNG para logos con transparencia
- Usa WebP para mejor calidad/tamaño
- Optimiza antes de subir
- Mantén nombres consistentes
- Usa lowercase (bel60.jpg no BEL60.JPG)

### DON'T ❌
- No uses imágenes > 1MB
- No uses dimensiones muy grandes
- No uses espacios en nombres ("bel 60.jpg" ❌)
- No uses caracteres especiales
- No uses BMP o formatos sin comprimir

## 🔄 Fallback Automático

La aplicación usa imágenes de Unsplash como fallback:
- Si falta una imagen, se muestra un placeholder
- No hay errores si faltan imágenes
- Puedes ir agregando imágenes gradualmente

## 📊 Conversión a WebP (Opcional, Recomendado)

WebP ofrece 25-35% mejor compresión que JPG:

```bash
# Usando cwebp (instalar desde: https://developers.google.com/speed/webp/download)
cwebp -q 85 input.jpg -o output.webp

# Batch conversion
for file in *.jpg; do cwebp -q 85 "$file" -o "${file%.jpg}.webp"; done
```

Luego actualiza en `src/data/tractores.js`:
```javascript
imageUrl: '/assets/tractores/bel60.webp'  // en lugar de .jpg
```

## 🎨 Edición Rápida

Si necesitas editar las imágenes:

### Recortar/Redimensionar
1. Abre en Preview (Mac) o Paint (Windows)
2. Ajusta dimensiones a 800x600
3. Exporta con calidad alta

### Mejorar Brillo/Contraste
1. Usa Photos (Mac) o Photos (Windows)
2. Ajustes automáticos
3. Exporta

### Remover Fondo
- **Remove.bg** - https://www.remove.bg/
- Sube foto, descarga sin fondo
- Úsalo para logos o imágenes de productos

## 🚀 Después de Agregar Imágenes

1. **Verifica calidad** - Zoom al 100% en navegador
2. **Prueba mobile** - Abre DevTools > Modo responsive
3. **Chequea velocidad** - Las páginas deben cargar rápido
4. **Optimiza más** si alguna imagen > 300KB

## 📞 ¿Necesitas Ayuda?

Si tienes problemas con las imágenes:
1. Verifica que estén en la carpeta correcta
2. Revisa la consola del navegador (F12) por errores
3. Compara el nombre en `tractores.js` con el archivo real
4. Asegúrate que la extensión sea correcta (.jpg no .jpeg)

---

**Tip**: Empieza con 2-3 imágenes de los tractores más importantes (BEL 60, 110, 220) y ve agregando gradualmente. La app funciona perfectamente con placeholders mientras tanto.
