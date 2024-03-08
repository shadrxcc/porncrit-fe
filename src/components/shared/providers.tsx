"use client";

import { AuthModalProvider } from "@/context/auth-modal-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (

        <AuthModalProvider>{children}</AuthModalProvider>
    );
}