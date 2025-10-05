# Tractores BEL Venezuela - Aplicación Web SPA

Aplicación web moderna tipo SPA desarrollada con React + Vite para Tractores BEL Venezuela. Catálogo completo de tractores con sistema de recomendación, comparador, calculadora de financiamiento y asesores regionales.

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router v6** - Enrutamiento
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
tractores-bel/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── home/           # Componentes del home
│   │   ├── catalog/        # Componentes del catálogo
│   │   ├── quiz/           # Sistema de recomendación
│   │   ├── financing/      # Calculadora financiera
│   │   ├── contact/        # WhatsApp CTA y contacto
│   │   └── common/         # Button, Card, Badge
│   ├── data/               # Datos de tractores, asesores, quiz
│   ├── utils/              # Utilidades y helpers
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Páginas principales
│   ├── styles/             # Estilos globales
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Entry point
├── public/
│   └── assets/             # Imágenes y recursos estáticos
├── tailwind.config.js      # Configuración de Tailwind
├── vite.config.js          # Configuración de Vite
└── package.json
```

## 🎨 Paleta de Colores

La aplicación utiliza una paleta inspirada en John Deere:

- **Verde BEL (Principal)**: `#367C2B` (bel-green-500)
- **Amarillo BEL**: `#FFDE00` (bel-yellow)
- Escala completa de verdes: 50-900

## 📱 Features Implementadas

### ✅ Fase 1 (Completada)
- [x] Homepage con Hero impactante
- [x] Componente Categories
- [x] Featured Tractors
- [x] WhyBEL section
- [x] Testimonios
- [x] Header responsive con menú móvil
- [x] Footer completo
- [x] Catálogo con sistema de filtros
- [x] TractorCard component
- [x] Página de detalle del tractor
- [x] Calculadora de financiamiento
- [x] WhatsApp CTA con asesores regionales
- [x] Sistema de datos completo (10 tractores)
- [x] Routing con React Router

### 🚧 Por Implementar (Fase 2-3)
- [ ] Quiz de recomendación completo
- [ ] Comparador de tractores
- [ ] Página de contacto con mapa
- [ ] Optimizaciones de performance
- [ ] SEO y meta tags
- [ ] Integración con Analytics

## 🚜 Tractores Disponibles

La aplicación incluye 10 modelos de tractores:

1. **BEL 50** - Chocotero (50 HP) - Compacto
2. **BEL 60** (60 HP) - Versátil ✨ Entrega Inmediata
3. **BEL 75** - Palmero (75 HP) - Especializado
4. **BEL 90** (90 HP) - Alto Rendimiento ✨ Entrega Inmediata
5. **BEL 105** - Ganadero (105 HP) - Ganadería
6. **BEL 110** (110 HP) - Alto Rendimiento ✨ Entrega Inmediata
7. **BEL 140** - Maicero (140 HP) - Trabajo Pesado
8. **BEL 150** (150 HP) - Trabajo Pesado ✨ Entrega Inmediata
9. **BEL 220** - El Padrote (220 HP) - Trabajo Pesado ✨ Entrega Inmediata

## 💰 Opciones de Financiamiento

- **Compra Directa Fraccionada**: 6 cuotas sin interés
- **Pago de Contado**: Precio de contado + IGTF (3%)

## 📍 Asesores Regionales

Asesores disponibles en:
- Distrito Capital / Miranda
- Zulia
- Lara
- Portuguesa
- Guárico
- Aragua
- Carabobo
- Barinas
- Apure

## 🌐 Deployment en VPS

### 1. Build de Producción

```bash
npm run build
```

Esto generará la carpeta `dist/` con los archivos optimizados.

### 2. Configuración NGINX

Crear archivo de configuración en `/etc/nginx/sites-available/tractoresbel`:

```nginx
server {
    listen 80;
    server_name tractoresbel.com www.tractoresbel.com;
    root /var/www/tractores-bel/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compresión gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
}
```

### 3. Activar el sitio

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/tractoresbel /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar nginx
sudo systemctl restart nginx
```

### 4. SSL con Let's Encrypt

```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d tractoresbel.com -d www.tractoresbel.com

# Renovación automática
sudo certbot renew --dry-run
```

### 5. Subir archivos al VPS

```bash
# Desde tu máquina local
scp -r dist/ user@your-vps:/var/www/tractores-bel/

# O usando rsync
rsync -avz --delete dist/ user@your-vps:/var/www/tractores-bel/dist/
```

## 🔄 Actualización del Sitio

```bash
# 1. Build local
npm run build

# 2. Subir al VPS
rsync -avz --delete dist/ user@your-vps:/var/www/tractores-bel/dist/

# 3. Limpiar cache de nginx (opcional)
ssh user@your-vps "sudo systemctl reload nginx"
```

## 📝 Variables de Entorno (Opcional)

Si necesitas configurar variables de entorno, crea un archivo `.env`:

```env
VITE_API_URL=https://api.tractoresbel.com
VITE_WHATSAPP_NUMBER=+584145041522
```

## 🎯 Optimizaciones Recomendadas

1. **Lazy Loading** - Implementar carga diferida de imágenes
2. **Code Splitting** - Separar código por rutas
3. **PWA** - Convertir en Progressive Web App
4. **Analytics** - Integrar Google Analytics o similar
5. **CDN** - Usar CDN para assets estáticos

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Imágenes no cargan
- Verificar que las imágenes estén en `public/assets/`
- Los paths deben comenzar con `/assets/`

### Routing no funciona en producción
- Verificar configuración de nginx con `try_files`
- El archivo `index.html` debe ser el fallback

## 📧 Contacto

- **Teléfono**: 0414-504-1522
- **WhatsApp**: +584145041522
- **Email**: info@tractoresbel.com

## 📄 Licencia

© 2025 Tractores BEL Venezuela. Todos los derechos reservados.

---

**Desarrollado con ❤️ para el campo venezolano**
