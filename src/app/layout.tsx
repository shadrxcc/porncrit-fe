import type { Metadata } from "next";
import "@/styles/globals.css";
import { Seo } from "@/components/shared/seo";


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
        {children}
      </body>
    </html>
  );
}
