"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, touchedFields },
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange"
  });

  const watchedFields = watch();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const result = await sendContactEmail(data);
      
      if (result.success) {
        setSubmitStatus('success');
        toast.success("¡Mensaje enviado con éxito!", {
          description: "Te responderé lo antes posible."
        });
        reset();
        
        // Reset status after animation
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        toast.error(result.error || "Error al enviar el mensaje", {
          description: "Por favor, intenta de nuevo o contáctame directamente."
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus('error');
      toast.error("Error al enviar el mensaje. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasResendAPI = process.env.NEXT_PUBLIC_HAS_RESEND_API === 'true';

  if (!hasResendAPI) {
    return (
      <motion.div 
        className="text-center space-y-4 p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Mail className="h-12 w-12 mx-auto text-muted-foreground" />
        </motion.div>
        <div>
          <h3 className="font-medium mb-2">Contáctame directamente</h3>
          <p className="text-sm text-muted-foreground mb-4">
            El formulario de contacto no está configurado. Puedes escribirme directamente a mi email.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild>
              <a href="mailto:juan.fernando@example.com?subject=Consulta desde el portafolio">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Email
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div variants={fieldVariants} className="relative">
          <div className="relative">
            <Input
              {...register("name")}
              placeholder="Tu nombre"
              disabled={isSubmitting}
              className={`transition-all duration-300 ${
                touchedFields.name && !errors.name ? 'border-green-500 bg-green-50/5' : 
                errors.name ? 'border-red-500 bg-red-50/5' : ''
              }`}
            />
            <AnimatePresence>
              {touchedFields.name && !errors.name && watchedFields.name && (
                <motion.div
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.name && (
              <motion.p 
                className="text-sm text-destructive mt-1 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AlertCircle className="h-3 w-3" />
                {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={fieldVariants} className="relative">
          <div className="relative">
            <Input
              {...register("email")}
              type="email"
              placeholder="tu@email.com"
              disabled={isSubmitting}
              className={`transition-all duration-300 ${
                touchedFields.email && !errors.email ? 'border-green-500 bg-green-50/5' : 
                errors.email ? 'border-red-500 bg-red-50/5' : ''
              }`}
            />
            <AnimatePresence>
              {touchedFields.email && !errors.email && watchedFields.email && (
                <motion.div
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                className="text-sm text-destructive mt-1 flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <motion.div variants={fieldVariants} className="relative">
        <div className="relative">
          <Input
            {...register("subject")}
            placeholder="Asunto del mensaje"
            disabled={isSubmitting}
            className={`transition-all duration-300 ${
              touchedFields.subject && !errors.subject ? 'border-green-500 bg-green-50/5' : 
              errors.subject ? 'border-red-500 bg-red-50/5' : ''
            }`}
          />
          <AnimatePresence>
            {touchedFields.subject && !errors.subject && watchedFields.subject && (
              <motion.div
                className="absolute right-3 top-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {errors.subject && (
            <motion.p 
              className="text-sm text-destructive mt-1 flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle className="h-3 w-3" />
              {errors.subject.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.div variants={fieldVariants} className="relative">
        <div className="relative">
          <Textarea
            {...register("message")}
            placeholder="Escribe tu mensaje aquí..."
            rows={6}
            disabled={isSubmitting}
            className={`transition-all duration-300 resize-none ${
              touchedFields.message && !errors.message ? 'border-green-500 bg-green-50/5' : 
              errors.message ? 'border-red-500 bg-red-50/5' : ''
            }`}
          />
          <AnimatePresence>
            {touchedFields.message && !errors.message && watchedFields.message && (
              <motion.div
                className="absolute right-3 top-3"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {errors.message && (
            <motion.p 
              className="text-sm text-destructive mt-1 flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle className="h-3 w-3" />
              {errors.message.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.div variants={fieldVariants}>
        <motion.div
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          <Button 
            type="submit" 
            className="w-full relative overflow-hidden" 
            disabled={isSubmitting || !isValid}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center"
                >
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </motion.div>
              ) : submitStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center text-green-600"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  ¡Enviado!
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensaje
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Success ripple effect */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  className="absolute inset-0 bg-green-500 rounded-md"
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>
    </motion.form>
  );
}