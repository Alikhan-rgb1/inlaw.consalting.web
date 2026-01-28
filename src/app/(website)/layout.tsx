import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Inlaw.kz — Регистрация и Сопровождение Международного Бизнеса",
    template: "%s | Inlaw.kz",
  },
  description: "Регистрация компаний, открытие счетов и лицензирование в Казахстане, ОАЭ, МФЦА и Гонконге. Полное юридическое и корпоративное сопровождение.",
  keywords: ["регистрация компании", "МФЦА", "ОАЭ", "Дубай", "открытие счета", "лицензия", "AIFC", "business setup", "Kazakhstan", "UAE"],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://inlaw.kz',
    siteName: 'Inlaw.kz',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Inlaw.kz',
      },
    ],
  },
  alternates: {
    canonical: 'https://inlaw.kz',
  },
  robots: {
    index: true,
    follow: true,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Inlaw.kz",
  "alternateName": "Inlaw",
  "url": "https://inlaw.kz",
  "logo": "https://inlaw.kz/logo.png",
  "description": "Регистрация и Сопровождение Международного Бизнеса в Казахстане, ОАЭ, Кыргызстане и Шанхае",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "ул. Гейдара Алиева 1",
      "addressLocality": "Astana",
      "addressCountry": "KZ"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "IFZA Business Park, Building A2",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    }
  ],
  "telephone": "+77001466646",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+77001466646",
      "contactType": "customer service",
      "areaServed": "KZ"
    },
     {
      "@type": "ContactPoint",
      "telephone": "+971523524196",
      "contactType": "customer service",
      "areaServed": "AE"
    }
  ],
  "priceRange": "$$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-white min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
