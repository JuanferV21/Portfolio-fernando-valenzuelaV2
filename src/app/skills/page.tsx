import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  title: "Habilidades",
  description: "Conoce las habilidades técnicas y competencias de Juan Fernando Valenzuela Solís en desarrollo frontend, backend, DevOps y análisis de datos.",
};

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
  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Mis <span className="gradient-text">Habilidades</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un resumen de mis competencias técnicas y habilidades interpersonales, 
            organizadas por categorías con mi nivel de experiencia en cada una.
          </p>
        </div>

        {/* Skills by Category */}
        <div className="space-y-8">
          {skills.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl">{category.category}</CardTitle>
                <CardDescription>
                  {category.category === "Frontend" && "Tecnologías para crear interfaces de usuario modernas y responsivas"}
                  {category.category === "Backend" && "Herramientas para desarrollo de servidores y APIs robustas"}
                  {category.category === "DevOps & Tools" && "Herramientas para desarrollo, colaboración y deployment"}
                  {category.category === "Data & Analytics" && "Tecnologías para análisis y visualización de datos"}
                  {category.category === "Soft Skills" && "Habilidades interpersonales y de gestión personal"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {skill.icon && <span className="text-xl">{skill.icon}</span>}
                          <h4 className="font-medium">{skill.name}</h4>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${levelColors[skill.level]}`}
                        >
                          {skill.level}
                        </Badge>
                      </div>
                      <Progress 
                        value={levelToProgress[skill.level]} 
                        className="h-2"
                      />
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Competencias</CardTitle>
            <CardDescription>
              Distribución de mis habilidades por nivel de experiencia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(levelToProgress).map(([level, progress]) => {
                const count = skills.flatMap(cat => cat.skills).filter(skill => skill.level === level).length;
                return (
                  <div key={level} className="text-center space-y-2">
                    <div className={`text-3xl font-bold ${levelColors[level as keyof typeof levelColors]}`}>
                      {count}
                    </div>
                    <div className="text-sm font-medium">{level}</div>
                    <div className="text-xs text-muted-foreground">
                      {level === "Beginner" && "Conocimiento básico"}
                      {level === "Intermediate" && "Experiencia práctica"}
                      {level === "Advanced" && "Uso profesional"}
                      {level === "Expert" && "Dominio completo"}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card>
          <CardHeader>
            <CardTitle>Actualmente Aprendiendo</CardTitle>
            <CardDescription>
              Tecnologías y habilidades que estoy desarrollando actualmente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  🎯 Enfoque Técnico
                </h4>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">Docker & Kubernetes</Badge>
                  <Badge variant="outline" className="mr-2">Azure DevOps</Badge>
                  <Badge variant="outline" className="mr-2">Machine Learning</Badge>
                  <Badge variant="outline" className="mr-2">GraphQL</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  📚 Próximos Objetivos
                </h4>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">AWS Fundamentals</Badge>
                  <Badge variant="outline" className="mr-2">Microservicios</Badge>
                  <Badge variant="outline" className="mr-2">Testing Avanzado</Badge>
                  <Badge variant="outline" className="mr-2">System Design</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}