import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://democrachi.com").replace(/\/$/, "");

export const metadata: Metadata = {
  title: {
    default: "DemoCrachi — Le vrai. Le brut. Le mérité.",
    template: "%s | DemoCrachi",
  },
  description:
    "DemoCrachi, le média de ceux qui veulent comprendre le monde et ceux qui le changent. Actu, Sport, Économie, Politique, Créateurs, Entrepreneurs.",
  keywords: [
    "actualité", "actu", "news", "sport", "économie", "politique",
    "créateurs de contenu", "entrepreneurs", "france", "democrachi",
  ],
  authors: [{ name: "DemoCrachi", url: SITE_URL }],
  creator: "DemoCrachi",
  publisher: "DemoCrachi",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [{ url: `${SITE_URL}/feed.xml`, title: "DemoCrachi — Flux RSS" }],
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "DemoCrachi",
    url: SITE_URL,
    title: "DemoCrachi — Le vrai. Le brut. Le mérité.",
    description:
      "Le média de ceux qui veulent comprendre le monde et ceux qui le changent.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@democrachi",
    creator: "@democrachi",
    title: "DemoCrachi — Le vrai. Le brut. Le mérité.",
    description:
      "Le média de ceux qui veulent comprendre le monde et ceux qui le changent.",
  },
  verification: {
    google: "",
    other: {
      "facebook-domain-verification": "",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DemoCrachi",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/recherche?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "DemoCrachi",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
    width: 200,
    height: 60,
  },
  sameAs: [],
  description:
    "DemoCrachi est un média français d'actualité couvrant l'actu, le sport, la politique, les créateurs de contenu et les entrepreneurs.",
  foundingDate: "2025",
  inLanguage: "fr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DemoCrachi" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#E53935" />
        <script dangerouslySetInnerHTML={{
          __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`
        }} />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#111111] antialiased">
        {children}
      </body>
    </html>
  );
}
