"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-6">
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

        {/* Experience Accordion */}
        <FadeUpDiv delay={0.2}>
          <Accordion type="multiple" className="space-y-4" defaultValue={["item-0", "item-1"]}>
            {Object.entries(typeLabels).map(([type, label], groupIndex) => {
              const groupExperience = experience.filter(item => item.type === type);
              if (groupExperience.length === 0) return null;
              
              const Icon = typeIcons[type as keyof typeof typeIcons];
              
              return (
                <AccordionItem 
                  key={type} 
                  value={`item-${groupIndex}`}
                  className="rounded-lg bg-card/20 backdrop-blur border px-4"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${typeColors[type as keyof typeof typeColors]}`} />
                      <h3 className="text-lg font-semibold">{label}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {groupExperience.length} {groupExperience.length === 1 ? 'elemento' : 'elementos'}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-4">
                      {groupExperience
                        .sort((a, b) => new Date(b.endDate || new Date()).getTime() - new Date(a.endDate || new Date()).getTime())
                        .map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-lg bg-card/30 backdrop-blur p-4 border hover:shadow-md transition-all duration-200"
                        >
                          <div className="space-y-3">
                            {/* Header */}
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div className="space-y-1">
                                <h4 className="font-semibold text-base">{item.title}</h4>
                                <p className="text-sm text-muted-foreground font-medium">
                                  {item.organization}
                                </p>
                              </div>
                              <div className="text-xs text-muted-foreground text-right">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : "Presente"}
                                  </span>
                                </div>
                                <div className="mt-1">{calculateDuration(item.startDate, item.endDate)}</div>
                                {item.location && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>
                                      {item.location}
                                      {item.isRemote && " (Remoto)"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Description */}
                            <div className="space-y-2">
                              {item.description.map((desc, i) => (
                                <p key={i} className="text-sm text-muted-foreground">
                                  {desc}
                                </p>
                              ))}
                            </div>

                            {/* Technologies */}
                            {item.technologies && item.technologies.length > 0 && (
                              <div>
                                <h5 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wide">Tecnologías</h5>
                                <div className="flex flex-wrap gap-1">
                                  {item.technologies.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Achievements */}
                            {item.achievements && item.achievements.length > 0 && (
                              <div>
                                <h5 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wide">Logros</h5>
                                <ul className="space-y-1">
                                  {item.achievements.map((achievement, i) => (
                                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <span className="text-primary mt-1">•</span>
                                      <span>{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </FadeUpDiv>

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