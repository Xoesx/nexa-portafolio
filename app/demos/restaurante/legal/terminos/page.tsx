import type { Metadata } from "next";
import { LegalLayout, SeccionLegal } from "../LegalLayout";

export const metadata: Metadata = {
  title: "Términos y condiciones | Sabor Criollo",
  description: "Términos y condiciones de uso del sitio web y servicios de Sabor Criollo.",
};

export default function TerminosPage() {
  return (
    <LegalLayout titulo="Términos y condiciones" actualizado="Octubre 2026">
      <SeccionLegal titulo="1. Aceptación de los términos">
        <p>
          Al acceder y utilizar el sitio web de <strong>Sabor Criollo</strong>, aceptas cumplir con
          los presentes términos y condiciones. Si no estás de acuerdo con alguna parte, te pedimos
          no utilizar el sitio ni nuestros servicios.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="2. Uso del sitio">
        <p>
          Este sitio tiene como finalidad mostrar nuestra carta, permitir reservas y facilitar el
          contacto con nosotros. No está permitido:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Usar el sitio para actividades ilegales o fraudulentas.</li>
          <li>Intentar acceder a áreas restringidas sin autorización.</li>
          <li>Copiar, reproducir o distribuir el contenido sin autorización escrita.</li>
          <li>Enviar información falsa en formularios de reserva.</li>
        </ul>
      </SeccionLegal>

      <SeccionLegal titulo="3. Reservas">
        <p>
          Toda reserva está sujeta a disponibilidad. La confirmación se realiza por WhatsApp y no
          se considera válida hasta recibir nuestra respuesta. Nos reservamos el derecho de
          cancelar reservas en casos justificados.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="4. Precios y menú">
        <p>
          Los precios mostrados están expresados en <strong>soles peruanos (S/)</strong> e incluyen
          IGV. Nos reservamos el derecho de actualizar precios, platos o promociones sin previo aviso.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="5. Propiedad intelectual">
        <p>
          Todo el contenido de este sitio (textos, imágenes, logotipos, código, diseño) es propiedad
          de Sabor Criollo o se usa con permiso de sus respectivos autores. Queda prohibida su
          reproducción total o parcial sin autorización.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="6. Limitación de responsabilidad">
        <p>
          Nos esforzamos por mantener la información actualizada y el sitio disponible, pero no
          garantizamos que esté libre de errores o interrupciones. No nos hacemos responsables por
          daños derivados del uso del sitio.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="7. Modificaciones">
        <p>
          Podemos modificar estos términos en cualquier momento. Los cambios se publican en esta
          misma página con la fecha de actualización.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="8. Contacto">
        <p>
          Si tienes dudas sobre estos términos, escríbenos a{" "}
          <a href="mailto:hola@saborcriollo.pe" className="text-[#C1440E] underline underline-offset-4">
            hola@saborcriollo.pe
          </a>.
        </p>
      </SeccionLegal>
    </LegalLayout>
  );
}
