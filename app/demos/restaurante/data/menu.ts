import type { Plato } from "../types";

export const CATEGORIAS = ["Entradas", "Principales", "Postres", "Bebidas"] as const;

export const MENU_COMPLETO: Plato[] = [
  // ============ ENTRADAS (8) ============
  { id: "e1", nombre: "Causa limeña", categoria: "Entradas", precio: 15, descripcion: "Papa amarilla, ají amarillo, pollo desmenuzado y mayonesa.", imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80", disponible: true, etiqueta: "Popular" },
  { id: "e2", nombre: "Anticuchos", categoria: "Entradas", precio: 18, descripcion: "Corazón de res en ají panca, con papa dorada y choclo.", imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80", disponible: true },
  { id: "e3", nombre: "Papa a la huancaína", categoria: "Entradas", precio: 12, descripcion: "Papa sancochada con crema huancaína y huevo duro.", imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80", disponible: true },
  { id: "e4", nombre: "Ceviche clásico", categoria: "Entradas", precio: 25, descripcion: "Pescado fresco en leche de tigre, con camote y choclo.", imagen: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=500&q=80", disponible: true, etiqueta: "Chef" },
  { id: "e5", nombre: "Tiradito de pescado", categoria: "Entradas", precio: 22, descripcion: "Láminas de pescado en salsa de ají amarillo y limón.", imagen: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=500&q=80", disponible: true },
  { id: "e6", nombre: "Choritos a la chalaca", categoria: "Entradas", precio: 20, descripcion: "Choritos frescos con cebolla, tomate y culantro.", imagen: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500&q=80", disponible: true },
  { id: "e7", nombre: "Causa de cangrejo", categoria: "Entradas", precio: 24, descripcion: "Causa rellena con cangrejo fresco y palta.", imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80", disponible: true },
  { id: "e8", nombre: "Tequeños criollos", categoria: "Entradas", precio: 14, descripcion: "Rellenos de queso andino, fritos al momento.", imagen: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&q=80", disponible: true, etiqueta: "Nuevo" },

  // ============ PRINCIPALES (14) ============
  { id: "p1", nombre: "Lomo saltado", categoria: "Principales", precio: 28, descripcion: "Carne de res al wok con cebolla, tomate, papas fritas y arroz.", imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80", disponible: true, etiqueta: "Popular" },
  { id: "p2", nombre: "Ají de gallina", categoria: "Principales", precio: 24, descripcion: "Gallina deshilachada en salsa cremosa de ají amarillo.", imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80", disponible: true },
  { id: "p3", nombre: "Arroz con pato", categoria: "Principales", precio: 32, descripcion: "Pato guisado con culantro, cerveza negra y arroz verde.", imagen: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80", disponible: true, etiqueta: "Chef" },
  { id: "p4", nombre: "Ajiaco de gallina", categoria: "Principales", precio: 26, descripcion: "Guiso de gallina con papa amarilla y ají mirasol.", imagen: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80", disponible: true },
  { id: "p5", nombre: "Seco de res", categoria: "Principales", precio: 27, descripcion: "Carne guisada con culantro, zapallo loche y arroz.", imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80", disponible: true },
  { id: "p6", nombre: "Carapulcra con sopa seca", categoria: "Principales", precio: 25, descripcion: "Guiso de papa seca con cerdo y fideos al achiote.", imagen: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80", disponible: true },
  { id: "p7", nombre: "Tallarín saltado criollo", categoria: "Principales", precio: 23, descripcion: "Fideos salteados con carne, verduras y sillao.", imagen: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&q=80", disponible: true },
  { id: "p8", nombre: "Pollo a la brasa (1/4)", categoria: "Principales", precio: 22, descripcion: "Pollo marinado en especias, papa frita y ensalada.", imagen: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&q=80", disponible: true, etiqueta: "Popular" },
  { id: "p9", nombre: "Pollo a la brasa (1/2)", categoria: "Principales", precio: 38, descripcion: "Medio pollo con papas, ensalada y cremas.", imagen: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&q=80", disponible: true },
  { id: "p10", nombre: "Chicharrón de cerdo", categoria: "Principales", precio: 26, descripcion: "Cerdo crocante con camote frito y salsa criolla.", imagen: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&q=80", disponible: true },
  { id: "p11", nombre: "Sudado de pescado", categoria: "Principales", precio: 30, descripcion: "Filete de pescado en caldo de tomate y ají amarillo.", imagen: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80", disponible: true },
  { id: "p12", nombre: "Arroz con mariscos", categoria: "Principales", precio: 34, descripcion: "Arroz con mixtura de mariscos frescos y ají panca.", imagen: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=500&q=80", disponible: true },
  { id: "p13", nombre: "Bisteck a lo pobre", categoria: "Principales", precio: 32, descripcion: "Bistec con papas fritas, huevo, plátano y arroz.", imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80", disponible: true },
  { id: "p14", nombre: "Milanesa de pollo", categoria: "Principales", precio: 25, descripcion: "Pechuga empanizada con papas y ensalada fresca.", imagen: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80", disponible: true, etiqueta: "Nuevo" },

  // ============ POSTRES (6) ============
  { id: "d1", nombre: "Suspiro a la limeña", categoria: "Postres", precio: 10, descripcion: "Manjar blanco con merengue al oporto.", imagen: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&q=80", disponible: true, etiqueta: "Popular" },
  { id: "d2", nombre: "Picarones", categoria: "Postres", precio: 9, descripcion: "Aros de zapallo y camote con miel de chancaca.", imagen: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&q=80", disponible: true },
  { id: "d3", nombre: "Mazamorra morada", categoria: "Postres", precio: 8, descripcion: "Postre tradicional de maíz morado y frutas.", imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80", disponible: true },
  { id: "d4", nombre: "Arroz con leche", categoria: "Postres", precio: 8, descripcion: "Arroz cremoso con canela y leche condensada.", imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80", disponible: true },
  { id: "d5", nombre: "Torta de chocolate", categoria: "Postres", precio: 12, descripcion: "Bizcocho de cacao con ganache y fresas.", imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", disponible: true, etiqueta: "Chef" },
  { id: "d6", nombre: "Helado artesanal", categoria: "Postres", precio: 9, descripcion: "Sabores del día: lúcuma, chirimoya o vainilla.", imagen: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=500&q=80", disponible: true },

  // ============ BEBIDAS (7) ============
  { id: "b1", nombre: "Chicha morada (jarra)", categoria: "Bebidas", precio: 15, descripcion: "Preparada en casa con maíz morado y frutas.", imagen: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80", disponible: true, etiqueta: "Popular" },
  { id: "b2", nombre: "Limonada frozen", categoria: "Bebidas", precio: 9, descripcion: "Limón, hierbabuena y hielo frappé.", imagen: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&q=80", disponible: true },
  { id: "b3", nombre: "Maracuyá sour", categoria: "Bebidas", precio: 12, descripcion: "Maracuyá fresco, limón y un toque de azúcar.", imagen: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80", disponible: true, etiqueta: "Nuevo" },
  { id: "b4", nombre: "Chicha de jora", categoria: "Bebidas", precio: 10, descripcion: "Bebida tradicional de maíz fermentado.", imagen: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80", disponible: true },
  { id: "b5", nombre: "Inca Kola (500 ml)", categoria: "Bebidas", precio: 6, descripcion: "La bebida de sabor nacional.", imagen: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=500&q=80", disponible: true },
  { id: "b6", nombre: "Café pasado", categoria: "Bebidas", precio: 5, descripcion: "Café peruano de Chanchamayo, recién pasado.", imagen: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80", disponible: true },
  { id: "b7", nombre: "Emoliente caliente", categoria: "Bebidas", precio: 6, descripcion: "Bebida tradicional con hierbas y limón.", imagen: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80", disponible: true },
];
