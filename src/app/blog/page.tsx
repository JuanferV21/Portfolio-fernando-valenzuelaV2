import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos y reflexiones sobre desarrollo de software, tecnología y programación por Juan Fernando Valenzuela Solís.",
};

// Demo blog posts - in a real app, these would come from a CMS or markdown files
const blogPosts = [
  {
    id: "introduccion-desarrollo-web-moderno",
    title: "Introducción al Desarrollo Web Moderno con React y TypeScript",
    excerpt: "Una guía completa para comenzar en el desarrollo web moderno utilizando las mejores herramientas y prácticas actuales.",
    content: `
      <p>El desarrollo web ha evolucionado significativamente en los últimos años. En este artículo, exploraremos las tecnologías fundamentales que todo desarrollador web moderno debe conocer.</p>
      
      <h2>¿Por qué React y TypeScript?</h2>
      <p>React se ha convertido en una de las bibliotecas más populares para construir interfaces de usuario, mientras que TypeScript añade tipado estático a JavaScript, mejorando la calidad del código y la experiencia de desarrollo.</p>
      
      <h2>Configuración del Entorno</h2>
      <p>Para comenzar, necesitarás tener instalado Node.js en tu sistema. Luego puedes crear un nuevo proyecto con:</p>
      <pre><code>npx create-react-app mi-app --template typescript</code></pre>
      
      <h2>Conceptos Fundamentales</h2>
      <ul>
        <li>Componentes funcionales y hooks</li>
        <li>Manejo de estado con useState y useEffect</li>
        <li>Tipado con interfaces y tipos</li>
        <li>Mejores prácticas de estructura de proyectos</li>
      </ul>
      
      <h2>Conclusión</h2>
      <p>React con TypeScript ofrece una base sólida para desarrollar aplicaciones web escalables y mantenibles. La curva de aprendizaje puede ser empinada al principio, pero los beneficios a largo plazo son enormes.</p>
    `,
    author: "Juan Fernando Valenzuela",
    publishedAt: "2024-08-15",
    readTime: "8 min",
    tags: ["React", "TypeScript", "Web Development", "JavaScript"],
    featured: true
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function BlogPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Mi <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Artículos sobre desarrollo de software, tecnología y experiencias profesionales
          </p>
        </div>

        {/* Coming Soon Notice */}
        <Card className="border-dashed">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-semibold mb-2">Blog en Construcción</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Estoy trabajando en crear contenido de calidad sobre desarrollo web, 
              análisis de datos y mis experiencias en tecnología. ¡Próximamente habrá más artículos!
            </p>
          </CardContent>
        </Card>

        {/* Demo Article */}
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            {post.featured && (
              <div className="bg-primary/10 px-4 py-2">
                <Badge>Artículo Destacado</Badge>
              </div>
            )}
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} de lectura</span>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {post.excerpt}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Content preview */}
                <div 
                  className="prose prose-sm max-w-none line-clamp-3 text-muted-foreground"
                  dangerouslySetInnerHTML={{ 
                    __html: post.content.replace(/<[^>]*>/g, '').substring(0, 300) + '...'
                  }}
                />
                
                <Button variant="outline" className="w-full sm:w-auto">
                  Leer Artículo Completo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Newsletter Signup */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Mantente Actualizado</CardTitle>
            <CardDescription>
              Suscríbete para recibir notificaciones cuando publique nuevos artículos
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="max-w-md mx-auto space-y-4">
              <p className="text-sm text-muted-foreground">
                Por ahora, puedes seguirme en mis redes sociales para estar al tanto 
                de mis últimos proyectos y reflexiones sobre tecnología.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="https://github.com/juanfernando" target="_blank">
                    GitHub
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="https://linkedin.com/in/juanfernando" target="_blank">
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topics Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Temas</CardTitle>
            <CardDescription>
              Algunos de los temas que planeo cubrir en futuros artículos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">🔧 Desarrollo Técnico</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Patrones de diseño en C#</li>
                  <li>• Optimización de consultas SQL</li>
                  <li>• Testing automatizado</li>
                  <li>• Arquitectura de microservicios</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">💡 Experiencias y Aprendizajes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Mi transición a desarrollo full-stack</li>
                  <li>• Lecciones de proyectos freelance</li>
                  <li>• Herramientas que me cambiaron la vida</li>
                  <li>• Balance estudio-trabajo</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}