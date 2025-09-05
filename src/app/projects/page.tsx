"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Search } from "lucide-react";
import { SiSharp, SiPython, SiLaravel, SiReact } from "react-icons/si";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects, Project } from "@/data/projects";

const categories = [
  { id: "all", label: "Todos", count: projects.length },
  { id: "csharp", label: "C# / .NET", count: projects.filter(p => p.category === "csharp").length },
  { id: "python", label: "Python", count: projects.filter(p => p.category === "python").length },
  { id: "laravel", label: "Laravel", count: projects.filter(p => p.category === "laravel").length },
  { id: "react", label: "React", count: projects.filter(p => p.category === "react").length },
];

const categoryIcons: Record<Project["category"], { icon: React.ComponentType<any>, color: string }> = {
  csharp: { icon: SiSharp, color: "text-purple-500" },
  python: { icon: SiPython, color: "text-yellow-500" },
  laravel: { icon: SiLaravel, color: "text-red-500" },
  react: { icon: SiReact, color: "text-blue-500" }
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

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
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary/10 rounded-md z-0"
              layoutId="category-indicator"
              initial={false}
              animate={{ 
                x: selectedCategory === "all" ? 0 : 
                   selectedCategory === "csharp" ? "100%" :
                   selectedCategory === "python" ? "200%" :
                   selectedCategory === "laravel" ? "300%" : "400%",
                width: "20%"
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="relative z-10"
              >
                <span className="flex items-center gap-2">
                  {category.label}
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => {
            const IconComponent = categoryIcons[project.category].icon;
            const iconColor = categoryIcons[project.category].color;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={shouldReduceMotion ? {} : { y: -5 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover-glow h-full">
                  <Link href={`/projects/${project.slug}`}>
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      {project.imageUrl ? (
                        <>
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <IconComponent className={`text-6xl ${iconColor}`} />
                        </div>
                      )}
                      {project.featured && (
                        <Badge className="absolute top-2 right-2">
                          Destacado
                        </Badge>
                      )}
                    </div>
                  </Link>
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
                
                <div className="space-y-2">
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/projects/${project.slug}`}>
                      Ver Detalles
                    </Link>
                  </Button>
                  
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
                  </div>
                </div>
                </CardContent>
              </Card>
            </motion.div>
            )
          })}
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