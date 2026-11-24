import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dandy Prasetyo Nugroho | Portofolio",
  description:
    "Portofolio Dandy Prasetyo Nugroho, mahasiswa Teknik Informatika yang tertarik pada desain visual, UI/UX, fotografi, video, dan pengembangan web.",
  openGraph: {
    title: "Dandy Prasetyo Nugroho | Portofolio",
    description:
      "Desain visual dan pengembangan web dalam satu portofolio profesional.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
