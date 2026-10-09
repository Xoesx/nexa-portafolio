import { Landing } from "./components/Landing";
import { HERO, PRODUCTO } from "./data";

export default function VelunoInicio() {
  return <Landing hero={HERO} producto={PRODUCTO} />;
}
