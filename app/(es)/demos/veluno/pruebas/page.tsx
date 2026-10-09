import Link from "next/link";
import { notFound } from "next/navigation";
import { Portada } from "../components/Portada";
import { HERO, PRODUCTO, type Hero, type Producto } from "../data";

/*
 * Solo en desarrollo (break-ui): la portada con los textos más largos que alguien podría
 * escribir de verdad al editar la tienda. Sirve para revisar cortes y choques en cada ancho.
 * /demos/veluno/pruebas?datos=extremo (por defecto) o ?datos=demo
 */
const HERO_EXTREMO: Hero = {
  titulo: ["Tecnología inteligente para toda la familia,", "vida conectada y mucho más simple"],
  descripcion: [
    "Mejora tu día a día con los auriculares, altavoces, relojes y cargadores inalámbricos de Veluno, diseñados para brindar confort durante horas,",
    "estilo y rendimiento.",
  ],
  accion: "Ver todos los auriculares",
};

const PRODUCTO_EXTREMO: Producto = {
  id: "sonicwave",
  nombre: "SonicWave Pro Edición Medianoche",
  descripcion: [
    "Sonido envolvente con cancelación activa de ruido, graves profundos, agudos cristalinos y tonos ricos",
    "y dinámicos.",
  ],
  precio: "$ 1,299.99",
};

const barra: React.CSSProperties = {
  position: "fixed",
  bottom: "max(12px, env(safe-area-inset-bottom))",
  left: "50%",
  translate: "-50% 0",
  display: "flex",
  gap: 2,
  padding: 3,
  borderRadius: 999,
  background: "#e5e5e5",
  font: "500 13px/1 system-ui, sans-serif",
  zIndex: 10,
};

const opcion = (activa: boolean): React.CSSProperties => ({
  padding: "8px 14px",
  borderRadius: 999,
  background: activa ? "#fff" : "transparent",
  color: "#111",
  textDecoration: "none",
});

export default async function PruebasVeluno({ searchParams }: PageProps<"/demos/veluno/pruebas">) {
  if (process.env.NODE_ENV === "production") notFound();

  const { datos } = await searchParams;
  const extremo = datos !== "demo";

  return (
    <>
      <Portada hero={extremo ? HERO_EXTREMO : HERO} producto={extremo ? PRODUCTO_EXTREMO : PRODUCTO} />
      <nav aria-label="Datos de prueba" style={barra}>
        <Link href="?datos=demo" style={opcion(!extremo)} aria-current={!extremo || undefined}>
          Demo
        </Link>
        <Link href="?datos=extremo" style={opcion(extremo)} aria-current={extremo || undefined}>
          Extremo
        </Link>
      </nav>
    </>
  );
}
