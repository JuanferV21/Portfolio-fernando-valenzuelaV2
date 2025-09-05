export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  features?: string[];
  technologies: string[];
  category: "csharp" | "python" | "laravel" | "react";
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  gallery?: string[];
  featured: boolean;
  completedAt: string;
}

// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[áÁ]/g, 'a')
    .replace(/[éÉ]/g, 'e')
    .replace(/[íÍ]/g, 'i')
    .replace(/[óÓ]/g, 'o')
    .replace(/[úÚ]/g, 'u')
    .replace(/[ñÑ]/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

const projectsRaw: Omit<Project, 'slug'>[] = [
  {
    id: "sistema-inventario-net",
    title: "Sistema de Inventario Empresarial",
    description: "Sistema completo de gestión de inventario con WPF y Entity Framework Core para el control de productos, proveedores y reportes financieros.",
    longDescription: "Aplicación de escritorio desarrollada en C# con WPF que permite gestionar el inventario de una empresa mediana. Incluye módulos para control de productos, gestión de proveedores, generación de reportes de ventas, control de stock mínimo con alertas automáticas y sistema de usuarios con diferentes niveles de acceso. La base de datos está implementada con SQL Server y Entity Framework Core para el ORM.",
    technologies: ["C#", "WPF", ".NET 6", "Entity Framework Core", "SQL Server", "MVVM"],
    category: "csharp",
    githubUrl: "https://github.com/juanfernando/sistema-inventario-net",
    imageUrl: "/images/projects/inventario-net.png",
    featured: true,
    completedAt: "2024-08-15"
  },
  {
    id: "api-gestion-tareas-net",
    title: "API REST de Gestión de Tareas",
    description: "API robusta desarrollada en ASP.NET Core con autenticación JWT, documentación Swagger y pruebas unitarias para gestión de proyectos.",
    longDescription: "Web API desarrollada en ASP.NET Core 6 que implementa un sistema completo de gestión de tareas y proyectos. Incluye autenticación y autorización con JWT tokens, endpoints RESTful para CRUD de tareas, proyectos y usuarios, middleware personalizado para manejo de errores, documentación automática con Swagger/OpenAPI, y una suite completa de pruebas unitarias con xUnit. Implementa patrones como Repository, Unit of Work y Dependency Injection.",
    technologies: ["C#", "ASP.NET Core", "Entity Framework", "JWT", "Swagger", "xUnit", "AutoMapper"],
    category: "csharp",
    githubUrl: "https://github.com/juanfernando/api-tareas-net",
    liveUrl: "https://api-tareas.herokuapp.com/swagger",
    imageUrl: "/images/projects/api-tareas-net.png",
    featured: true,
    completedAt: "2024-07-22"
  },
  {
    id: "analizador-datos-python",
    title: "Analizador de Datos de Ventas",
    description: "Herramienta de análisis de datos con Python, Pandas y visualizaciones interactivas usando Plotly para insights de negocio.",
    longDescription: "Aplicación desarrollada en Python que automatiza el análisis de datos de ventas de una empresa retail. Procesa archivos CSV y Excel, limpia y transforma datos usando Pandas y NumPy, genera visualizaciones interactivas con Plotly y Matplotlib, calcula métricas clave de negocio (ROI, conversión, LTV), y exporta reportes automáticos en PDF. Incluye dashboard web con Streamlit para visualización en tiempo real.",
    technologies: ["Python", "Pandas", "NumPy", "Plotly", "Matplotlib", "Streamlit", "SQLite"],
    category: "python",
    githubUrl: "https://github.com/juanfernando/analizador-ventas-python",
    liveUrl: "https://analizador-ventas.streamlit.app",
    imageUrl: "/images/projects/analizador-python.png",
    featured: true,
    completedAt: "2024-06-10"
  },
  {
    id: "scraper-precios-python",
    title: "Monitor de Precios E-commerce",
    description: "Bot automatizado con Python y Selenium que monitorea precios de productos en múltiples tiendas online y envía alertas por email.",
    longDescription: "Sistema automatizado de monitoreo de precios que utiliza web scraping para rastrear productos en diferentes sitios de e-commerce. Implementado con Python, Selenium WebDriver para navegación automatizada, BeautifulSoup para parsing HTML, base de datos SQLite para histórico de precios, sistema de notificaciones por email con smtplib, y scheduler con APScheduler para ejecución automática. Incluye interfaz web simple para configurar productos a monitorear.",
    technologies: ["Python", "Selenium", "BeautifulSoup", "SQLite", "Schedule", "Flask", "SMTP"],
    category: "python",
    githubUrl: "https://github.com/juanfernando/monitor-precios-python",
    imageUrl: "/images/projects/scraper-python.png",
    featured: false,
    completedAt: "2024-05-18"
  },
  {
    id: "ecommerce-laravel",
    title: "Plataforma E-commerce Completa",
    description: "Tienda online desarrollada en Laravel con carrito de compras, pasarela de pagos, panel administrativo y sistema de inventario.",
    longDescription: "Plataforma de comercio electrónico completa desarrollada con Laravel 10. Incluye catálogo de productos con filtros avanzados, carrito de compras persistente, integración con pasarelas de pago (PayPal, Stripe), panel administrativo para gestión de productos y órdenes, sistema de usuarios y roles, gestión de inventario con alertas de stock, sistema de cupones de descuento, y dashboard con métricas de ventas. Implementa mejores prácticas de seguridad y SEO.",
    technologies: ["PHP", "Laravel", "MySQL", "Bootstrap", "Stripe", "PayPal", "Redis"],
    category: "laravel",
    githubUrl: "https://github.com/juanfernando/ecommerce-laravel",
    liveUrl: "https://demo-ecommerce-laravel.herokuapp.com",
    imageUrl: "/images/projects/ecommerce-laravel.png",
    featured: true,
    completedAt: "2024-04-25"
  },
  {
    id: "blog-laravel",
    title: "Sistema de Blog Multi-usuario",
    description: "CMS desarrollado en Laravel con editor WYSIWYG, sistema de comentarios, categorías y panel de administración completo.",
    longDescription: "Sistema de gestión de contenido (CMS) tipo blog desarrollado con Laravel. Permite múltiples autores con diferentes roles (admin, editor, writer), editor WYSIWYG integrado (TinyMCE), sistema de comentarios con moderación, organización por categorías y tags, SEO optimizado con meta tags automáticos, sistema de suscripción por email, búsqueda avanzada, y analíticas básicas. Incluye API REST para headless CMS y sistema de cache con Redis.",
    technologies: ["PHP", "Laravel", "MySQL", "TinyMCE", "Tailwind CSS", "Alpine.js"],
    category: "laravel",
    githubUrl: "https://github.com/juanfernando/blog-laravel",
    imageUrl: "/images/projects/blog-laravel.png",
    featured: false,
    completedAt: "2024-03-12"
  },
  {
    id: "dashboard-react",
    title: "Dashboard Administrativo React",
    description: "Panel de control moderno desarrollado en React con TypeScript, gráficos interactivos y gestión de estado con Redux Toolkit.",
    longDescription: "Dashboard administrativo moderno desarrollado con React 18 y TypeScript. Presenta una interfaz limpia y responsiva para gestión de usuarios, productos y métricas de negocio. Utiliza Redux Toolkit para manejo de estado global, React Query para fetching y cache de datos, Chart.js para visualizaciones interactivas, Material-UI para componentes, autenticación con tokens JWT, tabla de datos avanzada con filtros y paginación, y modo oscuro/claro. Totalmente responsivo y optimizado para performance.",
    technologies: ["React", "TypeScript", "Redux Toolkit", "React Query", "Material-UI", "Chart.js"],
    category: "react",
    githubUrl: "https://github.com/juanfernando/dashboard-react",
    liveUrl: "https://admin-dashboard-react-ts.netlify.app",
    imageUrl: "/images/projects/dashboard-react.png",
    featured: false,
    completedAt: "2024-09-01"
  },
  {
    id: "app-tareas-react",
    title: "Aplicación de Gestión de Tareas",
    description: "Todo app avanzada con React y Context API, drag & drop, filtros, categorías y sincronización con LocalStorage.",
    longDescription: "Aplicación web de gestión de tareas (Todo App) desarrollada con React y Hooks modernos. Implementa funcionalidades avanzadas como drag & drop para reordenar tareas, sistema de categorías con colores personalizados, filtros múltiples (completadas, pendientes, por categoría), búsqueda en tiempo real, fechas de vencimiento con recordatorios, modo oscuro/claro, y sincronización automática con LocalStorage. Interfaz completamente responsive construida con styled-components.",
    technologies: ["React", "Context API", "Hooks", "Styled Components", "React DnD", "Date-fns"],
    category: "react",
    githubUrl: "https://github.com/juanfernando/todo-app-react",
    liveUrl: "https://todo-app-react-advanced.netlify.app",
    imageUrl: "/images/projects/todo-react.png",
    featured: false,
    completedAt: "2024-08-08"
  }
];

// Transform raw projects to add slugs
export const projects: Project[] = projectsRaw.map(project => ({
  ...project,
  slug: createSlug(project.title)
}));

export const getProjectsByCategory = (category: Project["category"]) => {
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id);
};

export const getProjectBySlug = (slug: string) => {
  return projects.find(project => project.slug === slug);
};