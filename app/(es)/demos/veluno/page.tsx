import { Portada } from "./components/Portada";
import { HERO, PRODUCTO } from "./data";

export default function VelunoInicio() {
  return <Portada hero={HERO} producto={PRODUCTO} />;
}
