import type { Metadata } from "next";
import "@/styles/globals.css";
import { Seo } from "@/components/shared/seo";
import Header from "@/components/ui/header";
import FooterComponent from "@/components/ui/footer.component";


export const metadata: Metadata = {
  ...Seo,  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Header/>
        <div className="xs:px-2.5 px-4 mt-32 sm:px-8">
        {children}
        </div>
        <FooterComponent/>
      </body>
    </html>
  );
}
