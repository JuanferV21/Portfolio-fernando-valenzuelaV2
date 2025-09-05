"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MotionSection, FadeUpDiv } from "@/components/site/MotionSection";
import { skills } from "@/data/skills";

// export const metadata: Metadata = {
//   title: "Habilidades",
//   description: "Conoce las habilidades técnicas y competencias de Juan Fernando Valenzuela Solís en desarrollo frontend, backend, DevOps y análisis de datos.",
// };

const levelToProgress = {
  "Beginner": 25,
  "Intermediate": 50,
  "Advanced": 75,
  "Expert": 100
};

const levelColors = {
  "Beginner": "text-yellow-500",
  "Intermediate": "text-blue-500", 
  "Advanced": "text-green-500",
  "Expert": "text-purple-500"
};

export default function SkillsPage() {
  const categoryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skillCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-8">
        {/* Header */}
        <MotionSection className="text-center space-y-4">
          <FadeUpDiv>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <Balancer>
                Mis <span className="gradient-text">Habilidades</span>
              </Balancer>
            </h1>
          </FadeUpDiv>
          <FadeUpDiv delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <Balancer>
                Un resumen de mis competencias técnicas y habilidades interpersonales, 
                organizadas por categorías con mi nivel de experiencia en cada una.
              </Balancer>
            </p>
          </FadeUpDiv>
        </MotionSection>

        {/* Skills by Category */}
        <div className="space-y-8">
          {skills.map((category, index) => (
            <MotionSection key={index}>
              <FadeUpDiv delay={index * 0.1}>
                <Card className="hover-glow overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl">{category.category}</CardTitle>
                    <CardDescription>
                      <Balancer>
                        {category.category === "Frontend" && "Tecnologías para crear interfaces de usuario modernas y responsivas"}
                        {category.category === "Backend" && "Herramientas para desarrollo de servidores y APIs robustas"}
                        {category.category === "DevOps & Tools" && "Herramientas para desarrollo, colaboración y deployment"}
                        {category.category === "Data & Analytics" && "Tecnologías para análisis y visualización de datos"}
                        {category.category === "Soft Skills" && "Habilidades interpersonales y de gestión personal"}
                      </Balancer>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-20%" }}
                      variants={categoryVariants}
                    >
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div 
                          key={skillIndex} 
                          className="space-y-3 p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                          variants={skillCardVariants}
                          whileHover={{ 
                            y: -5,
                            scale: 1.02,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {skill.icon && (
                                <motion.span 
                                  className="text-xl"
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                  {skill.icon}
                                </motion.span>
                              )}
                              <h4 className="font-medium">{skill.name}</h4>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${levelColors[skill.level]} hover:bg-primary hover:text-primary-foreground transition-colors`}
                              >
                                {skill.level}
                              </Badge>
                            </motion.div>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          >
                            <Progress 
                              value={levelToProgress[skill.level]} 
                              className="h-2"
                            />
                          </motion.div>
                          <p className="text-sm text-muted-foreground">
                            {skill.description}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </FadeUpDiv>
            </MotionSection>
          ))}
        </div>

        {/* Skills Summary */}
        <MotionSection>
          <FadeUpDiv>
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle>Resumen de Competencias</CardTitle>
                <CardDescription>
                  <Balancer>Distribución de mis habilidades por nivel de experiencia</Balancer>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(levelToProgress).map(([level, progress], index) => {
                    const count = skills.flatMap(cat => cat.skills).filter(skill => skill.level === level).length;
                    return (
                      <motion.div 
                        key={level} 
                        className="text-center space-y-2"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -5,
                          transition: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                      >
                        <motion.div 
                          className={`text-3xl font-bold ${levelColors[level as keyof typeof levelColors]}`}
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
                        <div className="text-sm font-medium">{level}</div>
                        <div className="text-xs text-muted-foreground">
                          {level === "Beginner" && "Conocimiento básico"}
                          {level === "Intermediate" && "Experiencia práctica"}
                          {level === "Advanced" && "Uso profesional"}
                          {level === "Expert" && "Dominio completo"}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </FadeUpDiv>
        </MotionSection>

        {/* Learning Path */}
        <MotionSection>
          <FadeUpDiv>
            <Card className="hover-glow">
              <CardHeader>
                <CardTitle>Actualmente Aprendiendo</CardTitle>
                <CardDescription>
                  <Balancer>Tecnologías y habilidades que estoy desarrollando actualmente</Balancer>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      >
                        🎯
                      </motion.span>
                      Enfoque Técnico
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Docker & Kubernetes", "Azure DevOps", "Machine Learning", "GraphQL"].map((tech, index) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <motion.span
                        animate={{ rotateY: [0, 180, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      >
                        📚
                      </motion.span>
                      Próximos Objetivos
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["AWS Fundamentals", "Microservicios", "Testing Avanzado", "System Design"].map((goal, index) => (
                        <motion.div
                          key={goal}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge variant="outline" className="hover:bg-accent hover:text-accent-foreground transition-colors">
                            {goal}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </FadeUpDiv>
        </MotionSection>
      </div>
    </div>
  );
}