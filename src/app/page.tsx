import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DownloadCV } from "@/components/site/DownloadCV";
import { ArrowRight, Code, Database, Globe } from "lucide-react";
import { profile } from "@/data/profile";
import { getFeaturedProjects } from "@/data/projects";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const mainStacks = [
    {
      icon: Code,
      name: "C# / .NET",
      description: "Desarrollo backend robusto con ASP.NET Core, Entity Framework y arquitecturas escalables",
      technologies: ["C#", "ASP.NET Core", "Entity Framework", "Web APIs"]
    },
    {
      icon: Database,
      name: "Python",
      description: "Análisis de datos, automatización y desarrollo web con frameworks modernos",
      technologies: ["Python", "Pandas", "Flask", "Django", "Selenium"]
    },
    {
      icon: Globe,
      name: "Laravel & React",
      description: "Full-stack development con PHP/Laravel backend y React/TypeScript frontend",
      technologies: ["Laravel", "React", "TypeScript", "MySQL"]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hola, soy{" "}
                <span className="gradient-text">
                  Juan Fernando
                </span>
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl">
                {profile.role}
              </p>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                {profile.tagline}. Especializado en <strong>C#/.NET</strong>, <strong>Python</strong>, 
                <strong> Laravel</strong> y <strong>React</strong> con TypeScript.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/projects">
                  Ver Proyectos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <DownloadCV />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 blur-3xl absolute inset-0"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 bg-card border rounded-full flex items-center justify-center">
                <div className="text-6xl md:text-7xl">👨‍💻</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container py-12 md:py-24">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Proyectos Destacados
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto text-lg">
              Una selección de mis proyectos más recientes que demuestran mi experiencia 
              en diferentes tecnologías y dominios.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project) => (
              <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-4xl">
                      {project.category === "csharp" ? "💜" : 
                       project.category === "python" ? "🐍" : 
                       project.category === "laravel" ? "🔺" : "⚛️"}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/projects`}>
                      Ver Detalles
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                Ver Todos los Proyectos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container py-12 md:py-24 bg-muted/30">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Stack Principal
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto text-lg">
              Las tecnologías con las que trabajo diariamente para crear 
              soluciones modernas y escalables.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mainStacks.map((stack, index) => {
              const Icon = stack.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <CardTitle>{stack.name}</CardTitle>
                    <CardDescription>
                      {stack.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap justify-center gap-1">
                      {stack.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 md:py-24">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            ¿Listo para colaborar?
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
            Estoy disponible para proyectos freelance, prácticas profesionales 
            o simplemente para conversar sobre tecnología.
          </p>
          <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Ponerse en Contacto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">
                Conocer Más Sobre Mí
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}