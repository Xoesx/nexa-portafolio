import { MarcoNexa, viewportNexa } from "../../_components/MarcoNexa";

export const viewport = viewportNexa;

export default function SiteLayout({ children }: LayoutProps<"/en">) {
  return <MarcoNexa>{children}</MarcoNexa>;
}
