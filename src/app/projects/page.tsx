"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Github, Search } from "lucide-react";
import { projects, Project } from "@/data/projects";

const categories = [
  { id: "all", label: "Todos", count: projects.length },
  { id: "csharp", label: "C# / .NET", count: projects.filter(p => p.category === "csharp").length },
  { id: "python", label: "Python", count: projects.filter(p => p.category === "python").length },
  { id: "laravel", label: "Laravel", count: projects.filter(p => p.category === "laravel").length },
  { id: "react", label: "React", count: projects.filter(p => p.category === "react").length },
];

const categoryIcons: Record<Project["category"], string> = {
  csharp: "💜",
  python: "🐍",
  laravel: "🔺",
  react: "⚛️"
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Mis <span className="gradient-text">Proyectos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Una colección de proyectos que he desarrollado utilizando diferentes tecnologías 
            y dominios, desde aplicaciones web hasta análisis de datos.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="gap-2"
            >
              {category.label}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-5xl">
                    {categoryIcons[project.category]}
                  </div>
                </div>
                {project.featured && (
                  <Badge className="absolute top-2 right-2">
                    Destacado
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-4">
                <div className="space-y-2">
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <Link 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <Github className="h-4 w-4" />
                        Código
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <Link 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
                    <Badge variant="outline" className="flex-1 justify-center">
                      En desarrollo
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No se encontraron proyectos</h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda o selecciona una categoría diferente.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              variant="outline"
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{projects.length}</div>
            <div className="text-sm text-muted-foreground">Proyectos Totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {projects.filter(p => p.category === "csharp").length}
            </div>
            <div className="text-sm text-muted-foreground">C# / .NET</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {projects.filter(p => p.category === "python").length}
            </div>
            <div className="text-sm text-muted-foreground">Python</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-muted-foreground">Destacados</div>
          </div>
        </div>
      </div>
    </div>
  );
}