import { MarcoNexa, viewportNexa } from "../../_components/MarcoNexa";

export const viewport = viewportNexa;

export default function SitioLayout({ children }: LayoutProps<"/">) {
  return <MarcoNexa>{children}</MarcoNexa>;
}
