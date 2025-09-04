import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad del sitio web de Juan Fernando Valenzuela Solís. Información sobre el uso de datos y cookies.",
};

export default function PrivacyPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Política de <span className="gradient-text">Privacidad</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Última actualización: Septiembre 2024
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introducción</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Esta política de privacidad describe cómo recopilo, uso y protejo la información 
                personal que puedas proporcionar a través de este sitio web personal (juanfernandovalenzuela.com).
              </p>
              <p>
                Al utilizar este sitio web, aceptas las prácticas descritas en esta política de privacidad.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información que Recopilo</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <h4>Información Personal Directa</h4>
              <ul>
                <li>Nombre y dirección de correo electrónico (formulario de contacto)</li>
                <li>Mensaje y asunto de consultas</li>
                <li>Cualquier otra información que elijas proporcionar voluntariamente</li>
              </ul>
              
              <h4>Información Técnica Automática</h4>
              <ul>
                <li>Dirección IP</li>
                <li>Tipo de navegador y versión</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Fecha y hora de las visitas</li>
                <li>Dispositivo utilizado (escritorio, móvil, etc.)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cómo Uso tu Información</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>Utilizo la información recopilada para:</p>
              <ul>
                <li>Responder a tus consultas y mensajes de contacto</li>
                <li>Mejorar la experiencia del usuario del sitio web</li>
                <li>Analizar el tráfico y uso del sitio web</li>
                <li>Mantener la seguridad del sitio</li>
              </ul>
              
              <p><strong>No vendo, alquilo ni comparto tu información personal con terceros</strong> 
              para fines comerciales sin tu consentimiento explícito.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies y Tecnologías Similares</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>Este sitio web puede usar cookies y tecnologías similares para:</p>
              <ul>
                <li>Recordar tus preferencias</li>
                <li>Analizar el tráfico del sitio web (Google Analytics, si está configurado)</li>
                <li>Mejorar la funcionalidad del sitio</li>
              </ul>
              
              <p>
                Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas 
                las cookies que ya están en tu computadora y configurar la mayoría de los 
                navegadores para evitar que se coloquen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protección de Datos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Implemento medidas de seguridad apropiadas para proteger tu información personal 
                contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye:
              </p>
              <ul>
                <li>Cifrado de datos en tránsito (HTTPS)</li>
                <li>Acceso limitado a información personal</li>
                <li>Revisiones regulares de prácticas de seguridad</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Servicios de Terceros</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>Este sitio web puede utilizar servicios de terceros como:</p>
              <ul>
                <li><strong>Vercel:</strong> Hospedaje del sitio web</li>
                <li><strong>Google Analytics:</strong> Análisis de tráfico web (si está configurado)</li>
                <li><strong>Resend:</strong> Servicio de email para formulario de contacto</li>
              </ul>
              
              <p>
                Estos servicios tienen sus propias políticas de privacidad que te recomiendo revisar.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tus Derechos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>Tienes derecho a:</p>
              <ul>
                <li>Acceder a la información personal que tengo sobre ti</li>
                <li>Solicitar la corrección de información incorrecta</li>
                <li>Solicitar la eliminación de tu información personal</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
                <li>Presentar una queja ante las autoridades de protección de datos</li>
              </ul>
              
              <p>
                Para ejercer cualquiera de estos derechos, contáctame en: 
                <strong> juan.fernando@example.com</strong>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Retención de Datos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Conservo tu información personal solo durante el tiempo necesario para los 
                fines descritos en esta política, o según lo exija la ley.
              </p>
              <ul>
                <li>Mensajes de contacto: Hasta 2 años después del último contacto</li>
                <li>Datos de análisis web: Según la configuración del servicio utilizado</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Menores de Edad</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Este sitio web no está dirigido a menores de 18 años. No recopilo 
                conscientemente información personal de menores de 18 años. Si descubro 
                que he recopilado información de un menor, eliminaré esa información inmediatamente.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cambios a esta Política</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Puedo actualizar esta política de privacidad de vez en cuando. Te notificaré 
                sobre cambios significativos actualizando la fecha en la parte superior de 
                esta política y, cuando sea apropiado, te proporcionaré un aviso más prominente.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Si tienes preguntas sobre esta política de privacidad o el tratamiento 
                de tus datos personales, puedes contactarme en:
              </p>
              <ul>
                <li><strong>Email:</strong> juan.fernando@example.com</li>
                <li><strong>Formulario de contacto:</strong> Disponible en este sitio web</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}