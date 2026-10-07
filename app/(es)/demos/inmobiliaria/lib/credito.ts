/**
 * Cuota mensual de un crédito hipotecario con el sistema francés (cuotas iguales), que es el que usan los bancos
 * en el Perú. Los bancos publican la TEA (tasa efectiva anual), así que primero se pasa a tasa efectiva mensual.
 */
export function cuotaMensual(monto: number, tea: number, anios: number) {
  const tem = Math.pow(1 + tea / 100, 1 / 12) - 1;
  const n = anios * 12;
  if (monto <= 0 || n <= 0) return 0;
  if (tem === 0) return monto / n;
  return (monto * tem) / (1 - Math.pow(1 + tem, -n));
}
