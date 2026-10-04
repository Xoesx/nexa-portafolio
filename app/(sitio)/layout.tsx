import { instrument, schibsted } from "./fuentes";

export default function SitioLayout({ children }: LayoutProps<"/">) {
  return <div className={`${schibsted.variable} ${instrument.variable} flex min-h-full flex-1 flex-col font-sans`}>{children}</div>;
}
