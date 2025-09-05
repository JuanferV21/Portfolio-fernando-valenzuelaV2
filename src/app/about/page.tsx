import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, GraduationCap, Heart, Code, Target } from "lucide-react";
import { profile } from "@/data/profile";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de Mí",
  description: "Conoce más sobre Juan Fernando Valenzuela Solís, estudiante de Ingeniería en Sistemas y desarrollador junior especializado en tecnologías full-stack.",
};

export default function AboutPage() {
  const interests = [
    "Desarrollo de Software",
    "Inteligencia Artificial", 
    "Análisis de Datos",
    "Cloud Computing",
    "Arquitectura de Software",
    "DevOps",
    "Machine Learning",
    "Automatización"
  ];

  const softSkills = [
    "Resolución de Problemas",
    "Aprendizaje Continuo", 
    "Trabajo en Equipo",
    "Comunicación Efectiva",
    "Adaptabilidad",
    "Liderazgo",
    "Pensamiento Crítico",
    "Gestión del Tiempo"
  ];

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Acerca de <span className="gradient-text">Mí</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Estudiante apasionado, desarrollador en crecimiento
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Avatar and basic info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  {/* Avatar */}
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src="/images/profile/profile-photo.jpg"
                      alt="Juan Fernando Valenzuela"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.role}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{profile.age} años</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bio */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Mi Historia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none space-y-4">
                  {profile.bio.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Intereses y Áreas de Enfoque
            </CardTitle>
            <CardDescription>
              Áreas de tecnología que me apasionan y en las que busco especializarme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Habilidades Interpersonales</CardTitle>
            <CardDescription>
              Competencias que complementan mis habilidades técnicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {softSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="justify-center">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Focus */}
        <Card>
          <CardHeader>
            <CardTitle>Enfoque Actual</CardTitle>
            <CardDescription>
              En qué estoy trabajando y aprendiendo actualmente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-medium text-sm mb-2">🎓 Estudiando</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ingeniería en Sistemas (3er año)</li>
                    <li>• Arquitectura de Software</li>
                    <li>• Patrones de Diseño</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Desarrollando
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Proyectos con .NET 8</li>
                    <li>• Análisis de datos con Python</li>
                    <li>• Apps React con TypeScript</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Próximos Objetivos
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Certificación Azure Developer Associate</li>
                  <li>• Contribuir a proyectos open source</li>
                  <li>• Aprender Docker y Kubernetes</li>
                  <li>• Explorar Machine Learning con Python</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-6 pt-8">
          <h2 className="text-2xl font-bold">¿Te interesa colaborar?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estoy siempre abierto a nuevas oportunidades, proyectos interesantes 
            y conversaciones sobre tecnología. No dudes en contactarme.
          </p>
          <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Ponte en Contacto
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                Ver Mis Proyectos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}