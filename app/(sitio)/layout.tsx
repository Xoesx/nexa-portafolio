import { figtree, youngSerif } from "./fuentes";

export default function SitioLayout({ children }: LayoutProps<"/">) {
  return <div className={`${youngSerif.variable} ${figtree.variable} flex min-h-full flex-1 flex-col font-sans`}>{children}</div>;
}
