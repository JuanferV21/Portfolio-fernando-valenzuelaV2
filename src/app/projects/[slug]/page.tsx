import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, CheckCircle, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug, projects } from "@/data/projects";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  return {
    title: `${project.title} | Juan Fernando Valenzuela`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-8 group">
          <Link href="/projects" className="gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Volver a Proyectos
          </Link>
        </Button>

        {/* Project header */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {project.description}
            </p>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Completado: {new Date(project.completedAt).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="capitalize">{project.category}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button asChild>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Github className="h-4 w-4" />
                  Ver Código
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild variant="outline">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Ver Demo
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Main image */}
        {project.imageUrl && (
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={800}
              height={450}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Descripción del Proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Características Principales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Galería</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {project.gallery.map((image, index) => (
                      <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <Card>
              <CardHeader>
                <CardTitle>Tecnologías</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Enlaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.githubUrl && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <Github className="h-4 w-4" />
                      Repositorio
                    </Link>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Sitio Web
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Project info */}
            <Card>
              <CardHeader>
                <CardTitle>Información</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <div className="font-medium mb-1">Categoría</div>
                  <div className="text-muted-foreground capitalize">{project.category}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Estado</div>
                  <Badge variant={project.featured ? "default" : "secondary"}>
                    {project.featured ? "Destacado" : "Completado"}
                  </Badge>
                </div>
                <div>
                  <div className="font-medium mb-1">Fecha de finalización</div>
                  <div className="text-muted-foreground">
                    {new Date(project.completedAt).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}