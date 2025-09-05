"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MotionSection, FadeUpDiv } from "@/components/site/MotionSection";
import { 
  SiSharp, SiPython, SiLaravel, SiReact, SiNextdotjs, SiNodedotjs, 
  SiMysql, SiPostman, SiTypescript, SiJavascript, SiTailwindcss,
  SiGit, SiGithub, SiDocker, SiFigma, SiVisualstudiocode,
  SiHtml5, SiPandas, SiNumpy, SiMicrosoftsqlserver
} from "react-icons/si";
import { 
  Terminal, BarChart3, FileSpreadsheet, Puzzle, BookOpen, 
  Users, Clock, Brain 
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { skills } from "@/data/skills";

// export const metadata: Metadata = {
//   title: "Habilidades",
//   description: "Conoce las habilidades técnicas y competencias de Juan Fernando Valenzuela Solís en desarrollo frontend, backend, DevOps y análisis de datos.",
// };

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  SiReact, SiTypescript, SiNextdotjs, SiHtml5, SiTailwindcss, SiJavascript,
  SiSharp, SiPython, SiLaravel, SiNodedotjs, SiMicrosoftsqlserver, SiMysql,
  SiGit, SiDocker, Terminal, SiVisualstudiocode, SiPostman,
  SiPandas, SiNumpy, BarChart3, FileSpreadsheet,
  Puzzle, BookOpen, Users, Clock, Brain
};

// Level colors and percentages
const levelConfig = {
  "Beginner": { color: "bg-red-500", percentage: 25 },
  "Intermediate": { color: "bg-yellow-500", percentage: 50 },
  "Advanced": { color: "bg-blue-500", percentage: 75 },
  "Expert": { color: "bg-green-500", percentage: 100 }
};

function SkillCard({ skill }: { skill: any }) {
  const Icon = iconMap[skill.icon] || Terminal;
  const config = levelConfig[skill.level];
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-lg bg-card/30 backdrop-blur p-4 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="text-xl text-primary" />
        <div className="flex-1">
          <h4 className="font-medium text-sm">{skill.name}</h4>
          <Badge variant="outline" className="text-xs mt-1">
            {skill.level}
          </Badge>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-2">
        <div 
          className={`h-full ${config.color} transition-all duration-500`}
          style={{ width: `${config.percentage}%` }}
        />
      </div>
      
      <p className="text-xs text-muted-foreground leading-relaxed">
        {skill.description}
      </p>
    </motion.div>
  );
}

function SkillSummaryChart() {
  const allSkills = skills.flatMap(category => category.skills);
  const summary = Object.entries(levelConfig).map(([level, config]) => ({
    level,
    count: allSkills.filter(skill => skill.level === level).length,
    color: config.color
  }));

  const total = allSkills.length;

  return (
    <Card className="bg-card/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Resumen de Competencias</CardTitle>
        <CardDescription>
          Distribución de habilidades por nivel de experiencia
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {summary.map(({ level, count, color }) => (
          <div key={level} className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-3 h-3 rounded ${color}`} />
              <span className="text-sm font-medium">{level}</span>
            </div>
            <span className="text-sm text-muted-foreground">{count} skills</span>
            <div className="w-16 bg-muted rounded-full h-2">
              <div 
                className={`h-full ${color} rounded-full`}
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
        <div className="pt-2 border-t text-center">
          <span className="text-sm font-medium">{total} habilidades totales</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function SkillsPage() {
  const shouldReduceMotion = useReducedMotion();

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <MotionSection className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            Mis <span className="gradient-text">Habilidades</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            <Balancer>
              Competencias técnicas y habilidades profesionales desarrolladas a través 
              de proyectos académicos y experiencia práctica.
            </Balancer>
          </motion.p>
        </MotionSection>

        {/* Skills Summary */}
        <FadeUpDiv>
          <SkillSummaryChart />
        </FadeUpDiv>

        {/* Skills by Category */}
        <FadeUpDiv delay={0.2}>
          <Accordion type="multiple" className="space-y-4" defaultValue={["item-0"]}>
            {skills.map((category, index) => (
              <AccordionItem 
                key={category.category} 
                value={`item-${index}`}
                className="rounded-lg bg-card/20 backdrop-blur border px-4"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{category.category}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.skills.length} skills
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: skillIndex * 0.1 }}
                      >
                        <SkillCard skill={skill} />
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUpDiv>

        {/* CTA */}
        <FadeUpDiv delay={0.4} className="text-center pt-8">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">
                ¿Interesado en colaborar?
              </h3>
              <p className="text-muted-foreground mb-4">
                Siempre estoy dispuesto a aprender nuevas tecnologías y enfrentar desafíos interesantes.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge className="cursor-pointer">
                  Contactar
                </Badge>
              </motion.div>
            </CardContent>
          </Card>
        </FadeUpDiv>
      </div>
    </div>
  );
}