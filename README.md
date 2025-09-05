# Portfolio V2 - Juan Fernando Valenzuela Solís

Un portafolio profesional moderno desarrollado con Next.js 14, TypeScript, Tailwind CSS y shadcn/ui. Presentación profesional de proyectos, habilidades y experiencia de Juan Fernando Valenzuela Solís, estudiante de Ingeniería en Sistemas y desarrollador junior.

## ✨ Características

- **🌙 Modo oscuro elegante** - Diseño profesional optimizado
- **⚡ Rendimiento mejorado** - Scroll nativo, animaciones optimizadas, useReducedMotion
- **🎨 UI moderna** - React Icons, Tailwind CSS + shadcn/ui, hover effects
- **📱 Completamente responsivo** - Mobile-first design
- **🔍 SEO optimizado** - Meta tags, sitemap, robots.txt
- **📧 Formulario real** - Validación Zod + Server Actions con Resend
- **🛠️ Páginas dinámicas** - Proyectos individuales con generateStaticParams
- **📝 Blog con MDX** - Soporte completo para contenido dinámico
- **⌨️ Command Palette** - Navegación rápida con ⌘K
- **♿ Accesibilidad total** - WCAG AA compliant

## 🛠️ Stack Tecnológico

- **Frontend**: React 19, Next.js 14, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Radix UI
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API (opcional)
- **Testing**: Jest, Testing Library
- **Deployment**: Vercel (recomendado)

## 📋 Requisitos Previos

- Node.js 18.17 o superior
- pnpm 8.0 o superior (recomendado)

## 🚀 Instalación y Desarrollo

### 1. Clonar el repositorio

```bash
git clone https://github.com/username/portfoliov2.git
cd portfoliov2
```

### 2. Instalar dependencias

```bash
# Habilitar corepack (si no está habilitado)
corepack enable

# Instalar dependencias
pnpm install
```

### 3. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Editar las variables según tu configuración
```

### 4. Ejecutar en desarrollo

```bash
pnpm dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

## ⚙️ Variables de Entorno

| Variable | Descripción | Requerido | Valor por defecto |
|----------|-------------|-----------|-------------------|
| `SITE_URL` | URL del sitio web | ✅ | `http://localhost:3000` |
| `RESEND_API_KEY` | API key de Resend para emails | ❌ | - |
| `NEXT_PUBLIC_HAS_RESEND_API` | Indica si Resend está configurado | ❌ | `false` |

### Configuración de Email (Opcional)

Para habilitar el envío de emails desde el formulario de contacto:

1. Crea una cuenta en [Resend](https://resend.com/)
2. Obtén tu API key
3. Configura las variables en `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_HAS_RESEND_API=true
```

## 🧪 Testing

```bash
# Ejecutar tests una vez
pnpm test

# Ejecutar tests en modo watch
pnpm test:watch
```

## 🏗️ Build y Producción

```bash
# Construir para producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Verificar tipos
pnpm type-check

# Linting
pnpm lint
```

## 🚀 Deployment

### 🔥 Vercel (Recomendado)

#### Deploy Automático
1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Las configuraciones se detectarán automáticamente
3. Configura las variables de entorno en el panel de Vercel

#### Deploy Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

#### Configurar Variables en Vercel
```bash
# Configurar variables de entorno
vercel env add SITE_URL production
vercel env add RESEND_API_KEY production
vercel env add NEXT_PUBLIC_HAS_RESEND_API production
```

### ⚡ Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

**Build Settings:**
- Build Command: `pnpm build`
- Publish Directory: `.next`
- Node Version: `18.17.0`

### 🐳 Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable pnpm

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

```bash
# Build Docker image
docker build -t portfolio-v2 .

# Run container
docker run -p 3000:3000 -e SITE_URL=https://yourdomain.com portfolio-v2
```

### 🌐 Static Export (GitHub Pages, S3, CDN)

Para deployment estático, actualiza `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

```bash
# Build static files
pnpm build

# Output estará en ./out/
```

## 🏗️ Configuración del Entorno de Desarrollo

### IDEs Recomendados

**Visual Studio Code** con las siguientes extensiones:
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense  
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

**Configuración VSCode (`.vscode/settings.json`):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    "cn\\(([^)]*)\\)",
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm dev:turbo        # Desarrollo con Turbopack

# Build y producción
pnpm build            # Build para producción
pnpm start            # Servidor de producción
pnpm preview          # Preview del build local

# Calidad de código
pnpm lint             # ESLint
pnpm lint:fix         # Arreglar errores de ESLint
pnpm type-check       # Verificar tipos TypeScript
pnpm format           # Formatear código con Prettier

# Testing
pnpm test             # Ejecutar tests
pnpm test:watch       # Tests en modo watch
pnpm test:coverage    # Coverage report

# Utilidades
pnpm clean            # Limpiar cache
pnpm analyze          # Analizar bundle size
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router pages
│   ├── about/             # Página Acerca de
│   ├── blog/              # Blog con MDX + búsqueda
│   │   └── [slug]/        # Artículos individuales
│   ├── contact/           # Formulario de contacto
│   │   └── actions.ts     # Server Actions
│   ├── experience/        # Experiencia con Accordion
│   ├── legal/            # Páginas legales
│   │   └── privacy/       # Política de privacidad
│   ├── projects/         # Portafolio de proyectos
│   │   └── [slug]/        # Proyectos individuales
│   ├── skills/           # Habilidades con React Icons
│   ├── globals.css       # Estilos globales
│   ├── layout.tsx        # Layout principal
│   ├── loading.tsx       # Loading UI
│   ├── not-found.tsx     # Página 404
│   ├── robots.ts         # Robots.txt generado
│   └── sitemap.ts        # Sitemap generado
├── components/
│   ├── site/             # Componentes específicos
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MotionSection.tsx
│   │   └── SmoothScroll.tsx
│   └── ui/               # Componentes shadcn/ui
│       ├── accordion.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── tabs.tsx
│       └── ...
├── data/                 # Datos estructurados
│   ├── blog.ts          # Artículos de blog
│   ├── experience.ts    # Experiencia profesional  
│   ├── profile.ts       # Información personal
│   ├── projects.ts      # Proyectos destacados
│   └── skills.ts        # Habilidades técnicas
├── hooks/               # Custom hooks
│   └── useReducedMotion.ts
├── lib/                 # Utilidades y configuración
│   ├── fonts.ts         # Configuración de fuentes
│   └── utils.ts         # Funciones utility
└── styles/              # Estilos adicionales
    └── globals.css      # CSS global
```

## 🎨 Personalización

### Modificar Información Personal

Edita los archivos en `src/data/`:

- `profile.ts` - Información personal y contacto
- `projects.ts` - Proyectos y descripción
- `skills.ts` - Habilidades técnicas
- `experience.ts` - Experiencia profesional

### Personalizar Diseño

Los tokens de diseño están en `src/styles/globals.css`:

```css
.dark {
  --background: 222 40% 10%;     /* Fondo principal */
  --primary: 221 83% 53%;        /* Color primario */
  --accent: 280 70% 60%;         /* Color de acento */
  /* ... más variables */
}
```

## 🧩 shadcn/ui MCP para Claude Code

Este proyecto incluye configuración de shadcn MCP para Claude Code:

### Inicializar MCP

```bash
pnpm dlx shadcn@latest mcp init --client claude
```

### Ejemplos de Prompts para Claude

- \"List components from the shadcn registry\"
- \"Install a Hero section and a Features block\"
- \"Create a dashboard layout with sidebar and header\"
- \"Add a Testimonials block and a Pricing section\"

## 📱 Características Técnicas

### Performance
- **SSG/ISR** - Páginas estáticas generadas
- **Optimización de imágenes** - Next.js Image Component
- **Code splitting** - Carga automática optimizada
- **Font optimization** - Google Fonts con display=swap

### SEO
- **Meta tags dinámicos** - Por página
- **Open Graph** - Tarjetas sociales
- **Sitemap.xml** - Generado automáticamente
- **Robots.txt** - Configuración de crawlers

### Accesibilidad
- **Contraste AA** - Colores accesibles
- **Navegación por teclado** - Completamente funcional
- **ARIA labels** - Screen readers compatible
- **Semántica HTML5** - Estructura correcta

## 🐛 Troubleshooting

### Problemas Comunes

**Error de tipos en React 19:**
```bash
# Asegúrate de tener las versiones correctas
pnpm add @types/react@latest @types/react-dom@latest
```

**Error en build con shadcn:**
```bash
# Reinstala las dependencias de Radix
pnpm add @radix-ui/react-slot @radix-ui/react-separator
```

**Formulario de contacto no funciona:**
- Verifica que `NEXT_PUBLIC_HAS_RESEND_API` esté en `true`
- Confirma que `RESEND_API_KEY` sea válido
- Revisa los logs del servidor

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [ISC License](LICENSE).

## 👨‍💻 Autor

**Juan Fernando Valenzuela Solís**
- Estudiante de Ingeniería en Sistemas (21 años)
- Desarrollador Junior especializado en C#/.NET, Python, Laravel, React
- 📧 Email: juan.fernando@example.com
- 🐙 GitHub: [@juanfernando](https://github.com/juanfernando)
- 💼 LinkedIn: [Juan Fernando Valenzuela](https://linkedin.com/in/juanfernando)

---

⭐ Si este proyecto te es útil, ¡no olvides darle una estrella!