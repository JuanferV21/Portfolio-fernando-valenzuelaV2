"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MotionSection, FadeUpDiv } from "@/components/site/MotionSection";
import { Calendar, MapPin, Building, GraduationCap, Briefcase, Code, Award } from "lucide-react";
import { experience } from "@/data/experience";

// export const metadata: Metadata = {
//   title: "Experiencia",
//   description: "Conoce la trayectoria profesional y académica de Juan Fernando Valenzuela Solís, incluyendo educación, experiencia laboral, proyectos y certificaciones.",
// };

const typeIcons = {
  education: GraduationCap,
  work: Briefcase,
  project: Code,
  certification: Award
};

const typeLabels = {
  education: "Educación",
  work: "Experiencia Laboral", 
  project: "Proyecto",
  certification: "Certificación"
};

const typeColors = {
  education: "text-blue-500",
  work: "text-green-500",
  project: "text-purple-500", 
  certification: "text-yellow-500"
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long'
  });
}

function calculateDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  
  if (months < 1) return "Menos de 1 mes";
  if (months === 1) return "1 mes";
  if (months < 12) return `${months} meses`;
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 1 && remainingMonths === 0) return "1 año";
  if (years === 1) return `1 año y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
  if (remainingMonths === 0) return `${years} años`;
  
  return `${years} años y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
}

export default function ExperiencePage() {
  const sortedExperience = [...experience].sort((a, b) => {
    const aDate = new Date(a.endDate || new Date());
    const bDate = new Date(b.endDate || new Date());
    return bDate.getTime() - aDate.getTime();
  });

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <MotionSection className="text-center space-y-4">
          <FadeUpDiv>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <Balancer>
                Mi <span className="gradient-text">Experiencia</span>
              </Balancer>
            </h1>
          </FadeUpDiv>
          <FadeUpDiv delay={0.2}>
            <p className="text-xl text-muted-foreground">
              <Balancer>
                Un recorrido por mi trayectoria académica, profesional y proyectos destacados
              </Balancer>
            </p>
          </FadeUpDiv>
        </MotionSection>

        {/* Timeline */}
        <motion.div 
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={timelineVariants}
        >
          {/* Animated Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-primary to-accent"
              variants={lineVariants}
            />
          </div>
          
          <div className="space-y-8">
            {sortedExperience.map((item, index) => {
              const Icon = typeIcons[item.type];
              return (
                <motion.div 
                  key={item.id} 
                  className="relative flex gap-8"
                  variants={itemVariants}
                >
                  {/* Animated Timeline dot */}
                  <motion.div 
                    className={`flex-shrink-0 w-16 h-16 rounded-full border-4 border-background bg-card shadow-lg flex items-center justify-center ${typeColors[item.type]} relative overflow-hidden`}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    />
                    <Icon className="h-6 w-6 relative z-10" />
                  </motion.div>
                  
                  {/* Content */}
                  <motion.div
                    className="flex-1"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 hover-glow">
                      <CardHeader>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="space-y-1">
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                            <CardDescription className="text-base font-medium">
                              {item.organization}
                            </CardDescription>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge variant="outline" className="gap-1">
                              <Icon className="h-3 w-3" />
                              {typeLabels[item.type]}
                            </Badge>
                          </motion.div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : "Presente"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>•</span>
                            <span>{calculateDuration(item.startDate, item.endDate)}</span>
                          </div>
                          {item.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {item.location}
                                {item.isRemote && " (Remoto)"}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Description */}
                        <div className="space-y-2">
                          {item.description.map((desc, i) => (
                            <motion.p 
                              key={i} 
                              className="text-muted-foreground"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                            >
                              {desc}
                            </motion.p>
                          ))}
                        </div>

                        {/* Technologies */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Tecnologías utilizadas</h4>
                            <div className="flex flex-wrap gap-1">
                              {item.technologies.map((tech, techIndex) => (
                                <motion.div
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: techIndex * 0.05 }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Badge variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Achievements */}
                        {item.achievements && item.achievements.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Logros destacados</h4>
                            <ul className="space-y-1">
                              {item.achievements.map((achievement, i) => (
                                <motion.li 
                                  key={i} 
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <span className="text-primary mt-1">•</span>
                                  <span>{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Summary Stats */}
        <MotionSection>
          <FadeUpDiv>
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>
                  <Balancer>Estadísticas de mi experiencia profesional y académica</Balancer>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(typeLabels).map(([type, label], index) => {
                    const count = experience.filter(item => item.type === type).length;
                    const Icon = typeIcons[type as keyof typeof typeIcons];
                    return (
                      <motion.div 
                        key={type} 
                        className="text-center space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Icon className={`h-8 w-8 mx-auto ${typeColors[type as keyof typeof typeColors]}`} />
                        </motion.div>
                        <motion.div 
                          className="text-2xl font-bold"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 20, 
                            delay: index * 0.1 + 0.2 
                          }}
                        >
                          {count}
                        </motion.div>
                        <div className="text-sm text-muted-foreground">{label}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </FadeUpDiv>
        </MotionSection>
      </div>
    </div>
  );
}