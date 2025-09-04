"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DownloadCV } from "@/components/site/DownloadCV";
import { MotionSection, FadeUpDiv } from "@/components/site/MotionSection";
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

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="container py-12 md:py-24 lg:py-32 relative"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="grid-pattern opacity-30" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <motion.div 
            className="flex flex-col justify-center space-y-6"
            variants={itemVariants}
          >
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                variants={itemVariants}
              >
                <Balancer>
                  Hola, soy{" "}
                  <motion.span 
                    className="gradient-text"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Juan Fernando
                  </motion.span>
                </Balancer>
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground md:text-2xl"
                variants={itemVariants}
              >
                <Balancer>{profile.role}</Balancer>
              </motion.p>
              <motion.p 
                className="text-lg text-muted-foreground max-w-[600px]"
                variants={itemVariants}
              >
                <Balancer>
                  {profile.tagline}. Especializado en <strong>C#/.NET</strong>, <strong>Python</strong>, 
                  <strong> Laravel</strong> y <strong>React</strong> con TypeScript.
                </Balancer>
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col gap-3 min-[400px]:flex-row"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="group">
                  <Link href="/projects">
                    Ver Proyectos
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
              <DownloadCV />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center"
            variants={avatarVariants}
          >
            <div className="relative">
              <motion.div 
                className="w-72 h-72 md:w-80 md:h-80 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 blur-3xl absolute inset-0"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="relative w-72 h-72 md:w-80 md:h-80 bg-card/50 backdrop-blur-sm border rounded-full flex items-center justify-center hover-glow"
                whileHover={{ scale: 1.05, rotateY: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="text-6xl md:text-7xl"
                  animate={{ 
                    rotateY: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  👨‍💻
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <MotionSection className="container py-12 md:py-24">
        <div className="space-y-6">
          <FadeUpDiv className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <Balancer>Proyectos Destacados</Balancer>
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto text-lg">
              <Balancer>
                Una selección de mis proyectos más recientes que demuestran mi experiencia 
                en diferentes tecnologías y dominios.
              </Balancer>
            </p>
          </FadeUpDiv>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <FadeUpDiv key={project.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover-glow">
                    <motion.div 
                      className="aspect-video bg-muted relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <motion.div 
                          className="text-4xl"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {project.category === "csharp" ? "💜" : 
                           project.category === "python" ? "🐍" : 
                           project.category === "laravel" ? "🔺" : "⚛️"}
                        </motion.div>
                      </div>
                    </motion.div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                          >
                            <Badge variant="secondary" className="text-xs hover:scale-105 transition-transform">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button asChild variant="outline" className="w-full group-hover:border-primary transition-colors">
                          <Link href="/projects">
                            Ver Detalles
                          </Link>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeUpDiv>
            ))}
          </div>
          
          <FadeUpDiv className="text-center" delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  Ver Todos los Proyectos
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </FadeUpDiv>
        </div>
      </MotionSection>

      {/* Tech Stack */}
      <MotionSection className="container py-12 md:py-24 bg-gradient-to-br from-muted/30 to-muted/10">
        <div className="space-y-6">
          <FadeUpDiv className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              <Balancer>Stack Principal</Balancer>
            </h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto text-lg">
              <Balancer>
                Las tecnologías con las que trabajo diariamente para crear 
                soluciones modernas y escalables.
              </Balancer>
            </p>
          </FadeUpDiv>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mainStacks.map((stack, index) => {
              const Icon = stack.icon;
              return (
                <FadeUpDiv key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="text-center hover:shadow-xl transition-all duration-300 hover-glow bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                        </motion.div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {stack.name}
                        </CardTitle>
                        <CardDescription>
                          <Balancer>{stack.description}</Balancer>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap justify-center gap-1">
                          {stack.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </FadeUpDiv>
              );
            })}
          </div>
        </div>
      </MotionSection>

      {/* CTA Section */}
      <MotionSection className="container py-12 md:py-24">
        <FadeUpDiv className="text-center space-y-6">
          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Balancer>¿Listo para colaborar?</Balancer>
          </motion.h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto text-lg">
            <Balancer>
              Estoy disponible para proyectos freelance, prácticas profesionales 
              o simplemente para conversar sobre tecnología.
            </Balancer>
          </p>
          <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Ponerse en Contacto
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  Conocer Más Sobre Mí
                </Link>
              </Button>
            </motion.div>
          </div>
        </FadeUpDiv>
      </MotionSection>
    </div>
  );
}