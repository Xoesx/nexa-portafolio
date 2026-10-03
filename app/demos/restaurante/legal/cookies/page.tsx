import type { Metadata } from "next";
import { LegalLayout, SeccionLegal } from "../LegalLayout";

export const metadata: Metadata = {
  title: "Política de cookies | Sabor Criollo",
  description: "Qué cookies usamos y cómo puedes gestionarlas.",
};

export default function CookiesPage() {
  return (
    <LegalLayout titulo="Política de cookies" actualizado="Octubre 2026">
      <SeccionLegal titulo="1. Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que se guardan en tu dispositivo cuando visitas un
          sitio web. Sirven para recordar tus preferencias y mejorar tu experiencia.
        </p>
      </SeccionLegal>

      <SeccionLegal titulo="2. Qué cookies usamos">
        <div className="overflow-hidden rounded-xl border border-[#1F1A15]/10">
          <table className="w-full text-[13px]">
            <thead className="bg-[#F0E7D5] text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Finalidad</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[#1F1A15]/10">
                <td className="px-4 py-3">Esenciales</td>
                <td className="px-4 py-3">Guardar tus preferencias del sitio (idioma, consentimiento).</td>
              </tr>
              <tr className="border-t border-[#1F1A15]/10">
                <td className="px-4 py-3">Analíticas</td>
                <td className="px-4 py-3">Contar visitas anónimas para saber qué secciones funcionan mejor.</td>
              </tr>
              <tr className="border-t border-[#1F1A15]/10">
                <td className="px-4 py-3">Funcionales</td>
                <td className="px-4 py-3">Recordar el carrito o las reservas en curso.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SeccionLegal>

      <SeccionLegal titulo="3. Cómo gestionarlas">
        <p>
          Puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Ten en
          cuenta que desactivar las cookies esenciales puede afectar el funcionamiento del sitio.
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Chrome: Configuración → Privacidad y seguridad → Cookies.</li>
          <li>Firefox: Preferencias → Privacidad y seguridad.</li>
          <li>Safari: Preferencias → Privacidad.</li>
        </ul>
      </SeccionLegal>

      <SeccionLegal titulo="4. Contacto">
        <p>
          Si tienes dudas sobre nuestra política de cookies, escríbenos a{" "}
          <a href="mailto:hola@saborcriollo.pe" className="text-[#C1440E] underline underline-offset-4">
            hola@saborcriollo.pe
          </a>.
        </p>
      </SeccionLegal>
    </LegalLayout>
  );
}
