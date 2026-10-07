import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function LegalLayout({
  titulo,
  actualizado,
  children,
}: {
  titulo: string;
  actualizado: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1F1A15]">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C1440E]">
          Legal
        </p>
        <h1
          className="mt-3 text-[38px] leading-[1.1] md:text-[48px]"
          style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 400 }}
        >
          {titulo}
        </h1>
        <p className="mt-4 text-[13px] text-[#6E6457]">
          Última actualización: {actualizado}
        </p>

        <div className="mt-12 space-y-8 text-[15px] leading-[1.8] text-[#1F1A15]/80">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function SeccionLegal({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="text-[22px] leading-tight text-[#1F1A15]"
        style={{ fontFamily: "var(--font-display), Georgia, serif", fontWeight: 500 }}
      >
        {titulo}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}
