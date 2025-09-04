import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Building, GraduationCap, Briefcase, Code, Award } from "lucide-react";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experiencia",
  description: "Conoce la trayectoria profesional y académica de Juan Fernando Valenzuela Solís, incluyendo educación, experiencia laboral, proyectos y certificaciones.",
};

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

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Mi <span className="gradient-text">Experiencia</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Un recorrido por mi trayectoria académica, profesional y proyectos destacados
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-8">
            {sortedExperience.map((item, index) => {
              const Icon = typeIcons[item.type];
              return (
                <div key={item.id} className="relative flex gap-8">
                  {/* Timeline dot */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 border-background bg-card shadow-lg flex items-center justify-center ${typeColors[item.type]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  {/* Content */}
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <CardDescription className="text-base font-medium">
                            {item.organization}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="gap-1">
                          <Icon className="h-3 w-3" />
                          {typeLabels[item.type]}
                        </Badge>
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
                          <p key={i} className="text-muted-foreground">
                            {desc}
                          </p>
                        ))}
                      </div>

                      {/* Technologies */}
                      {item.technologies && item.technologies.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Tecnologías utilizadas</h4>
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
                          <h4 className="text-sm font-medium mb-2">Logros destacados</h4>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
            <CardDescription>
              Estadísticas de mi experiencia profesional y académica
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(typeLabels).map(([type, label]) => {
                const count = experience.filter(item => item.type === type).length;
                const Icon = typeIcons[type as keyof typeof typeIcons];
                return (
                  <div key={type} className="text-center space-y-2">
                    <Icon className={`h-8 w-8 mx-auto ${typeColors[type as keyof typeof typeColors]}`} />
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}