export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      {
        name: "React",
        level: "Advanced",
        description: "Desarrollo de aplicaciones SPA con hooks, context API y bibliotecas del ecosistema",
        icon: "⚛️"
      },
      {
        name: "TypeScript",
        level: "Advanced", 
        description: "Tipado estático para JavaScript, interfaces, generics y configuración avanzada",
        icon: "🔷"
      },
      {
        name: "Next.js",
        level: "Intermediate",
        description: "Framework de React para SSR, SSG y aplicaciones full-stack",
        icon: "▲"
      },
      {
        name: "HTML5 & CSS3",
        level: "Advanced",
        description: "Semántica moderna, flexbox, grid, animaciones y diseño responsivo",
        icon: "🌐"
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        description: "Framework CSS utility-first para diseño rápido y consistente",
        icon: "💨"
      },
      {
        name: "JavaScript (ES6+)",
        level: "Advanced",
        description: "Programación moderna con async/await, destructuring, modules y nuevas APIs",
        icon: "📝"
      }
    ]
  },
  {
    category: "Backend",
    skills: [
      {
        name: "C# / .NET",
        level: "Advanced",
        description: "Desarrollo con .NET Core/5+, ASP.NET Core, Entity Framework y arquitecturas limpias",
        icon: "💜"
      },
      {
        name: "Python",
        level: "Advanced",
        description: "Desarrollo web con Flask/Django, análisis de datos y automatización",
        icon: "🐍"
      },
      {
        name: "PHP / Laravel",
        level: "Advanced",
        description: "Framework PHP para desarrollo rápido con Eloquent ORM y arquitectura MVC",
        icon: "🔺"
      },
      {
        name: "Node.js",
        level: "Intermediate",
        description: "Runtime de JavaScript para backend, APIs REST y microservicios",
        icon: "💚"
      },
      {
        name: "SQL Server",
        level: "Intermediate",
        description: "Diseño de bases de datos, queries complejas, stored procedures y optimización",
        icon: "🗄️"
      },
      {
        name: "MySQL",
        level: "Intermediate",
        description: "Gestión de bases de datos relacionales, normalización y consultas avanzadas",
        icon: "🐬"
      }
    ]
  },
  {
    category: "DevOps & Tools",
    skills: [
      {
        name: "Git & GitHub",
        level: "Advanced",
        description: "Control de versiones, branching strategies, pull requests y CI/CD básico",
        icon: "📚"
      },
      {
        name: "Docker",
        level: "Intermediate",
        description: "Containerización de aplicaciones y orquestación básica",
        icon: "🐳"
      },
      {
        name: "Linux/Unix",
        level: "Intermediate",
        description: "Administración básica de servidores, bash scripting y deployment",
        icon: "🐧"
      },
      {
        name: "VS Code",
        level: "Expert",
        description: "Editor principal con extensiones, debugging y configuración avanzada",
        icon: "💙"
      },
      {
        name: "Postman",
        level: "Advanced",
        description: "Testing de APIs REST, automatización de pruebas y documentación",
        icon: "📮"
      }
    ]
  },
  {
    category: "Data & Analytics",
    skills: [
      {
        name: "Pandas",
        level: "Intermediate",
        description: "Manipulación y análisis de datos estructurados en Python",
        icon: "🐼"
      },
      {
        name: "NumPy",
        level: "Intermediate",
        description: "Computación científica y operaciones con arrays multidimensionales",
        icon: "🔢"
      },
      {
        name: "Matplotlib/Plotly",
        level: "Intermediate",
        description: "Visualización de datos estática e interactiva",
        icon: "📊"
      },
      {
        name: "Excel Avanzado",
        level: "Advanced",
        description: "Fórmulas complejas, tablas dinámicas, macros VBA y análisis de datos",
        icon: "📈"
      }
    ]
  },
  {
    category: "Soft Skills",
    skills: [
      {
        name: "Resolución de Problemas",
        level: "Advanced",
        description: "Análisis sistemático de problemas complejos y búsqueda de soluciones eficientes",
        icon: "🧩"
      },
      {
        name: "Aprendizaje Autónomo",
        level: "Expert",
        description: "Capacidad para adquirir nuevas tecnologías y conceptos de manera independiente",
        icon: "📚"
      },
      {
        name: "Trabajo en Equipo",
        level: "Advanced",
        description: "Colaboración efectiva en proyectos grupales y comunicación técnica",
        icon: "👥"
      },
      {
        name: "Gestión del Tiempo",
        level: "Advanced",
        description: "Organización de tareas, priorización y cumplimiento de deadlines",
        icon: "⏰"
      },
      {
        name: "Pensamiento Crítico",
        level: "Advanced",
        description: "Evaluación objetiva de soluciones y toma de decisiones fundamentadas",
        icon: "🤔"
      }
    ]
  }
];

export const getSkillsByCategory = (category: string) => {
  return skills.find(skillGroup => skillGroup.category === category)?.skills || [];
};

export const getAllSkills = () => {
  return skills.flatMap(category => category.skills);
};