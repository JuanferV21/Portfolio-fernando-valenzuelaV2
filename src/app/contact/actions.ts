"use server";

import { Resend } from "resend";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  error?: string;
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendContactEmail(data: ContactFormData): Promise<ContactResponse> {
  try {
    // Validate the data (basic server-side validation)
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        error: "Todos los campos son requeridos"
      };
    }

    // If Resend API is configured, send via email
    if (resend && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "portfolio@resend.dev", // This will be replaced with your verified domain
          to: "juan.fernando@example.com", // Your actual email
          subject: `[Portafolio] ${data.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Nuevo mensaje desde el portafolio</h2>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #555;">Información del contacto</h3>
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Asunto:</strong> ${data.subject}</p>
              </div>
              
              <div style="background: #fff; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">Mensaje</h3>
                <p style="line-height: 1.6; color: #555;">${data.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 14px;">
                <p>Este mensaje fue enviado desde tu portafolio web.</p>
                <p>Puedes responder directamente a ${data.email}</p>
              </div>
            </div>
          `,
          replyTo: data.email,
        });

        return { success: true };
      } catch (emailError) {
        console.error("Error sending email via Resend:", emailError);
        return {
          success: false,
          error: "Error al enviar el email. Intenta de nuevo más tarde."
        };
      }
    }

    // If no Resend API key, log the message (in a real app, you might save to database)
    console.log("Contact form submission (no email service configured):", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    // Return success but indicate no email was sent
    return {
      success: false,
      error: "Servicio de email no configurado. Por favor, contacta directamente por email."
    };

  } catch (error) {
    console.error("Contact form server action error:", error);
    return {
      success: false,
      error: "Error interno del servidor. Intenta de nuevo más tarde."
    };
  }
}