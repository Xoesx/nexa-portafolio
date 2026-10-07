import type { Metadata } from "next";
import { CasoDeEstudio, metadataCaso } from "../../../../_components/CasoDeEstudio";
import { SLUGS } from "../../../../_data/contenido";

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadataCaso(slug, "es");
}

export default async function Pagina({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  return <CasoDeEstudio slug={slug} idioma="es" />;
}
