"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Command, 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { 
  Home, 
  User, 
  FolderOpen, 
  Wrench, 
  Clock, 
  Mail, 
  BookOpen,
  Search
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  category: string;
}

const commandItems: CommandItem[] = [
  {
    id: "home",
    title: "Inicio",
    description: "Página principal del portafolio",
    href: "/",
    icon: Home,
    category: "Páginas"
  },
  {
    id: "about",
    title: "Acerca de Mí",
    description: "Información personal y biografía",
    href: "/about",
    icon: User,
    category: "Páginas"
  },
  {
    id: "projects",
    title: "Proyectos",
    description: "Portafolio de proyectos desarrollados",
    href: "/projects",
    icon: FolderOpen,
    category: "Páginas"
  },
  {
    id: "skills",
    title: "Habilidades",
    description: "Competencias técnicas y herramientas",
    href: "/skills",
    icon: Wrench,
    category: "Páginas"
  },
  {
    id: "experience",
    title: "Experiencia",
    description: "Historial profesional y académico",
    href: "/experience",
    icon: Clock,
    category: "Páginas"
  },
  {
    id: "contact",
    title: "Contacto",
    description: "Formulario de contacto y información",
    href: "/contact",
    icon: Mail,
    category: "Páginas"
  },
  {
    id: "blog",
    title: "Blog",
    description: "Artículos y reflexiones sobre tecnología",
    href: "/blog",
    icon: BookOpen,
    category: "Páginas"
  }
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Trigger button visible in the header */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg bg-background/50"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Buscar...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-1 text-[10px] font-mono text-muted-foreground">
          <span>⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar páginas y proyectos..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup heading="Páginas">
            {commandItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.id}
                  value={item.title}
                  onSelect={() => handleSelect(item.href)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}