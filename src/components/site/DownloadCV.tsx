"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DownloadCV() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/cv/JuanFernandoValenzuela.pdf";
    link.download = "JuanFernandoValenzuela_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload} variant="outline" className="gap-2">
      <Download className="h-4 w-4" />
      Descargar CV
    </Button>
  );
}