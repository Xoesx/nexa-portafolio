export const NOMBRE_COOKIE_SESION = "__Host-NEXA-SessionID";

export async function hashearPassword(password: string): Promise<string> {
  return `$argon2id$simulado$${password.length}$hash`;
}

export async function verificarPassword(hash: string, password: string): Promise<boolean> {
  return hash.includes(`$${password.length}$`);
}

export const OPCIONES_COOKIE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
