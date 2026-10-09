/*
 * Créditos de las fotos de Unsplash que usa la landing (licencia de Unsplash: uso libre, sin
 * obligación de atribuir, pero se reconoce a cada autor en el pie). Datos planos, sin imports de
 * imágenes, para poder probarlos con vitest.
 */
export type Credito = {
  /** Id de la foto en Unsplash. */
  id: string;
  /** Segmento photo-… de su URL en images.unsplash.com. */
  foto: string;
  autor: string;
  /** Página de la foto en Unsplash. */
  enlace: string;
};

export const CREDITOS: readonly Credito[] = [
  { id: "XYi6_1YFMYo", foto: "photo-1756706916864-0e4ed0fa85cf", autor: "Qiu MinFeng", enlace: "https://unsplash.com/photos/person-wearing-headphones-against-a-dark-background-XYi6_1YFMYo" },
  { id: "x0wRdYOUxB8", foto: "photo-1739764575613-ecc078ed173d", autor: "juan daniel guzman zapata", enlace: "https://unsplash.com/photos/a-pair-of-white-earbuds-sitting-in-a-case-x0wRdYOUxB8" },
  { id: "kDCIBGqU0_0", foto: "photo-1761384409444-2f8359d67a69", autor: "Howard Bouchevereau", enlace: "https://unsplash.com/photos/a-white-smart-speaker-on-a-white-surface-kDCIBGqU0_0" },
  { id: "aK5uHV08dTc", foto: "photo-1618902544104-7ebfb9849b4d", autor: "ERNEST TARASOV", enlace: "https://unsplash.com/photos/woman-in-black-shirt-wearing-white-sunglasses-aK5uHV08dTc" },
  { id: "edOXC3tcmZw", foto: "photo-1548659545-93415a88191c", autor: "Derek Perez", enlace: "https://unsplash.com/photos/woman-wearing-black-sunglasses-edOXC3tcmZw" },
  { id: "Mwa8-6H9QPk", foto: "photo-1668092834733-60f7c0d567a1", autor: "Yohan Marion", enlace: "https://unsplash.com/photos/a-person-with-headphones-on-the-head-Mwa8-6H9QPk" },
  { id: "-7Kkov230I0", foto: "photo-1625786682948-2168238883d2", autor: "Jair Medina Nossa", enlace: "https://unsplash.com/photos/woman-wearing-white-headphones--7Kkov230I0" },
  { id: "tAkRAtNXQmE", foto: "photo-1759432172550-6e77baf8bd46", autor: "Andrey Soldatov", enlace: "https://unsplash.com/photos/man-wearing-white-headphones-and-black-shirt-tAkRAtNXQmE" },
  { id: "kwIYYoBAfDc", foto: "photo-1730973915515-e79273d90b7c", autor: "Georgi Kalaydzhiev", enlace: "https://unsplash.com/photos/a-woman-wearing-headphones-standing-on-the-street-kwIYYoBAfDc" },
  { id: "0wr-tTbbfc0", foto: "photo-1723912628184-dfde150fab82", autor: "Abdul Rahman", enlace: "https://unsplash.com/photos/a-man-wearing-headphones-while-sitting-in-the-dark-0wr-tTbbfc0" },
  { id: "TENHzQWolE0", foto: "photo-1790438329317-e64a2dc12adc", autor: "Stefan Vibes", enlace: "https://unsplash.com/photos/young-man-walking-on-city-sidewalk-TENHzQWolE0" },
  { id: "8KirD4yLCAs", foto: "photo-1759984782169-36efef7ed33e", autor: "Julio Lopez", enlace: "https://unsplash.com/photos/young-woman-wearing-headphones-glasses-and-pink-shirt-writing-8KirD4yLCAs" },
  { id: "WsX2gGnSG1o", foto: "photo-1713863574532-aea8fab1e4a8", autor: "Look Studio", enlace: "https://unsplash.com/photos/a-woman-sitting-on-a-couch-wearing-headphones-WsX2gGnSG1o" },
  { id: "2PMfmhFodRc", foto: "photo-1674989844487-722ec77b9b81", autor: "Berke Citak", enlace: "https://unsplash.com/photos/a-pair-of-headphones-sitting-on-top-of-each-other-2PMfmhFodRc" },
  { id: "GkCpDprF3yw", foto: "photo-1658927420074-85930da203ec", autor: "Ritupon Baishya", enlace: "https://unsplash.com/photos/a-close-up-of-a-black-headphones-GkCpDprF3yw" },
  { id: "TpDhqQCWY0s", foto: "photo-1737291937135-3a0fcb5e0c44", autor: "Kamran Abdullayev", enlace: "https://unsplash.com/photos/a-pair-of-headphones-floating-in-the-air-TpDhqQCWY0s" },
  { id: "edP9ZXCXihY", foto: "photo-1597352651426-56ccf1dbc926", autor: "Zac Gudakov", enlace: "https://unsplash.com/photos/silhouette-of-man-wearing-headphones-edP9ZXCXihY" },
];
