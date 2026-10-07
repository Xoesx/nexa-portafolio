import type { Metadata } from "next";
import { CasoDeEstudio, metadataCaso } from "../../../../_components/CasoDeEstudio";
import { SLUGS } from "../../../../_data/contenido";

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return metadataCaso(slug, "en");
}

export default async function Page({ params }: PageProps<"/en/projects/[slug]">) {
  const { slug } = await params;
  return <CasoDeEstudio slug={slug} idioma="en" />;
}
