import type { Metadata } from "next";
import "@/styles/globals.css";
import { Seo } from "@/components/shared/seo";
import Header from "@/components/ui/header";
import FooterComponent from "@/components/ui/footer.component";
import AppLayout from "@/components/shared/layout";
import { ToastContainer } from 'react-toastify';
import { Providers } from "@/components/shared/providers";


export const metadata: Metadata = {
  ...Seo,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppLayout>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Providers>
            <Header />
            <div className="xs:px-2.5 px-4 mt-32 sm:px-8">
              {children}
            </div>
            <FooterComponent />
            <ToastContainer />
          </Providers>
        </body>
      </html>

    </AppLayout>
  );
}
