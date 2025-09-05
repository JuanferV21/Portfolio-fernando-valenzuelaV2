import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/data/blog";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back to blog */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Volver al Blog
            </Link>
          </Button>
        </div>

        {/* Article header */}
        <header className="space-y-6 pb-8 border-b">
          {post.featured && (
            <Badge className="w-fit">Artículo Destacado</Badge>
          )}
          
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} de lectura</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{post.category}</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article content */}
        <article className="py-8">
          <div 
            className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:leading-7 prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Sobre el Autor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Estudiante de Ingeniería en Sistemas apasionado por el desarrollo de software, 
                  análisis de datos y tecnologías emergentes. Comparto mis experiencias y 
                  aprendizajes en el mundo del desarrollo.
                </p>
                <div className="flex gap-4 mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link href="https://github.com/juanfernando" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="https://linkedin.com/in/juanfernando" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Artículos Relacionados</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts
              .filter(p => p.id !== post.id && (
                p.category === post.category || 
                p.tags.some(tag => post.tags.includes(tag))
              ))
              .slice(0, 2)
              .map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <Link 
                        href={`/blog/${relatedPost.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {relatedPost.excerpt.substring(0, 100)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {relatedPost.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {relatedPost.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}