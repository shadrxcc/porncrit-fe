import { Metadata } from "next";

//
export const Seo: Metadata = {
    title: "PornCrit",
  description: "The social platform for lovers of porn.",
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
        other: {
            rel: "porncrit",
            url: "/logo.png",
        },
    },
    generator: "Next.js",
    applicationName: "PornCrit",
    referrer: "origin-when-cross-origin",
} as Metadata;