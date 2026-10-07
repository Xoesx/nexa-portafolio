import type { Metadata } from "next";
import { LegalLayout, SeccionLegal } from "../LegalLayout";

export const metadata: Metadata = {
  title: "Política de privacidad | Sabor Criollo",
  description: "Cómo tratamos tus datos personales al usar nuestro sitio y servicios.",
};

export default function PrivacidadPage() {
  return (
    <LegalLayout titulo="Política de privacidad" actualizado="Octubre 2026">
      <SeccionLegal titulo="1. Quiénes somos">
        <p>
          <strong>Sabor Criollo</strong> es un restaurante de cocina peruana con domicilio en Jr.
          Comercio 245, Pucallpa, Ucayali, Perú. Esta política explica cómo tratamos tus datos
          personales cuando usas nuestro sitio web.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="2. Qué datos recopilamos">
        <ul className="ml-5 list-disc space-y-2">
          <li><strong>Datos de reserva:</strong> nombre, teléfono, fecha, hora y notas que nos dejas voluntariamente.</li>
          <li><strong>Datos de contacto:</strong> nombre y correo cuando nos escribes.</li>
          <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador y páginas visitadas (con fines de seguridad y estadísticas anónimas).</li>
        </ul>
      </SeccionLegal>

      <SeccionLegal titulo="3. Para qué usamos tus datos">
        <ul className="ml-5 list-disc space-y-2">
          <li>Gestionar tu reserva y confirmarla por WhatsApp.</li>
          <li>Responder consultas o pedidos.</li>
          <li>Mejorar nuestro servicio y la experiencia del sitio.</li>
          <li>Cumplir con obligaciones legales cuando corresponda.</li>
        </ul>
      </SeccionLegal>

      <SeccionLegal titulo="4. Con quién compartimos">
        <p>
          No vendemos ni alquilamos tus datos. Solo los compartimos con:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li><strong>WhatsApp (Meta):</strong> cuando confirmas una reserva, se abre un chat con nuestro número.</li>
          <li><strong>Proveedores de hosting:</strong> que alojan el sitio y almacenan los datos de forma segura.</li>
        </ul>
      </SeccionLegal>

      <SeccionLegal titulo="5. Cuánto tiempo conservamos los datos">
        <p>
          Conservamos los datos de reservas por un máximo de 12 meses desde la fecha. Los datos de
          contacto se conservan mientras sea necesario para atender tu consulta.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="6. Tus derechos">
        <p>
          Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus
          datos personales escribiéndonos a{" "}
          <a href="mailto:hola@saborcriollo.pe" className="text-[#C1440E] underline underline-offset-4">
            hola@saborcriollo.pe
          </a>. Responderemos en un plazo máximo de 15 días hábiles.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="7. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas para proteger tus datos: cifrado HTTPS,
          validación de formularios, control de accesos y monitoreo de actividad sospechosa.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="8. Cambios en esta política">
        <p>
          Podemos actualizar esta política cuando cambien nuestras prácticas o la normativa. La
          fecha de actualización siempre aparecerá al inicio de esta página.
        </p>
      </SeccionLegal>
    </LegalLayout>
  );
}
