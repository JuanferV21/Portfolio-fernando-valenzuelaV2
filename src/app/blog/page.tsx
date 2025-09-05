"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ArrowRight, Search, BookOpen } from "lucide-react";
import { blogPosts, categories, getBlogPostsByCategory, getAllTags } from "@/data/blog";

// export const metadata: Metadata = {
//   title: "Blog",
//   description: "Artículos y reflexiones sobre desarrollo de software, tecnología y programación por Juan Fernando Valenzuela Solís.",
// };

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || 
      post.category.toLowerCase().replace(" ", "-") === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const allTags = getAllTags();

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Mi <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Artículos sobre desarrollo de software, tecnología y experiencias profesionales
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary rounded-md z-0"
              layoutId="blog-tabs-underline"
              initial={false}
              animate={{ 
                x: selectedCategory === "all" ? 0 : 
                   selectedCategory === "frontend" ? "100%" :
                   selectedCategory === "backend" ? "200%" : "300%",
                width: "25%"
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="relative z-10 data-[state=active]:text-white"
              >
                <span className="flex items-center gap-2">
                  {category.label}
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Tab Content */}
          {categories.map((category) => {
            const categoryPosts = category.id === "all" 
              ? filteredPosts 
              : filteredPosts.filter(p => p.category.toLowerCase().replace(" ", "-") === category.id);
            
            return (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="space-y-6">
                  {categoryPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                        {post.featured && (
                          <div className="bg-primary/10 px-4 py-2">
                            <Badge>Artículo Destacado</Badge>
                          </div>
                        )}
                        <CardHeader>
                          <div className="space-y-3">
                            <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                              <Link href={`/blog/${post.slug}`}>
                                {post.title}
                              </Link>
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
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                <span>{post.category}</span>
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
                              {post.tags.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 4}
                                </Badge>
                              )}
                            </div>
                            
                            <Button asChild className="w-full sm:w-auto">
                              <Link href={`/blog/${post.slug}`}>
                                Leer Artículo Completo
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* No results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No se encontraron artículos</h3>
            <p className="text-muted-foreground">
              Intenta con otros términos de búsqueda o selecciona una categoría diferente.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              variant="outline"
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Popular Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags Populares</CardTitle>
            <CardDescription>
              Explora artículos por temas específicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 10).map(({ tag, count }) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag} ({count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Blog Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{blogPosts.length}</div>
            <div className="text-sm text-muted-foreground">Artículos Totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {blogPosts.filter(p => p.category === "Frontend").length}
            </div>
            <div className="text-sm text-muted-foreground">Frontend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {blogPosts.filter(p => p.category === "Backend").length}
            </div>
            <div className="text-sm text-muted-foreground">Backend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {blogPosts.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-muted-foreground">Destacados</div>
          </div>
        </div>
      </div>
    </div>
  );
}