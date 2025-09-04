export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  type: "education" | "work" | "project" | "certification";
  startDate: string;
  endDate?: string; // undefined means current
  description: string[];
  technologies?: string[];
  achievements?: string[];
  location?: string;
  isRemote?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    id: "universidad-sistemas",
    title: "Ingeniería en Sistemas",
    organization: "Universidad de San Carlos de Guatemala",
    type: "education",
    startDate: "2022-01",
    endDate: "2026-12",
    location: "Guatemala, Guatemala",
    description: [
      "Cursando carrera de Ingeniería en Sistemas con enfoque en desarrollo de software y arquitectura de sistemas.",
      "Materias relevantes: Programación Orientada a Objetos, Estructuras de Datos, Bases de Datos, Ingeniería de Software.",
      "Participación activa en proyectos universitarios aplicando metodologías ágiles y buenas prácticas de desarrollo."
    ],
    achievements: [
      "Promedio académico: 85/100",
      "Proyecto destacado: Sistema de gestión universitaria con Laravel",
      "Participación en hackathon universitario - 2do lugar"
    ]
  },
  {
    id: "freelance-developer",
    title: "Desarrollador Freelance",
    organization: "Proyectos Independientes",
    type: "work",
    startDate: "2023-03",
    location: "Guatemala",
    isRemote: true,
    description: [
      "Desarrollo de aplicaciones web personalizadas para pequeñas y medianas empresas locales.",
      "Implementación de sistemas de gestión de inventario, sitios web corporativos y herramientas de productividad.",
      "Consultoría técnica para migración de sistemas legacy a tecnologías modernas."
    ],
    technologies: ["C#", ".NET Core", "React", "Laravel", "MySQL", "Tailwind CSS"],
    achievements: [
      "5+ proyectos completados exitosamente",
      "100% satisfacción del cliente",
      "Desarrollo de sistema que redujo tiempo de facturación en 60%"
    ]
  },
  {
    id: "practica-sistemas",
    title: "Práctica Profesional - Desarrollador Jr",
    organization: "TechSolutions Guatemala",
    type: "work",
    startDate: "2024-01",
    endDate: "2024-04",
    location: "Guatemala, Guatemala",
    description: [
      "Desarrollo de módulos para sistema ERP empresarial utilizando ASP.NET Core.",
      "Colaboración en equipo ágil con metodología Scrum, participando en dailys y sprint reviews.",
      "Implementación de APIs REST y optimización de consultas a base de datos."
    ],
    technologies: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "Angular", "Bootstrap"],
    achievements: [
      "Desarrollé 3 módulos críticos del sistema en tiempo récord",
      "Propuse optimización que mejoró performance de consultas en 40%",
      "Recibí mentoría de desarrolladores senior y Tech Lead"
    ]
  },
  {
    id: "proyecto-analisis-datos",
    title: "Proyecto de Análisis de Datos",
    organization: "Proyecto Personal",
    type: "project",
    startDate: "2024-05",
    endDate: "2024-06",
    description: [
      "Desarrollo de herramienta de análisis de datos de ventas para empresa retail local.",
      "Automatización de reportes mensuales y visualizaciones interactivas para toma de decisiones.",
      "Implementación de dashboard web para monitoreo en tiempo real de KPIs de negocio."
    ],
    technologies: ["Python", "Pandas", "Plotly", "Streamlit", "SQLite", "Excel"],
    achievements: [
      "Redujo tiempo de generación de reportes de 8 horas a 15 minutos",
      "Dashboard adoptado por 3 departamentos de la empresa",
      "Identificó oportunidades de crecimiento que generaron 15% más ingresos"
    ]
  },
  {
    id: "certificacion-azure",
    title: "Microsoft Azure Fundamentals",
    organization: "Microsoft",
    type: "certification",
    startDate: "2024-03",
    endDate: "2024-03",
    description: [
      "Certificación oficial de Microsoft Azure cubriendo conceptos fundamentales de cloud computing.",
      "Conocimientos en servicios de Azure, seguridad, privacidad, compliance y pricing."
    ],
    achievements: [
      "Certificación AZ-900 obtenida con 850/1000 puntos",
      "Conocimientos aplicados en deployment de aplicaciones web"
    ]
  },
  {
    id: "curso-react-avanzado",
    title: "React Avanzado y Next.js",
    organization: "Platzi",
    type: "certification",
    startDate: "2023-08",
    endDate: "2023-10",
    description: [
      "Curso especializado en React avanzado, hooks customizados, optimización de performance.",
      "Desarrollo de aplicaciones con Next.js, SSR, SSG y mejores prácticas de SEO."
    ],
    technologies: ["React", "Next.js", "TypeScript", "Vercel"],
    achievements: [
      "Completado con 95% de progreso",
      "Proyecto final: E-commerce con Next.js y Stripe",
      "Top 5% de estudiantes del curso"
    ]
  },
  {
    id: "hackathon-guatemala",
    title: "Hackathon Nacional Guatemala Tech",
    organization: "Guatemala Tech Community",
    type: "project",
    startDate: "2023-11",
    endDate: "2023-11",
    location: "Guatemala, Guatemala",
    description: [
      "Participación en hackathon de 48 horas enfocado en soluciones tecnológicas para educación.",
      "Desarrollo de plataforma web para conectar estudiantes con tutores locales."
    ],
    technologies: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
    achievements: [
      "2do lugar en categoría 'Impacto Social'",
      "Prototipo funcional desarrollado en 48 horas",
      "Pitch presentado ante jurado de empresarios y CTOs"
    ]
  }
];

export const getExperienceByType = (type: ExperienceItem["type"]) => {
  return experience.filter(item => item.type === type);
};

export const getCurrentExperience = () => {
  return experience.filter(item => !item.endDate);
};

export const getExperienceById = (id: string) => {
  return experience.find(item => item.id === id);
};