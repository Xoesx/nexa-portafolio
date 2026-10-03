export type EtiquetaPlato = "Popular" | "Nuevo" | "Chef";

export type Plato = {
  id: string;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagen: string;
  disponible?: boolean;
  etiqueta?: EtiquetaPlato;
};

export type Reserva = {
  id: string;
  nombre: string;
  telefono: string;
  personas: number;
  fecha: string;
  hora: string;
  notas?: string;
  estado: "pendiente" | "confirmada" | "cancelada";
  creadaEn: string;
};
