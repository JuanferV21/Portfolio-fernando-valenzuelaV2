import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container py-8 md:py-12 min-h-[70vh] flex items-center justify-center">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="pb-4">
          <div className="mb-4">
            <Search className="h-16 w-16 mx-auto text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl mb-2">404</CardTitle>
          <CardDescription className="text-lg">
            La página que buscas no existe o ha sido movida.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            No te preocupes, puede suceder. Aquí tienes algunas opciones para continuar navegando.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full group">
              <Link href="/" className="gap-2">
                <Home className="h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full group">
              <Link href="/projects" className="gap-2">
                <Search className="h-4 w-4" />
                Ver Proyectos
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}