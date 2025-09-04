"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";
import { sendContactEmail } from "@/app/contact/actions";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await sendContactEmail(data);
      
      if (result.success) {
        toast.success("¡Mensaje enviado con éxito!");
        reset();
      } else {
        toast.error(result.error || "Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Error al enviar el mensaje. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasResendAPI = process.env.NEXT_PUBLIC_HAS_RESEND_API === 'true';

  if (!hasResendAPI) {
    return (
      <div className="text-center space-y-4 p-6">
        <Mail className="h-12 w-12 mx-auto text-muted-foreground" />
        <div>
          <h3 className="font-medium mb-2">Contáctame directamente</h3>
          <p className="text-sm text-muted-foreground mb-4">
            El formulario de contacto no está configurado. Puedes escribirme directamente a mi email.
          </p>
          <Button asChild>
            <a href="mailto:juan.fernando@example.com?subject=Consulta desde el portafolio">
              <Mail className="h-4 w-4 mr-2" />
              Enviar Email
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Input
            {...register("name")}
            placeholder="Tu nombre"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="tu@email.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <Input
          {...register("subject")}
          placeholder="Asunto del mensaje"
          disabled={isSubmitting}
        />
        {errors.subject && (
          <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
        )}
      </div>
      
      <div>
        <Textarea
          {...register("message")}
          placeholder="Escribe tu mensaje aquí..."
          rows={6}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Enviar Mensaje
          </>
        )}
      </Button>
    </form>
  );
}